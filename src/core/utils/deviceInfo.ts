import {
  getApplicationName,
  getBuildNumber,
  getBundleId,
  getDeviceName,
  getDeviceToken,
  getDeviceType,
  getFingerprint,
  getMacAddress,
  getUniqueId,
  getVersion,
} from 'react-native-device-info'

export const appName: string = getApplicationName()

export const appVersion: string = getVersion()

export const buildNumber: string = getBuildNumber()

export const bundleId: string = getBundleId()

export const uniqueId = async (): Promise<string> => {
  return await getUniqueId()
}

export const deviceType: string = getDeviceType()

export const deviceName = async (): Promise<string> => {
  return await getDeviceName()
}

export const identifier = async (): Promise<string> => {
  return await getFingerprint()
}

export const deviceToken = async (): Promise<string> => {
  return await getDeviceToken()
}

export const macAddress = async (): Promise<string> => {
  return await getMacAddress()
}
