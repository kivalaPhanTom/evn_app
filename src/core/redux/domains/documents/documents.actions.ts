import { createAction } from '@reduxjs/toolkit'

export const getLegal = createAction('GET_LEGAL')
export const getExistence = createAction<{ currentPlantId: string }>('GET_EXISTENCE')