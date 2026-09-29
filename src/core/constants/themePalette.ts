/**
 * Bảng màu theme tập trung của app.
 * Muốn đổi màu light/dmode → sửa duy nhất ở file này.
 *
 - Cách dùng trong component:
 *   const p = useThemePalette()                 // palette theo theme hiện tại
 *   <Text style={{ color: p.title }}>...</Text>
 *
 * - Cách dùng trong styles factory:
 *   const createStyles = (isDark: boolean) => {
 *     const p = createThemePalette(isDark)
 *     return StyleSheet.create({ ... })
 *   }
 */
import { useAppTheme } from '../hooks/use-app-theme'

export interface ThemePalette {
  /** Nền trang (TwinkleStars/PagerView) */
  pageBackground: string
  /** Tiêu đề card/section */
  title: string
  /** Chữ chính / giá trị */
  textPrimary: string
  /** Chữ phụ */
  textSecondary: string
  /** Nhãn uppercase (CAO NHẤT, KẾ HOẠCH...) */
  textLabel: string
  /** Số liệu nhấn mạnh (navy ở light) */
  valueAccent: string
  /** Viền input/card */
  border: string
  /** Viền đậm hơn (nút select, ô nổi) */
  borderStrong: string
  /** Nền ô input/tile nhạt */
  inputBg: string
  /** Nền tile thống kê (CAO NHẤT, THẤP NHẤT...) */
  tileBg: string
  /** Nền chip/option active */
  chipBg: string
  /** Nền popup (lịch, chọn tháng...) */
  modalBackground: string
  /** Đường kẻ ngang */
  divider: string
  /** Lưới ngang chart */
  gridRule: string
  /** Trục X chart */
  xAxis: string
  /** Line nét đứt so sánh */
  compareLine: string
  /** Skeleton */
  skeletonBase: string
  skeletonHighlight: string
  /** Icon phụ (lịch...) */
  icon: string
  /** Icon đậm (KẾ HOẠCH/THỰC TẾ...) */
  iconStrong: string
  /** Chữ disabled trong lịch */
  disabledText: string
}

const dark: ThemePalette = {
  pageBackground: '#000033',
  title: '#fff',
  textPrimary: '#fff',
  textSecondary: 'rgba(255, 255, 255, 0.6)',
  textLabel: '#8b92a0',
  valueAccent: '#fff',
  border: 'rgba(255, 255, 255, 0.15)',
  borderStrong: 'rgba(255, 255, 255, 0.25)',
  inputBg: 'rgba(255, 255, 255, 0.06)',
  tileBg: 'rgba(255, 255, 255, 0.05)',
  chipBg: 'rgba(255, 255, 255, 0.06)',
  modalBackground: '#1A1D2E',
  divider: 'rgba(255, 255, 255, 0.1)',
  gridRule: 'rgba(255, 255, 255, 0.1)',
  xAxis: 'rgba(255, 255, 255, 0.1)',
  compareLine: '#A78BFA',
  skeletonBase: '#3A3F47',
  skeletonHighlight: '#6F8196',
  icon: '#fff',
  iconStrong: '#fff',
  disabledText: '#555',
}

const light: ThemePalette = {
  pageBackground: '#F3F4F6',
  title: '#374151',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textLabel: '#475569',
  valueAccent: '#1E3A8A',
  border: 'rgba(0, 0, 0, 0.12)',
  borderStrong: 'rgba(0, 0, 0, 0.15)',
  inputBg: 'rgba(0, 0, 0, 0.04)',
  tileBg: '#ECEDEF',
  chipBg: '#DBEAFE',
  modalBackground: '#FFFFFF',
  divider: 'rgba(0, 0, 0, 0.08)',
  gridRule: '#9CA3AF',
  xAxis: 'rgba(0, 0, 0, 0.12)',
  compareLine: '#7C3AED',
  skeletonBase: '#E5E7EB',
  skeletonHighlight: '#F8FAFC',
  icon: '#6B7280',
  iconStrong: '#475569',
  disabledText: '#D1D5DB',
}

export const themePalette = { dark, light }

export const createThemePalette = (isDark: boolean): ThemePalette => (isDark ? dark : light)

/** Palette theo theme hiện tại — dùng trong component */
export const useThemePalette = (): ThemePalette => {
  const scheme = useAppTheme()
  return createThemePalette(scheme === 'dark')
}
