interface FlowPoint {
  label: string
  value: number
}

export function combineOutflowSeries(qcm: FlowPoint[], qxt: FlowPoint[]): FlowPoint[] {
  const spillByLabel = new Map(qxt.map((point) => [point.label, point.value]))

  // Qxả = Q chạy máy + Q xả tràn. Ghép theo nhãn giờ để không cộng nhầm khi hai mảng khác thứ tự.
  // Chỉ cộng khi có đủ hai thành phần ở cùng giờ; Q xả tràn bằng 0 vẫn là dữ liệu hợp lệ.
  return qcm.flatMap((point) => {
    const spill = spillByLabel.get(point.label)
    if (spill === undefined) return []
    return [{ label: point.label, value: point.value + spill }]
  })
}
