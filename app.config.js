import 'dotenv/config'

const FALLBACK_API_BASE_URL = 'https://mygenco3-api.genco3.com/'

function normalizeApiBaseUrl(value) {
  const trimmed = (value || '').trim().replace(/^['"]+|['"]+$/g, '')
  return trimmed.startsWith('http') ? trimmed : FALLBACK_API_BASE_URL
}

export default ({ config }) => ({
  ...config,
  android: {
    ...config.android,
    package: 'com.genco3.hppgenco3',
  },
  extra: {
    ...config.extra, // giữ các giá trị từ app.json
    API_BASE_URL: normalizeApiBaseUrl(process.env.API_BASE_URL),
  },
  plugins: [
    'expo-font',
    'expo-image',
    'expo-localization',
    'expo-status-bar',
    'expo-web-browser',
    './plugins/withSceneManifest.js',
  ],
})
