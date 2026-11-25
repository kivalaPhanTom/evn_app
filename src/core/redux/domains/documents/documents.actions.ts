import { createAction } from '@reduxjs/toolkit'

export const getLegal = createAction<{ companyId?: string | null }>('GET_LEGAL')
export const getExistence = createAction<{ currentPlantId?: string | null }>('GET_EXISTENCE')