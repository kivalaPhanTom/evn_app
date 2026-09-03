import { createAction } from '@reduxjs/toolkit'
import * as ACTION_TYPES from '../ActionTypes/AuthenType'

export const getToken = createAction<{ username: string; password: string }>(ACTION_TYPES.GET_TOKEN)
