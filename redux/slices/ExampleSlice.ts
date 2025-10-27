import { createSlice } from '@reduxjs/toolkit';

interface ExampleState {
  id: number | null
  name: string
}
const initialState: ExampleState  = {
    id: null,
    name: ""
}

const exampleSlice = createSlice({
    name: 'exampleSlice',
    initialState,
    reducers: {
        setExmaple: (state, action) => {
            let newState = { ...state }
          
            return newState
        }
    },
});
const { reducer } = exampleSlice;
export const { setExmaple } = exampleSlice.actions;
export default reducer;