import { useEffect, useState } from 'react'
import { Dimensions, PixelRatio } from 'react-native'

// ===============================
// 🔹 BASE DESIGN SIZE (theo Figma)
// ===============================
const BASE_WIDTH = 375 // iPhone 11 width
const BASE_HEIGHT = 812

const TABLET_MIN_SHORT_SIDE = 768
const COMPACT_SCALE_MIN_SCREEN_LONG_SIDE = 768

const getDimensions = () => ({
  window: Dimensions.get('window'),
  screen: Dimensions.get('screen'),
})

let dimensions = getDimensions()

// ===============================
// 🔹 AUTO UPDATE khi xoay màn hình
// ===============================
Dimensions.addEventListener('change', (nextDimensions) => {
  dimensions = nextDimensions
})

// ===============================
// 🔹 Tablet heuristic (avoid native module at load time)
//    returns true khi kích thước lớn hơn breakpoint
// ===============================
export const isTablet = (): boolean =>
  Math.min(dimensions.window.width, dimensions.window.height) >= TABLET_MIN_SHORT_SIDE

// Giữ tỷ lệ gọn của màn hình dài ngay cả khi thanh hệ thống đổi chiều cao cửa sổ.
export const hasCompactDesignScale = (screen = dimensions.screen): boolean =>
  Math.max(screen.width, screen.height) >= COMPACT_SCALE_MIN_SCREEN_LONG_SIDE

// ===============================
// 🔹 CORE SCALE FUNCTION
// ===============================
type ScaleType = 'horizontal' | 'vertical' | 'moderate' | 'font'

const scaleSize = (
  { window, screen }: ReturnType<typeof getDimensions>,
  size: number,
  type: ScaleType,
  factor = 0.5,
): number => {
  const designFactor = hasCompactDesignScale(screen) ? 0.7 : 1
  const scaleW = (window.width / BASE_WIDTH) * designFactor
  const scaleH = (window.height / BASE_HEIGHT) * designFactor

  switch (type) {
    case 'horizontal':
      return Math.round(PixelRatio.roundToNearestPixel(size * scaleW))

    case 'vertical':
      return Math.round(PixelRatio.roundToNearestPixel(size * scaleH))

    case 'font':
      return Math.round(PixelRatio.roundToNearestPixel(size * scaleW * 0.95))

    default: // moderate
      const scaled = size * scaleW
      return Math.round(PixelRatio.roundToNearestPixel(size + (scaled - size) * factor))
  }
}

export const px = (size: number, type: ScaleType = 'moderate', factor = 0.5): number =>
  scaleSize(dimensions, size, type, factor)

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
  const [dims, setDims] = useState(getDimensions)

  useEffect(() => {
    const sub = Dimensions.addEventListener('change', setDims)

    return () => {
      sub.remove()
    }
  }, [])

  return {
    scale: (size: number, factor?: number) => scaleSize(dims, size, 'moderate', factor),
    h: (size: number) => scaleSize(dims, size, 'horizontal'),
    v: (size: number) => scaleSize(dims, size, 'vertical'),
    f: (size: number) => scaleSize(dims, size, 'font'),
  }
}
