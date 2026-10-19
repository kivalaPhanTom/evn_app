import AsyncStorage from '@react-native-async-storage/async-storage'
import type { Company } from './companyPlantService'

const companiesTtlMs = 24 * 60 * 60 * 1000

function logCache(event: 'save' | 'read', details: Record<string, unknown>) {
  console.log(`[Companies cache][${event}]\n${JSON.stringify(details, null, 2)}`)
}

export async function saveCompaniesCache(userId: string, companies: Company[]): Promise<void> {
  const key = `companies:${userId}`
  const value = { savedAt: Date.now(), companies }
  try {
    await AsyncStorage.removeItem('COMPANIES_USER_ID')
    await AsyncStorage.setItem(key, JSON.stringify(value))
    await AsyncStorage.setItem('COMPANIES_USER_ID', userId)
    logCache('save', { key, value, sessionKey: 'COMPANIES_USER_ID', userId })
  } catch {
    // Cache lỗi không được chặn luồng đăng nhập hoặc khôi phục nhầm user cũ.
  }
}

export async function restoreCompaniesCache(): Promise<Company[] | null> {
  try {
    const userId = await AsyncStorage.getItem('COMPANIES_USER_ID')
    return userId ? readCompaniesCache(userId) : null
  } catch {
    return null
  }
}

export async function clearCompaniesCacheSession(): Promise<void> {
  try {
    await AsyncStorage.removeItem('COMPANIES_USER_ID')
  } catch {
    // Không giữ phiên logout chỉ vì cache không ghi được.
  }
}

export async function readCompaniesCache(userId: string): Promise<Company[] | null> {
  const key = `companies:${userId}`
  try {
    const raw = await AsyncStorage.getItem(key)
    if (!raw) {
      logCache('read', { key, status: 'miss' })
      return null
    }
    const value: unknown = JSON.parse(raw)
    if (!value || typeof value !== 'object') return null
    const cache = value as { savedAt?: unknown; companies?: unknown }
    if (typeof cache.savedAt !== 'number' || !Array.isArray(cache.companies)) return null
    const age = Date.now() - cache.savedAt
    if (age < 0 || age >= companiesTtlMs) {
      logCache('read', { key, status: 'expired', age, value: cache })
      return null
    }
    if (!cache.companies.every((company) => company && ['string', 'number'].includes(typeof company.companyId))) {
      return null
    }
    const companies = cache.companies.map((company) => ({ ...company, companyId: String(company.companyId) })) as Company[]
    logCache('read', { key, status: 'hit', value: { ...cache, companies } })
    return companies
  } catch {
    return null
  }
}
