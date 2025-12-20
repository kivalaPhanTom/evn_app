import type { ImageSource } from 'expo-image'

// Group icons
export const icons = {
  evnLogo: require('./icons/evn_genco3_logo.webp') as ImageSource,
  tickIcon: require('./icons/green_tick_icon.svg') as ImageSource,
  toolIcon: require('./icons/tool_icon.svg') as ImageSource,
}

// Group regular images
export const images = {
  // Example: bgLogin: require('./images/bg-login.png') as ImageSource,
  waves: require('./images/wave.png') as ImageSource,
  buonKuopBg: require('./images/buon-kuop-bg.jpg') as ImageSource,
}

// Default export for convenience
export default { icons, images }
