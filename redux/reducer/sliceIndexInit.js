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
    },
    clear: () => {
      return ({
        electricIndex: null,
        waterIndex: null
      })
    }
  }
})

export { indexInitSlice }

const { reducer, actions } = indexInitSlice
export const { initIndex, clear } = actions
export default reducer