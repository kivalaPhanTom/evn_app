import * as Application from 'expo-application'
import * as Device from 'expo-device'
import { Platform } from 'react-native'

export function getModel(): string {
  return Device.modelName ?? Device.deviceName ?? 'Unknown'
}

export async function getUniqueId(): Promise<string | null> {
  if (Platform.OS === 'android') return (await Application.getAndroidId()) ?? null
  if (Platform.OS === 'ios') return await Application.getIosIdForVendorAsync()
  return null
}

export function getBrand(): string {
  return Device.brand ?? 'Unknown'
}
