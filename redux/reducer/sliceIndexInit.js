import { createSlice } from '@reduxjs/toolkit'

const indexInitSlice = createSlice({
  name: 'indexInit',
  initialState: {
    electricIndex: null,
    waterIndex: null
  },
  reducers: {
    initIndex: (state, action) => {
      return action.payload
    }
  }
})

export { indexInitSlice }

const { reducer, actions } = indexInitSlice
export const { initIndex } = actions
export default reducer