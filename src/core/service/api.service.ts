import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppState } from 'react-native'
import { router } from 'expo-router'
import { Toast } from 'toastify-react-native'

const BASE_URL =
  Constants.expoConfig?.extra?.API_BASE_URL ??
  'https://mygenco3-api.genco3.com/'

const REFRESH_TOKEN_KEY = 'refresh_token'
const REFRESH_ENDPOINT = 'refreshToken'
const AUTH_ENDPOINTS = ['Token', 'refreshToken']
const REFRESH_BUFFER_MS = 5 * 60 * 1000
const MIN_REFRESH_DELAY_MS = 10 * 1000

let authToken: string | null = null
let refreshToken: string | null = null
let refreshTimer: ReturnType<typeof setTimeout> | null = null
let refreshPromise: Promise<string> | null = null
let lastForceLogoutAt = 0
let logoutEpoch = 0

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export const apiFormUrlEncoded: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  },
})

// Load token on app start
export async function loadAuthTokenFromStorage(): Promise<void> {
  try {
    authToken = await AsyncStorage.getItem('auth_token')
  } catch { }
}

// Set auth token
export function setAuthToken(token: string | null, expiresIn?: number, newRefreshToken?: string) {
  authToken = token
  if (token) {
    AsyncStorage.setItem('auth_token', token).catch(() => { })
    if (newRefreshToken) {
      refreshToken = newRefreshToken
      AsyncStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken).catch(() => { })
    }
    if (expiresIn) {
      const expiresAt = Date.now() + expiresIn * 1000
      AsyncStorage.setItem('auth_expires_at', expiresAt.toString()).catch(() => { })
      scheduleTokenRefresh(expiresIn)
    }
  } else {
    logoutEpoch++
    refreshToken = null
    clearRefreshTimer()
    AsyncStorage.removeItem('auth_token').catch(() => { })
    AsyncStorage.removeItem('auth_expires_at').catch(() => { })
    AsyncStorage.removeItem(REFRESH_TOKEN_KEY).catch(() => { })
    AsyncStorage.removeItem('USERNAME').catch(() => { })
  }
}
export function setUsernameToAsyncStorage(username: string) {
  AsyncStorage.setItem('USERNAME', username)
}
export function removeUsernameToAsyncStorage(username: string) {
  AsyncStorage.removeItem('USERNAME')
}
export function clearAuthToken() {
  setAuthToken(null)
}
export async function getRefreshToken(): Promise<string | null> {
  if (refreshToken) return refreshToken
  try {
    return await AsyncStorage.getItem(REFRESH_TOKEN_KEY)
  } catch {
    return null
  }
}

// TOKEN REFRESH
function clearRefreshTimer() {
  if (refreshTimer) {
    clearTimeout(refreshTimer)
    refreshTimer = null
  }
}

export function scheduleTokenRefresh(expiresInSec?: number) {
  clearRefreshTimer()
  const computeDelay = (lifetimeMs: number) => {
    let delayMs = lifetimeMs - REFRESH_BUFFER_MS
    if (delayMs <= 0) {
      delayMs = lifetimeMs / 2
    }
    return Math.max(delayMs, MIN_REFRESH_DELAY_MS)
  }
  const schedule = (delayMs: number) => {
    refreshTimer = setTimeout(() => {
      void refreshAccessToken({ keepSessionOnFailure: true }).catch(() => { })
    }, delayMs)
  }
  if (expiresInSec) {
    schedule(computeDelay(expiresInSec * 1000))
    return
  }
  AsyncStorage.getItem('auth_expires_at')
    .then((expiresAtStr) => {
      if (!expiresAtStr || !authToken) return
      schedule(computeDelay(parseInt(expiresAtStr, 10) - Date.now()))
    })
    .catch(() => { })
}

function forceLogout() {
  const now = Date.now()
  if (now - lastForceLogoutAt < 1000) return
  lastForceLogoutAt = now
  clearAuthToken()
  try {
    Toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.')
    router.replace('/login')
  } catch { }
}

async function doRefreshAccessToken(keepSessionOnFailure = false): Promise<string> {
  const epochAtStart = logoutEpoch
  const currentRefreshToken = refreshToken ?? (await getRefreshToken())
  if (!currentRefreshToken) {
    forceLogout()
    throw { message: 'Không có refresh token. Vui lòng đăng nhập lại.', status: 401 }
  }
  try {
    const res = await axios.post(
      REFRESH_ENDPOINT,
      { refreshToken: currentRefreshToken },
      {
        baseURL: BASE_URL,
        timeout: 15000,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )
    if (epochAtStart !== logoutEpoch) {
      throw { message: 'Đã đăng xuất.' }
    }
    const data = res.data ?? {}
    const newAccessToken = data.access_token
    if (!newAccessToken) {
      throw { message: 'Phản hồi refresh token không hợp lệ.' }
    }
    const newExpiresIn: number | undefined = data.expires_in
    const newRefreshToken: string | undefined = data.refresh_token
    setAuthToken(newAccessToken, newExpiresIn, newRefreshToken ?? currentRefreshToken)
    return newAccessToken
  } catch (error: any) {
    if (epochAtStart !== logoutEpoch) {
      throw { message: 'Đã đăng xuất.' }
    }
    let keepSession = false
    if (keepSessionOnFailure) {
      const expiresAtStr = await AsyncStorage.getItem('auth_expires_at').catch(() => null)
      const expiresAt = expiresAtStr ? parseInt(expiresAtStr, 10) : 0
      keepSession = Date.now() < expiresAt
    }
    if (!keepSession) {
      forceLogout()
    }
    if (error?.response) {
      throw {
        message:
          error.response.data?.message ||
          error.response.statusText ||
          'Refresh token không hợp lệ.',
        status: error.response.status,
        data: error.response.data,
      }
    }
    throw { message: error?.message || 'Không thể làm mới phiên đăng nhập.' }
  }
}

export function refreshAccessToken(options?: {
  keepSessionOnFailure?: boolean
}): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = doRefreshAccessToken(options?.keepSessionOnFailure ?? false).finally(() => {
      refreshPromise = null
    })
  }
  return refreshPromise
}

// Refresh when app returns to foreground and token is near expiry
AppState.addEventListener('change', (state) => {
  if (state !== 'active' || !authToken) return
  AsyncStorage.getItem('auth_expires_at')
    .then((expiresAtStr) => {
      if (!expiresAtStr) return
      const expiresAt = parseInt(expiresAtStr, 10)
      if (expiresAt - Date.now() <= REFRESH_BUFFER_MS) {
        void refreshAccessToken({ keepSessionOnFailure: true }).catch(() => { })
      }
    })
    .catch(() => { })
})

// REQUEST INTERCEPTOR
const attachToken = (config: InternalAxiosRequestConfig) => {
  if (!config.headers) config.headers = {} as any
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`
  }
  return config
}
api.interceptors.request.use(attachToken)
apiFormUrlEncoded.interceptors.request.use(attachToken)

// RESPONSE INTERCEPTOR
const normalizeError = (error: any) => {
  if (error.response) {
    return Promise.reject({
      message:
        error.response.data?.message ||
        error.response.statusText ||
        'Request error',
      status: error.response.status,
      data: error.response.data,
    })
  }
  return Promise.reject({ message: error.message || 'Network error' })
}

const isAuthEndpoint = (url?: string) =>
  !!url && AUTH_ENDPOINTS.some((endpoint) => url.includes(endpoint))

const responseErrorInterceptor = async (error: any) => {
  const original = error?.config as
    | (InternalAxiosRequestConfig & { _retry?: boolean })
    | undefined
  const status = error?.response?.status

  if (
    status === 401 &&
    original &&
    !original._retry &&
    !isAuthEndpoint(original.url)
  ) {
    original._retry = true
    try {
      const newToken = await refreshAccessToken()
      if (!original.headers) original.headers = {} as any
      original.headers.Authorization = `Bearer ${newToken}`
      return api.request(original)
    } catch (refreshError) {
      forceLogout()
      return Promise.reject(refreshError)
    }
  }

  return normalizeError(error)
}

api.interceptors.response.use((res) => res, responseErrorInterceptor)
apiFormUrlEncoded.interceptors.response.use((res) => res, responseErrorInterceptor)

// API HELPERS
export async function get<T = any>(
  url: string,
  config?: AxiosRequestConfig
) {
  const res = await api.get<T>(url, config)
  return { data: res.data, status: res.status, headers: res.headers }
}

export async function post<T = any, B = any>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig
) {
  const res = await api.post<T>(url, body, config)
  return { data: res.data, status: res.status, headers: res.headers }
}

export async function put<T = any, B = any>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig
) {
  const res = await api.put<T>(url, body, config)
  return { data: res.data, status: res.status, headers: res.headers }
}

export async function del<T = any>(
  url: string,
  config?: AxiosRequestConfig
) {
  const res = await api.delete<T>(url, config)
  return { data: res.data, status: res.status, headers: res.headers }
}

export default {
  instance: api,
  get,
  post,
  put,
  delete: del,
  setAuthToken,
  clearAuthToken,
  apiFormUrlEncoded,
}