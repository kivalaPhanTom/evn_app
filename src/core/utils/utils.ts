import { getModel } from '@/core/utils/device'
import { Platform } from 'react-native'
import { ThemeValue } from '../types'

export const isEmpty = (value: any): boolean => {
  return value === undefined || value === '' || value === null
}
export const isDynamicIsland = () => {
  const deviceId = getModel()
  if (Platform.OS === 'ios' && isDeviceIdGreaterThanOrEqual15(deviceId)) {
    return true
  } else {
    return false
  }
}

export const isDeviceIdGreaterThanOrEqual15 = (deviceId: any) => {
  const regex = deviceId?.includes(',') ? /iPhone(\d+,\d+)/ : /iPhone(\d+)/
  const match = deviceId.match(regex)

  if (match) {
    // Thay dấu phẩy bằng dấu chấm và chuyển sang số
    const deviceNumber = parseFloat(match[1].replace(',', '.'))
    // So sánh giá trị
    return deviceNumber >= 15.2
  }

  // Trường hợp không khớp với định dạng iPhone
  return false
}

export const validatePhoneNumber = (phoneNumber: string): boolean => {
  const phoneRegex = /(?:\+84|0084|0)[235789][0-9]{1,2}[0-9]{7}(?:[^\d]+|$)/g // Starts with 0 and has exactly 10 digits
  return phoneRegex.test(phoneNumber)
}

export const validateStrongPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return passwordRegex.test(password)
}

export const resolveThemeValue = <T>(val: T | ThemeValue<T> | undefined, isDark: boolean): T | undefined => {
  if (val == null) return undefined
  if (typeof val === 'object' && ('light' in (val as any) || 'dark' in (val as any))) {
    const v = val as ThemeValue<T>
    return (isDark ? v.dark : v.light) ?? v.light ?? v.dark ?? undefined
  }
  return val as T
}
