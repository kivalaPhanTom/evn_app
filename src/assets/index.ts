import type { ImageSource } from 'expo-image'

// Group icons
export const icons = {
  evnLogo: require('./icons/evn_logo.png') as ImageSource,
}

// Group regular images
export const images = {
  // Example: bgLogin: require('./images/bg-login.png') as ImageSource,
  waves: require('./images/wave.png') as ImageSource,
}

// Default export for convenience
export default { icons, images }
