import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

type ApiResponse<T = any> = {
  data: T
  status: number
  statusText?: string
  headers?: Record<string, any>
}

const BASE_URL =
  process.env.REACT_APP_API_URL || process.env.VITE_API_URL || process.env.API_BASE_URL || 'http://localhost:3000'

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

let authToken: string | null = null

const isReactNative = typeof navigator !== 'undefined' && (navigator as any).product === 'ReactNative'

let AsyncStorage: any = null
if (isReactNative) {
  // dynamic import so web bundlers don't break when package isn't installed
  // load AsyncStorage asynchronously (fire-and-forget)
  import('@react-native-async-storage/async-storage')
    .then((m) => {
      AsyncStorage = (m as any).default ?? m
    })
    .catch(() => {
      // AsyncStorage not available
      AsyncStorage = null
    })
} else if (typeof window !== 'undefined') {
  try {
    authToken = localStorage.getItem('auth_token')
  } catch {
    // ignore storage errors
  }
}

/**
 * Gọi khi app khởi tạo (React Native): load token bất đồng bộ từ AsyncStorage vào biến nội bộ
 * Ví dụ gọi từ App.tsx trước khi mount phần còn lại của app.
 */
export async function loadAuthTokenFromStorage(): Promise<void> {
  if (isReactNative && AsyncStorage) {
    try {
      const t = await AsyncStorage.getItem('auth_token')
      authToken = t
    } catch {
      // ignore
    }
  }
}

/**
 * Thiết lập token (lưu vào biến nội bộ và storage tương ứng)
 */
export function setAuthToken(token: string | null) {
  authToken = token
  try {
    if (isReactNative && AsyncStorage) {
      // write async, fire-and-forget
      if (token) {
        AsyncStorage.setItem('auth_token', token).catch(() => {})
      } else {
        AsyncStorage.removeItem('auth_token').catch(() => {})
      }
    } else if (typeof window !== 'undefined') {
      if (token) localStorage.setItem('auth_token', token)
      else localStorage.removeItem('auth_token')
    }
  } catch {
    // ignore storage errors
  }
}

/**
 * Xóa token
 */
export function clearAuthToken() {
  setAuthToken(null)
}

/**
 * Request interceptor: gắn Authorization nếu có token
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!config.headers) config.headers = {} as any
    if (authToken) {
      ;(config.headers as any).Authorization = `Bearer ${authToken}`
    }
    return config
  },
  (error: unknown) => Promise.reject(error),
)

/**
 * Response interceptor: chuẩn hoá lỗi và dữ liệu
 */
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: unknown) => {
    // narrow to any for property access
    const err = error as any
    // Nếu server trả lỗi, giữ cấu trúc thông tin hữu ích
    if (err.response) {
      return Promise.reject({
        message: err.response.data?.message || err.response.statusText || 'Request error',
        status: err.response.status,
        data: err.response.data,
      })
    }
    // Lỗi mạng / timeout
    return Promise.reject({
      message: err.message || 'Network error',
    })
  },
)

/**
 * Helpers: get/post/put/delete với generic typing
 */
export async function get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
  const res = await api.get<T>(url, config)
  return { data: res.data as T, status: res.status, statusText: res.statusText, headers: res.headers }
}

export async function post<T = any, B = any>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  const res = await api.post<T>(url, body, config)
  return { data: res.data as T, status: res.status, statusText: res.statusText, headers: res.headers }
}

export async function put<T = any, B = any>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  const res = await api.put<T>(url, body, config)
  return { data: res.data as T, status: res.status, statusText: res.statusText, headers: res.headers }
}

export async function del<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
  const res = await api.delete<T>(url, config)
  return { data: res.data as T, status: res.status, statusText: res.statusText, headers: res.headers }
}

/**
 * Export instance for advanced use
 */
export default {
  instance: api,
  get,
  post,
  put,
  delete: del,
  setAuthToken,
  clearAuthToken,
}
