import { Redirect } from 'expo-router'
import { Platform } from 'react-native'

export default function Index() {
  return Platform.OS === 'ios' && <Redirect href="/splash" />
}
