export interface HydroChartItem {
  avgVolume: number | null
  percent: number | null
  values: number | null
  date: string
}

function sanitizeNumber(value: unknown): number | null {
  // Kiểm tra trước khi ép kiểu vì Number(null) và Number('') đều trả về 0.
  // Dữ liệu thiếu phải giữ là null; số 0 thực sự vẫn là giá trị hợp lệ.
  if (typeof value !== 'number' && typeof value !== 'string') return null
  if (typeof value === 'string' && value.trim() === '') return null
  const number = Number(value)
  return Number.isFinite(number) ? number : null
}

export function prepareHydrographicChartData(data: HydroChartItem[], selectedOptionsValue = '') {
  // Chỉ tạo điểm khi có mực nước. Giờ chưa có dữ liệu sẽ không bị vẽ thành 0m.
  // flatMap trả [] để bỏ điểm thiếu mà không thay đổi mảng response gốc.
  const points = (Array.isArray(data) ? data : []).flatMap((item, index) => {
    const value = sanitizeNumber(item.avgVolume)
    if (value === null) return []
    return [{
      // Giữ vị trí gốc: nếu thiếu giờ 1 thì điểm tiếp theo vẫn là giờ 2, không dồn thành giờ 1.
      index,
      // Chế độ 7 ngày dùng nhãn ngày/tháng; chế độ giờ giữ cách đánh số từ response hiện tại.
      label: selectedOptionsValue === '7_DAYS' ? item.date.slice(0, 5) : String(index),
      value,
      percent: sanitizeNumber(item.percent),
    }]
  })
  // Giọt nước chỉ xuất hiện khi điểm có cả mực nước và phần trăm hợp lệ.
  // percent = null thì bỏ giọt nước; percent = 0 vẫn hiển thị đúng 0%.
  const waterDrops = points.flatMap((point) =>
    point.percent === null ? [] : [{ index: point.index, percent: point.percent }],
  )
  return { points, waterDrops }
}
