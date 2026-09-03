import React, { useEffect, useRef, useState } from 'react'
import { Animated, Easing } from 'react-native'

interface AnimatedNumberProps {
  value: number
  duration?: number
  decimals?: number
  isInitZero?: boolean
  formatter?: (n: number) => string
  render?: (text: string) => React.ReactNode
  // th�m t�y ch?n d? mu?t hon
  easing?: (value: number) => number
  debounceMs?: number
  pixelsPerSecond?: number // t?c d? thay d?i, gi�p duration t? d?ng theo kho?ng c�ch
}

export default function AnimatedNumber({
  value,
  duration = 1000,
  decimals = 2,
  isInitZero = false,
  formatter,
  render,
  easing = Easing.out(Easing.cubic),
  debounceMs = 120, // gi?m gi?t do API tr? v? li�n t?c
  pixelsPerSecond = 100, // t?c d? thay d?i gi� tr?/gi�y
}: AnimatedNumberProps) {
  const anim = useRef(new Animated.Value(isInitZero ? value : 0)).current
  const [display, setDisplay] = useState<number>(isInitZero ? value : 0)
  const listenerId = useRef<string | null>(null)
  const targetRef = useRef<number>(value)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // gi? m?t listener ?n d?nh, kh�ng remove/add l?i m?i l?n
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
    // d?ng animation hi?n t?i tru?c khi b?t d?u c�i m?i
    anim.stopAnimation((current: number) => {
      // duration t? d?ng theo kho?ng c�ch d? gi? t?c d? d?u
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

  // debounce c�c l?n c?p nh?t value t? API d? tr�nh gi?t
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
