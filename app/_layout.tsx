import TwinkleStars from '@/components/Background/TwinkleStarsCore';
import { useColorScheme } from '@/hooks/use-color-scheme';
import StoreProvider from '@/redux/StoreProvider';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StoreProvider>
        <TwinkleStars
          background="#000033"
          particleDensity={50}
          particleColor="#FFFFFF"
          minSize={0.5}
          maxSize={2}
        >
          <Stack
            screenOptions={{
              // Chỉ transparent khi dark mode để thấy TwinkleStars
              contentStyle: {
                backgroundColor: colorScheme === 'dark' ? 'transparent' : '#fff',
              },
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'auto'} />
        </TwinkleStars>
      </StoreProvider>
    </ThemeProvider>
  );
}
