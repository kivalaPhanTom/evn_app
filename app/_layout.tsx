import TwinkleStars from '@/components/Background/TwinkleStarsCore';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
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
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    //   <StoreProvider>
    //     <TwinkleStars
    //       background="#000033"
    //       particleDensity={50}
    //       particleColor="#FFFFFF"
    //       minSize={0.5}
    //       maxSize={2}
    //     >
    //       <Stack
    //         screenOptions={{
    //           // Chỉ transparent khi dark mode để thấy TwinkleStars
    //           contentStyle: {
    //             backgroundColor: colorScheme === 'dark' ? 'transparent' : '#fff',
    //           },
    //         }}
    //       >
    //         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    //         <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
    //       </Stack>
    //       <StatusBar style={colorScheme === 'dark' ? 'light' : 'auto'} />
    //     </TwinkleStars>
    //   </StoreProvider>
    // </ThemeProvider>
    <SafeAreaView style={styles.layout}>
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
    </SafeAreaView>
  );
}
