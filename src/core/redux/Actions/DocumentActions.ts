import { createAction } from '@reduxjs/toolkit'
import * as ACTION_TYPES from '../ActionTypes/DocumentType'

export const getLegal = createAction(ACTION_TYPES.GET_LEGAL)
export const getExistence = createAction<{ currentPlantId: string }>(ACTION_TYPES.GET_EXISTENCE)