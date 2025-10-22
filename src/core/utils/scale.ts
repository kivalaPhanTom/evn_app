import { useEffect, useState } from 'react'
import { Dimensions, PixelRatio } from 'react-native'

// ===============================
// 🔹 BASE DESIGN SIZE (theo Figma)
// ===============================
const BASE_WIDTH = 375 // iPhone 11 width
const BASE_HEIGHT = 812

// ===============================
// 🔹 GLOBAL SCALE VALUES
// ===============================
let { width, height } = Dimensions.get('window')
let scaleW = width / BASE_WIDTH
let scaleH = height / BASE_HEIGHT

// ===============================
// 🔹 AUTO UPDATE khi xoay màn hình
// ===============================
Dimensions.addEventListener('change', ({ window }) => {
  width = window.width
  height = window.height
  scaleW = width / BASE_WIDTH
  scaleH = height / BASE_HEIGHT
})

// ===============================
// 🔹 Tablet heuristic (avoid native module at load time)
//    returns true khi kích thước lớn hơn breakpoint
// ===============================
export const isTablet = (): boolean => {
  // breakpoint phổ biến cho tablet: 768 (px)
  const maxDim = Math.max(width, height)
  return maxDim >= 768
}

// ===============================
// 🔹 CORE SCALE FUNCTION
// ===============================
export const px = (
  size: number,
  type: 'horizontal' | 'vertical' | 'moderate' | 'font' = 'moderate',
  factor: number = 0.5,
): number => {
  const tabletFactor = isTablet() ? 0.7 : 1 // Tablet scale nhẹ hơn

  switch (type) {
    case 'horizontal':
      return Math.round(PixelRatio.roundToNearestPixel(size * scaleW * tabletFactor))

    case 'vertical':
      return Math.round(PixelRatio.roundToNearestPixel(size * scaleH * tabletFactor))

    case 'font':
      return Math.round(PixelRatio.roundToNearestPixel(size * scaleW * tabletFactor * 0.95))

    default: // moderate
      const scaled = size * scaleW * tabletFactor
      return Math.round(PixelRatio.roundToNearestPixel(size + (scaled - size) * factor))
  }
}

// ===============================
// 🔹 SHORTCUTS
// ===============================
px.h = (size: number) => px(size, 'horizontal')
px.v = (size: number) => px(size, 'vertical')
px.m = (size: number) => px(size, 'moderate')
px.f = (size: number) => px(size, 'font')

/**
 * 📘 Usage:
 * px(20)  → moderate scale (mặc định)
 * px.h(10) → scale theo chiều ngang
 * px.v(10) → scale theo chiều dọc
 * px.f(16) → scale cho font
 */

// ===============================
// 🔹 HOOK: useScaledSize
// (Realtime cập nhật khi xoay)
// ===============================
export const useScaledSize = () => {
  const [dims, setDims] = useState(Dimensions.get('window'))

  useEffect(() => {
    const sub = Dimensions.addEventListener('change', ({ window }) => {
      setDims(window)
    })

    return () => {
      sub?.remove?.()
    }
  }, [])

  const scaleWLocal = dims.width / BASE_WIDTH
  const scaleHLocal = dims.height / BASE_HEIGHT
  const tabletFactor = Math.max(dims.width, dims.height) >= 768 ? 0.7 : 1

  const scale = (size: number, factor: number = 0.5) =>
    Math.round(PixelRatio.roundToNearestPixel(size + (size * scaleWLocal * tabletFactor - size) * factor))

  const h = (size: number) => Math.round(PixelRatio.roundToNearestPixel(size * scaleWLocal * tabletFactor))

  const v = (size: number) => Math.round(PixelRatio.roundToNearestPixel(size * scaleHLocal * tabletFactor))

  const f = (size: number) => Math.round(PixelRatio.roundToNearestPixel(size * scaleWLocal * tabletFactor * 0.95))

  return { scale, h, v, f }
}
