import { createAction } from '@reduxjs/toolkit'
import * as ACTION_TYPES from '../ActionTypes/ModuleActionType'
export const getModules = createAction(ACTION_TYPES.GET_MODULES)
