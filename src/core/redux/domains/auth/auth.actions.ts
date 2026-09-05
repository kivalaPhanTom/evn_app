import { createAction } from '@reduxjs/toolkit'

export const getToken = createAction<{ username: string; password: string }>('GET_TOKEN')