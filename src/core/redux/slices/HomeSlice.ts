import { createSlice } from '@reduxjs/toolkit'

interface HomeState {
    countRefesh: number
}
const initialState: HomeState = {
    countRefesh: 0,
}

const homeSlice = createSlice({
    name: 'homeSlice',
    initialState,
    reducers: {
        saveState: (state, action) => {
            // Duyệt mỗi key trong action.payload
           
            Object.entries(action.payload).forEach(([key, value]) => {
                // @ts-ignore
                if (state[key] !== value) {
                    // Nếu khác mới gán (update)
                    // immer sẽ handle tạo bản mới
                    // @ts-ignore
                    state[key] = value;
                }
            });
        },
    },
})
const { reducer } = homeSlice
export const { saveState } = homeSlice.actions
export default reducer
