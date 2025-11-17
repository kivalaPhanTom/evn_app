import AsyncStorage from '@react-native-async-storage/async-storage'
import i18n, { changeLanguage } from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import vi from './locales/vi.json'

const STORAGE_KEY = 'APP_LANGUAGE'

const resources = {
  en: { translation: en },
  vi: { translation: vi },
}

export const initI18n = async () => {
  const savedLang = await AsyncStorage.getItem(STORAGE_KEY)
  const initialLang = savedLang || 'vi'

  await (i18n as any).use(initReactI18next).init({
    resources,
    lng: initialLang,
    fallbackLng: 'vi',
    interpolation: { escapeValue: false },
  })

  return initialLang
}

export const changeAppLanguage = async (lng: string) => {
  await AsyncStorage.setItem(STORAGE_KEY, lng)
  await changeLanguage(lng)
}

export default i18n
