import { createAction } from '@reduxjs/toolkit'

export const getModules = createAction<{ companyId: string; username: string }>('GET_MODULES')
