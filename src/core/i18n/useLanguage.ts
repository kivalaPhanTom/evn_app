import { useContext } from 'react'
import { TranslationContext } from './TranslationProvider'

export const useLanguage = () => {
  const { language, setLanguage } = useContext(TranslationContext)
  return { language, setLanguage }
}
