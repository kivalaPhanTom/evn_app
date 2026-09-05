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
      console.log('[useAlignedHourlyTimer] Bỏ qua: đang khởi động...')
      return
    }
    isStartingRef.current = true
    try {
      clearTimers()
      await runAndStamp()

      const waitMs = msUntilNextHour()
    
      // Thiết lập lặp ngay (mỗi INTERVAL_SECONDS)
      intervalRef.current = setInterval(runAndStamp, INTERVAL_SECONDS * 1000)

      // Đồng thời giữ timeout để chạy chính xác vào mốc giờ (resync), nhưng không tái tạo interval
      alignTimeoutRef.current = setTimeout(async () => {
        await runAndStamp()
        // không cần tạo lại interval nếu đã tồn tại
      }, waitMs)
    } finally {
      isStartingRef.current = false
    }
  }, [clearTimers, runAndStamp, msUntilNextHour, INTERVAL_SECONDS])

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
