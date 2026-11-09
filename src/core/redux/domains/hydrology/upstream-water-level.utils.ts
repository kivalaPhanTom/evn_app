function finiteNumber(value: unknown): number | null {
  if (typeof value !== 'number' && typeof value !== 'string') return null
  if (typeof value === 'string' && value.trim() === '') return null
  const number = Number(value)
  return Number.isFinite(number) ? number : null
}

export function normalizeUpstreamWaterLevel(response: any) {
  let data = response
  // Response v2 bọc kết quả trong data; component cần đọc todayUpstream trực tiếp.
  for (let depth = 0; depth < 4; depth += 1) {
    if (Array.isArray(data?.todayUpstream) || Array.isArray(data?.samePeriodUpstream)) break
    const nested = data?.data ?? data?.Data ?? data?.result
    if (nested === undefined || nested === data) break
    data = nested
  }
  const todayUpstream = Array.isArray(data?.todayUpstream) ? data.todayUpstream : []
  const samePeriodUpstream = Array.isArray(data?.samePeriodUpstream) ? data.samePeriodUpstream : []
  const values: number[] = todayUpstream.flatMap((point: any) => {
    const value = finiteNumber(point?.value)
    return value === null ? [] : [value]
  })

  // API có thể chỉ trả hai chuỗi và đơn vị, không trả thống kê.
  // Khi thiếu thống kê, tính từ điểm đo hợp lệ; bỏ null để không kéo min/current về 0.
  // Ưu tiên thống kê backend nếu có, kể cả giá trị bằng 0.
  return {
    unit: data?.unit || 'm',
    todayUpstream,
    samePeriodUpstream,
    currentValue: finiteNumber(data?.currentValue) ?? values[values.length - 1] ?? null,
    minValue: finiteNumber(data?.minValue) ?? (values.length ? Math.min(...values) : null),
    maxValue: finiteNumber(data?.maxValue) ?? (values.length ? Math.max(...values) : null),
    avgValue: finiteNumber(data?.avgValue) ?? (values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null),
  }
}
