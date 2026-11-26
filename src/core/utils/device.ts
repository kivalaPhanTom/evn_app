import { requireOptionalNativeModule } from 'expo'
import { Platform } from 'react-native'

const device = requireOptionalNativeModule<Pick<typeof import('expo-device'), 'modelName' | 'deviceName' | 'brand'>>('ExpoDevice')

export function getModel(): string {
  return device?.modelName ?? device?.deviceName ?? 'Unknown'
}

export async function getUniqueId(): Promise<string | null> {
  if (!requireOptionalNativeModule('ExpoApplication')) return null
  const Application = await import('expo-application')
  if (Platform.OS === 'android') return (await Application.getAndroidId()) ?? null
  if (Platform.OS === 'ios') return await Application.getIosIdForVendorAsync()
  return null
}

export function getBrand(): string {
  return device?.brand ?? 'Unknown'
}
