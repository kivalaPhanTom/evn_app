import 'react-native-gesture-handler';
import { Redirect } from 'expo-router'
import { Platform } from 'react-native'
export default function Index() {
  return Platform.OS === 'ios' ? <Redirect href="/splash" />: <Redirect href="/splash" />
  // return <Redirect href="/splash" />
}
