import { useContext } from 'react'
import { Appearance } from 'react-native'
import { ThemeToggleContext } from '../context/theme'

// Returns 'light' | 'dark'
export function useAppTheme(): 'light' | 'dark' {
  // ThemeToggleContext may be undefined if used outside provider; fallback to system
  const ctx = useContext(ThemeToggleContext as any) as { preference?: string } | undefined
  const preference = ctx?.preference ?? 'system'
  const system = (Appearance.getColorScheme() ?? 'light') as 'light' | 'dark'
  return preference === 'system' ? system : (preference as 'light' | 'dark')
}
