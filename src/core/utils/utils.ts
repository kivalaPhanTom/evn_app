import { getModel } from '@/core/utils/device'
import { Platform } from 'react-native'
import { ThemeValue } from '../types'
import { Toast } from 'toastify-react-native'
import { router } from 'expo-router'

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
    // Thay d?u ph?y b?ng d?u ch?m v� chuy?n sang s?
    const deviceNumber = parseFloat(match[1].replace(',', '.'))
    // So s�nh gi� tr?
    return deviceNumber >= 15.2
  }

  // Tru?ng h?p kh�ng kh?p v?i d?nh d?ng iPhone
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

export type ApiResponse<T = any> = {
  data: T
  status: number
  statusText?: string
  message?: string
  headers?: Record<string, any>
}

export const catchHandle = (e: any, fnName?: string): void => {
  const { status, data }: ApiResponse = e;
  const { Message: message } = (data ?? {}) as { Message?: string };

  const location = fnName ? ` [${fnName}]` : '';
  console.log(`API Error${location}:`, e);

  const notify = (fallback: string) => {
    Toast.error(fallback);
  };

  switch (status) {
    case 401: {
      notify('Vui l�ng dang nh?p l?i d? ti?p t?c.');
      router.replace('/login');
      break;
    }
    case 404: {
      notify(data ?? 'Y�u c?u kh�ng t?n t?i. Vui l�ng th? l?i sau.');
      break;
    }
    case 500: {
      notify('�� c� l?i x?y ra ? ph�a m�y ch?. Vui l�ng th? l?i sau.');
      break;
    }
    case 400: {
      notify('Y�u c?u kh�ng h?p l?. Vui l�ng th? l?i sau.');
      break;
    }
    default: {
      notify('�� c� l?i x?y ra, vui l�ng th? l?i sau.');
    }
  }
};

export const formatNumber = (num: number): string => {
  const formatted = num.toLocaleString('vi-VN');
  return formatted
}
