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
  Id: string
  Name: string
  Type: string
  PlannedStartDate: string
  PlannedEndDate: string
  PlannedDays: number
  ActualStartDate: string
  ActualEndDate: string
  ActualDays: number
  ActiveMonth: number[]
}

export interface CurrentPlantDetail {
  PlantCode: string
  PlantName: string
  MaintenanceItems: number
  Breakdown: RepairScheduleDetailCategory
  RepairPlannedDays: number
  RepairActualDays: number
  Status: number
  Progress: number
  ImageUrl: string
  Items: CurrentPlantDetailItem[]
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
    PlantCode: '',
    PlantName: '',
    MaintenanceItems: 0,
    Breakdown: { RCM: 0, Major: 0 },
    RepairPlannedDays: 0,
    RepairActualDays: 0,
    Status: 0,
    Progress: 0,
    ImageUrl: '',
    Items: [],
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