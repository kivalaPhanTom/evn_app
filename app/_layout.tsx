import { useColorScheme } from '@/hooks/use-color-scheme';
import { View, Text, ScrollView } from 'react-native'
import StoreProvider from '@/redux/StoreProvider';
import 'react-native-reanimated';
import Home from './Home/Home';
import styles from './layout.styles'

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.layout}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <Home />
        </ScrollView>
      </View>
    </View>
  );
}
