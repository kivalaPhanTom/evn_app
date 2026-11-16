// Keep the time slot while hiding API sentinel values from the chart.
export const sanitizeChartLineData = (data?: any[]) =>
  Array.isArray(data)
    ? data.map((item: any) => {
        const point = item && typeof item === 'object' ? item : {}
        const value = Number(item && typeof item === 'object' ? item.value : item)
        const isMissing = value === -1 || point.isMissing === true
        return {
          ...point,
          value: isMissing || !Number.isFinite(value) ? 0 : value,
          ...(isMissing ? { isMissing: true, hideDataPoint: true } : {}),
        }
      })
    : []
