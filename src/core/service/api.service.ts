import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage'

const BASE_URL =
  Constants.expoConfig?.extra?.API_BASE_URL ??
  'https://mygenco3-api.genco3.com/'

let authToken: string | null = null

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
  } catch {}
}

// Set auth token
export function setAuthToken(token: string | null) {
  authToken = token
  if (token) {
    AsyncStorage.setItem('auth_token', token).catch(() => {})
  } else {
    AsyncStorage.removeItem('auth_token').catch(() => {})
  }
}
export function clearAuthToken() {
  setAuthToken(null)
}

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

api.interceptors.response.use((res) => res, normalizeError)
apiFormUrlEncoded.interceptors.response.use((res) => res, normalizeError)

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