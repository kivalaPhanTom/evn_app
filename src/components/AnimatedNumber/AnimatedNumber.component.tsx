import React, { useEffect, useRef, useState } from 'react'
import { Animated, Easing } from 'react-native'

interface AnimatedNumberProps {
  value: number
  duration?: number
  decimals?: number
  formatter?: (n: number) => string
  render?: (text: string) => React.ReactNode
  // thêm tùy chọn để mượt hơn
  easing?: (value: number) => number
  debounceMs?: number
  pixelsPerSecond?: number // tốc độ thay đổi, giúp duration tự động theo khoảng cách
}

export default function AnimatedNumber({
  value,
  duration = 1000,
  decimals = 2,
  formatter,
  render,
  easing = Easing.out(Easing.cubic),
  debounceMs = 120, // giảm giật do API trả về liên tục
  pixelsPerSecond = 100, // tốc độ thay đổi giá trị/giây
}: AnimatedNumberProps) {
  const anim = useRef(new Animated.Value(0)).current
  const [display, setDisplay] = useState<number>(0)
  const listenerId = useRef<string | null>(null)
  const targetRef = useRef<number>(value)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // giữ một listener ổn định, không remove/add lại mỗi lần
  useEffect(() => {
    if (listenerId.current == null) {
      listenerId.current = anim.addListener(({ value: v }) => {
        setDisplay(v)
      })
    }
    return () => {
      if (listenerId.current !== null) {
        anim.removeListener(listenerId.current)
        listenerId.current = null
      }
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const animateTo = (to: number) => {
    // dừng animation hiện tại trước khi bắt đầu cái mới
    anim.stopAnimation((current: number) => {
      // duration tự động theo khoảng cách để giữ tốc độ đều
      const delta = Math.abs(to - current)
      const autoDuration =
        pixelsPerSecond > 0 ? Math.max(120, (delta / pixelsPerSecond) * 1000) : duration

      Animated.timing(anim, {
        toValue: to,
        duration: duration ?? autoDuration,
        easing,
        useNativeDriver: false,
      }).start()
    })
  }

  // debounce các lần cập nhật value từ API để tránh giật
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }
    targetRef.current = value
    debounceTimer.current = setTimeout(() => {
      animateTo(targetRef.current)
    }, debounceMs)

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, debounceMs, duration, easing, pixelsPerSecond])

  const text = formatter ? formatter(display) : display.toFixed(decimals)

  if (render) return <>{render(text)}</>
  return <>{text}</>
}
