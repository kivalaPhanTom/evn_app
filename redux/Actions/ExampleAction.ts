import { createAction } from '@reduxjs/toolkit';
import * as ACTION_TYPES from '../ActionTypes/ExampleActionType';

export const callApiSample = createAction<{ id: number; name: string }>(ACTION_TYPES.CALL_API_SAMPLEE) //{ id: number; name: string } is a payload type example