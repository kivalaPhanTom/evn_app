import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface RepairScheduleDetailCategory {
  Total?: number
  RCM: number
  Major: number
}

interface RepairScheduleDetailDay {
  Plan: number
  Actual: number
}

interface RepairScheduleDetailItem {
  PlantCode: string
  PlantName: string
  Status: number
  Category: RepairScheduleDetailCategory
  Day: RepairScheduleDetailDay
}

interface CurrentPlantDetailItem {
  id: string
  name: string
  type: string
  plannedStartDate: string
  plannedEndDate: string
  plannedDays: number
  actualStartDate: string
  actualEndDate: string
  actualDays: number
  activeMonth: number[]
}

export interface CurrentPlantDetail {
  plantCode: string
  plantName: string
  maintenanceItems: number
  breakdown: { rcm: number; major: number }
  repairPlannedDays: number
  repairActualDays: number
  status: number
  progress: number
  imageUrl: string
  items: CurrentPlantDetailItem[]
}

export interface RepairScheduleState {
  TotalCategory: number
  TotalActualDay: number
  TotalRCMCategory: number
  TotalMajorCategory: number
  Details: RepairScheduleDetailItem[]
  isRepairerScheduleLoading: boolean
  isDetailRepairScheduleLoading: boolean
  currentPlantDetail: CurrentPlantDetail
}

const initialState: RepairScheduleState = {
  TotalCategory: 0,
  TotalActualDay: 0,
  TotalRCMCategory: 0,
  TotalMajorCategory: 0,
  Details: [],
  isRepairerScheduleLoading: false,
  isDetailRepairScheduleLoading: false,
  currentPlantDetail: {
    plantCode: '',
    plantName: '',
    maintenanceItems: 0,
    breakdown: { rcm: 0, major: 0 },
    repairPlannedDays: 0,
    repairActualDays: 0,
    status: 0,
    progress: 0,
    imageUrl: '',
    items: [],
  },
}

const maintenanceSlice = createSlice({
  name: 'maintenance',
  initialState,
  reducers: {
    setRepairSchedule: (state, action: PayloadAction<Partial<RepairScheduleState>>) => {
      Object.assign(state, action.payload)
    },
    setLoading: (state, action: PayloadAction<Partial<RepairScheduleState>>) => {
      Object.assign(state, action.payload)
    },
    setCurrentPlantDetail: (state, action: PayloadAction<CurrentPlantDetail>) => {
      state.currentPlantDetail = action.payload
    },
  },
})

export const { setRepairSchedule, setLoading, setCurrentPlantDetail } = maintenanceSlice.actions
export default maintenanceSlice.reducer