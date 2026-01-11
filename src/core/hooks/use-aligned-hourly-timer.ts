import { useEffect, useRef, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppState } from 'react-native'

type Callback = () => Promise<void> | void

export function useAlignedHourlyTimer(callback: Callback, options?: { intervalMinutes?: number }) {
  const INTERVAL_MINUTES = options?.intervalMinutes ?? 60
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

  const formatMs = useCallback((ms: number) => {
    const s = Math.max(0, Math.floor(ms / 1000))
    const mm = Math.floor(s / 60)
    const ss = s % 60
    return `${mm} phút ${ss} giây (${ms} ms)`
  }, [])

  const runAndStamp = useCallback(async () => {
    await Promise.resolve(callback())
    await AsyncStorage.setItem(TIMER_KEY, String(Date.now()))
  }, [callback])

  const startAlignedCycle = useCallback(async () => {
    if (isStartingRef.current) {
      console.log('[useAlignedHourlyTimer] Bỏ qua: đang khởi động...')
      return
    }
    isStartingRef.current = true
    try {
      clearTimers()
      console.log('[useAlignedHourlyTimer] Chạy ngay và lưu dấu thời gian...')
      await runAndStamp()

      const waitMs = msUntilNextHour()
      console.log(`[useAlignedHourlyTimer] Thời gian còn lại đến lần chạy căn giờ tiếp theo: ${formatMs(waitMs)}`)
      alignTimeoutRef.current = setTimeout(async () => {
        console.log('[useAlignedHourlyTimer] Đã đến mốc căn giờ, chạy và lưu dấu thời gian...')
        await runAndStamp()
        console.log(`[useAlignedHourlyTimer] Thiết lập lặp lại mỗi ${INTERVAL_MINUTES} phút`)
        intervalRef.current = setInterval(runAndStamp, INTERVAL_MINUTES * 60 * 1000)
      }, waitMs)
    } finally {
      isStartingRef.current = false
    }
  }, [clearTimers, runAndStamp, msUntilNextHour, INTERVAL_MINUTES, formatMs])

  useEffect(() => {
    let mounted = true

    // Khởi động lần đầu khi mount (nếu app đang active)
    if (AppState.currentState === 'active') {
      void startAlignedCycle()
    }

    const sub = AppState.addEventListener('change', (state) => {
      const prev = lastAppStateRef.current
      lastAppStateRef.current = state
      console.log(`[useAlignedHourlyTimer] Trạng thái ứng dụng thay đổi: ${prev} -> ${state}`)

      if (!mounted) return

      // Vào nền hoặc không hoạt động: dọn timers ngay
      if (state === 'background' || state === 'inactive') {
        console.log('[useAlignedHourlyTimer] Ứng dụng vào nền/không hoạt động, xóa timers...')
        clearTimers()
        return
      }

      // Trở lại active từ nền/inactive: khởi động lại chu kỳ
      if (state === 'active' && (prev === 'background' || prev === 'inactive')) {
        console.log('[useAlignedHourlyTimer] Ứng dụng hoạt động trở lại, khởi động lại chu kỳ căn giờ...')
        // tránh async trong listener, dispatch ra microtask
        void Promise.resolve()
          .then(() => startAlignedCycle())
          .catch((err) => console.error('[useAlignedHourlyTimer] Lỗi khi khởi động lại chu kỳ:', err))
      }
    })

    return () => {
      mounted = false
      sub.remove()
      clearTimers()
    }
  }, [startAlignedCycle, clearTimers])
}
