import TwinkleStars from '@/components/Background/TwinkleStarsCore';
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

    <TwinkleStars
      background="#000033"
      particleDensity={50}
      particleColor="#FFFFFF"
      minSize={0.5}
      maxSize={2}
    >
      <View style={styles.layout}>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            <Home />
          </ScrollView>
        </View>
      </View>
    </TwinkleStars>
  );
}
