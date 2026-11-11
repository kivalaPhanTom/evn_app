export type RegulationType = 'hourly' | 'daily'
export type HydrologyPeriodOption = 'HOURS' | '7_DAYS'

export const HYDROLOGY_PERIOD_OPTIONS: { label: string; value: HydrologyPeriodOption }[] = [
  { label: 'Theo giờ', value: 'HOURS' },
  { label: 'Theo 7 ngày gần nhất', value: '7_DAYS' },
]

export function getDefaultHydrologyPeriod(regulationType?: RegulationType): HydrologyPeriodOption {
  return regulationType === 'daily' ? '7_DAYS' : 'HOURS'
}

export function getHydrologyApiType(option: HydrologyPeriodOption): 'hour' | 'day' {
  return option === '7_DAYS' ? 'day' : 'hour'
}
