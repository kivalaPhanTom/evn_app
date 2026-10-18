import { createAction } from '@reduxjs/toolkit'

export const restoreCompanies = createAction('RESTORE_COMPANIES')
export const getPlants = createAction<string>('GET_PLANTS')
