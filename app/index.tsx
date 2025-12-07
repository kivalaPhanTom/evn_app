import { Redirect } from 'expo-router'

export default function Index() {
  // return Platform.OS === 'ios' && <Redirect href="/splash" /> # temp fix to build apk file for android
  return <Redirect href="/splash" />
}
