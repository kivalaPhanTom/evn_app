import { useEffect, useRef, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppState } from 'react-native'

type Callback = () => Promise<void> | void

export function useAlignedHourlyTimer(callback: Callback, options?: { intervalSeconds?: number }) {
  const INTERVAL_SECONDS = options?.intervalSeconds ?? 60
  const TIMER_KEY = 'hourly_logic_last_run_at'
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const alignTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isStartingRef = useRef(false)
  const lastAppStateRef = useRef<string>(AppState.currentState)

  const clearTimers = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (alignTimeoutRef.current) {
      clearTimeout(alignTimeoutRef.current)
      alignTimeoutRef.current = null
    }
  }, [])

  const msUntilNextHour = useCallback(() => {
    const now = new Date()
    const nextHour = new Date(now)
    nextHour.setMinutes(0, 0, 0)
    nextHour.setHours(now.getHours() + 1)
    return nextHour.getTime() - now.getTime()
  }, [])

  const runAndStamp = useCallback(async () => {
    await Promise.resolve(callback())
    await AsyncStorage.setItem(TIMER_KEY, String(Date.now()))
  }, [callback])

  const startAlignedCycle = useCallback(async () => {
    if (isStartingRef.current) {
      console.log('[useAlignedHourlyTimer] B? qua: dang kh?i d?ng...')
      return
    }
    isStartingRef.current = true
    try {
      clearTimers()
      await runAndStamp()

      const waitMs = msUntilNextHour()
    
      // Thi?t l?p l?p ngay (m?i INTERVAL_SECONDS)
      intervalRef.current = setInterval(runAndStamp, INTERVAL_SECONDS * 1000)

      // �?ng th?i gi? timeout d? ch?y ch�nh x�c v�o m?c gi? (resync), nhung kh�ng t�i t?o interval
      alignTimeoutRef.current = setTimeout(async () => {
        await runAndStamp()
        // kh�ng c?n t?o l?i interval n?u d� t?n t?i
      }, waitMs)
    } finally {
      isStartingRef.current = false
    }
  }, [clearTimers, runAndStamp, msUntilNextHour, INTERVAL_SECONDS])

  useEffect(() => {
    let mounted = true

    // Kh?i d?ng l?n d?u khi mount (n?u app dang active)
    if (AppState.currentState === 'active') {
      void startAlignedCycle()
    }

    const sub = AppState.addEventListener('change', (state) => {
      const prev = lastAppStateRef.current
      lastAppStateRef.current = state
      console.log(`[useAlignedHourlyTimer] Tr?ng th�i ?ng d?ng thay d?i: ${prev} -> ${state}`)

      if (!mounted) return

      // V�o n?n ho?c kh�ng ho?t d?ng: d?n timers ngay
      if (state === 'background' || state === 'inactive') {
        console.log('[useAlignedHourlyTimer] ?ng d?ng v�o n?n/kh�ng ho?t d?ng, x�a timers...')
        clearTimers()
        return
      }

      // Tr? l?i active t? n?n/inactive: kh?i d?ng l?i chu k?
      if (state === 'active' && (prev === 'background' || prev === 'inactive')) {
        console.log('[useAlignedHourlyTimer] ?ng d?ng ho?t d?ng tr? l?i, kh?i d?ng l?i chu k? can gi?...')
        // tr�nh async trong listener, dispatch ra microtask
        void Promise.resolve()
          .then(() => startAlignedCycle())
          .catch((err) => console.error('[useAlignedHourlyTimer] L?i khi kh?i d?ng l?i chu k?:', err))
      }
    })

    return () => {
      mounted = false
      sub.remove()
      clearTimers()
    }
  }, [startAlignedCycle, clearTimers])
}
