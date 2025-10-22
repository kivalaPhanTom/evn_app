import React, { createContext, useEffect, useState } from 'react'
import { changeAppLanguage, initI18n } from './index'

interface TranslationContextType {
  language: string
  setLanguage: (lng: string) => Promise<void>
}

export const TranslationContext = createContext<TranslationContextType>({
  language: 'vi',
  setLanguage: async () => {},
})

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState('vi')

  const setLanguage = async (lng: string) => {
    await changeAppLanguage(lng)
    setLanguageState(lng)
  }

  useEffect(() => {
    const initLang = async () => {
      const lang = await initI18n()
      setLanguageState(lang)
    }
    void initLang()
  }, [])

  return <TranslationContext.Provider value={{ language, setLanguage }}>{children}</TranslationContext.Provider>
}
