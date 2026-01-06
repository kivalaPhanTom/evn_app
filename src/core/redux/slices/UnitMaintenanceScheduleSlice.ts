import { createSlice } from '@reduxjs/toolkit'
import { set } from 'react-hook-form'

interface RepairScheduleDetailCategory {
  Total: number
  Minor: number
  Medium: number
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

interface RepairSchedule {
  TotalCategory: number
  TotalActualDay: number
  TotalMinorCategory: number
  TotalMediumCategory: number
  TotalMajorCategory: number
  Details: RepairScheduleDetailItem[]
  isRepairerScheduleLoading: boolean
}

const initialState: RepairSchedule = {
  TotalCategory: 0,
  TotalActualDay: 0,
  TotalMinorCategory: 0,
  TotalMediumCategory: 0,
  TotalMajorCategory: 0,
  Details: [],
  isRepairerScheduleLoading: false,
}

const unitMaintenanceScheduleSlice = createSlice({
  name: 'unitMaintenanceScheduleSlice',
  initialState,
  reducers: {
    setRepairSchedule: (state, action) => {
      let newState = { ...state }
      newState = action.payload
      return newState
    },
    setLoading: (state, action) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})
const { reducer } = unitMaintenanceScheduleSlice
export const { setRepairSchedule, setLoading } = unitMaintenanceScheduleSlice.actions
export default reducer
