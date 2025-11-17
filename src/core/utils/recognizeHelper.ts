import TouchID, { AuthenticateConfig } from 'react-native-touch-id'

interface IsSupportedConfig {
  unifiedErrors?: boolean
  passcodeFallback?: boolean
}

const optionalConfigObjectForIsSupported: IsSupportedConfig = {
  unifiedErrors: true, // use unified error messages (default false)
  passcodeFallback: false,
}

const optionalConfigObjectForAuthenticate: AuthenticateConfig = {
  title: 'Authentication Required', // Android
  imageErrorColor: 'red', // Android
  sensorDescription: 'Touch sensor', // Android
  sensorErrorDescription: 'Failed', // Android
  cancelText: 'Cancel', // Android
  fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
  unifiedErrors: true, // use unified error messages (default false)
  passcodeFallback: false,
  imageColor: 'red',
}

export const onCheckRecognizeSupported = (onResult: (value: string | undefined) => void): void => {
  TouchID.isSupported(optionalConfigObjectForIsSupported)
    .then((biometryType) => {
      if (biometryType === 'TouchID' || biometryType === 'FaceID') {
        // Touch ID is supported on iOS
        // Face ID is supported on iOS
        onResult(biometryType)
      } else if (biometryType === true) {
        // Touch ID is supported on Android
        onResult('TouchID')
      }
    })
    .catch(() => {
      onResult(undefined)
    })
}

export const onRequestRecognizeAuthentication = (
  onSuccess: () => void,
  onError: (errorCode: string) => void,
  title: string,
): void => {
  TouchID.authenticate(title, optionalConfigObjectForAuthenticate)
    .then((success: any) => {
      onSuccess()
      // tslint:disable-next-line:no-console
      // __DEV__ && console.log('RecognizeAuthenticationSuccess:', success);
    })
    .catch((error: any) => {
      onError(error.code)
      // tslint:disable-next-line:no-console
      // __DEV__ && console.log('RecognizeAuthenticationError:', error);
    })
}
