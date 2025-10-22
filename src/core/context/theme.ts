import { createContext } from 'react'

export type ThemePref = 'light' | 'dark' | 'system'

export const ThemeToggleContext = createContext<{
  preference: ThemePref
  setPreference: (p: ThemePref) => void
  toggle: () => void
}>({
  preference: 'system',
  setPreference: () => {},
  toggle: () => {},
})
