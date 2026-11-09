export function prepareChartData(data: any[] | undefined, currentFilterTab: string, currentHour: number) {
  if (!Array.isArray(data)) return []
  if (currentFilterTab !== 'hour') return data

  // API có thể trả nhãn 1h, 01:00, 01:00:00 hoặc số giờ.
  // Không cắt ký tự cuối vì "01:00" sẽ thành "01:0", bị NaN và mất điểm dữ liệu.
  return data.filter((item) => {
    const label = String(item?.label ?? '').trim()
    const match = label.match(/^(\d{1,2})(?::[0-5]\d(?::[0-5]\d)?|\s*h)?$/i)
    if (!match) return false
    const hour = Number(match[1])
    return hour <= 24 && hour <= currentHour
  })
}
