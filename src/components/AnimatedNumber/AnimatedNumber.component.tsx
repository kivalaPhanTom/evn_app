import React, { useEffect, useRef, useState } from 'react'
import { Animated } from 'react-native'

interface AnimatedNumberProps {
  value: number
  duration?: number
  decimals?: number
  formatter?: (n: number) => string
  render?: (text: string) => React.ReactNode
}

export default function AnimatedNumber({
  value,
  duration = 1000,
  decimals = 2,
  formatter,
  render,
}: AnimatedNumberProps) {
  const anim = useRef(new Animated.Value(0)).current
  const [display, setDisplay] = useState<number>(0)
  const listenerId = useRef<string | null>(null)

  useEffect(() => {
    // remove previous listener if any
    if (listenerId.current !== null) {
      anim.removeListener(listenerId.current)
      listenerId.current = null
    }

    listenerId.current = anim.addListener(({ value: v }) => {
      setDisplay(v)
    })

    Animated.timing(anim, {
      toValue: value,
      duration,
      useNativeDriver: false,
    }).start()

    return () => {
      if (listenerId.current !== null) {
        anim.removeListener(listenerId.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration])

  const text = formatter ? formatter(display) : display.toFixed(decimals)

  if (render) return <>{render(text)}</>
  return <>{text}</>
}
