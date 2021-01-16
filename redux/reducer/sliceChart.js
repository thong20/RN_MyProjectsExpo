import { createSlice } from '@reduxjs/toolkit'


const chartSlice = createSlice({
  name: 'chart',
  // initialState: {
  // electric: [ // data = electricAmount / 15.000 => 0 < data < 100
  //   // max tiền điện ~ 1.500.000 = 15.000 * 100
  //   { month: 'Tháng 9', data: 30 },
  //   { month: 'Tháng 8', data: 70 },
  //   { month: 'Tháng 7', data: 26 },
  // ],
  // water: [ // data = waterAmount / 1.500 => 0 < data < 100
  //   // max tiền nước ~ 150.000 = 1.500 * 100
  //   { month: 'Tháng 9', data: 47 },
  //   { month: 'Tháng 8', data: 61 },
  //   { month: 'Tháng 7', data: 44 },
  // ],
  // garbage_cableTV: [ // data = (garbageAmount + cableTVAmount) / 500 => 0 < data < 100
  //   // max tiền rác & cáp ~ 50.000 = 500 * 100
  //   { month: 'Tháng 9', data: 30 },
  //   { month: 'Tháng 8', data: 30 },
  //   { month: 'Tháng 7', data: 60 },
  // ],
  // room: [ // data = roomAmount / 30.000 => 0 < data < 100
  //   // max tiền điện ~ 3.000.000 = 30.000 * 100
  //   { month: 'Tháng 9', data: 57 },
  //   { month: 'Tháng 8', data: 54 },
  //   { month: 'Tháng 7', data: 52 },
  // ],
  // total: [ // data = totalAmount / 50.000 => 0 < data < 100
  //   // max tiền tổng ~ 5.000.000 = 50.000 * 100
  //   { month: 'Tháng 9', data: 45 },
  //   { month: 'Tháng 8', data: 56 },
  //   { month: 'Tháng 7', data: 41 },
  // ]
  // },
  initialState: {
    electric: [],
    water: [],
    garbage_cableTV: [],
    room: [],
    total: []
  },
  reducers: {
    importChart: (state, action) => {
      return { ...action.payload }
    },
    addChartData: (state, action) => {
      // action.payload: Object
      // Object.keys(action.payload) => Array
      // loop Array
      // add vào state

      state.electric.unshift(action.payload.electric)
      state.water.unshift(action.payload.water)
      state.garbage_cableTV.unshift(action.payload.garbage_cableTV)
      state.room.unshift(action.payload.room)
      state.total.unshift(action.payload.total)
    },
    clear: () => {
      return ({})
    }
  }
})
export {chartSlice}
const { reducer, actions } = chartSlice
export const { importChart, addChartData, clear } = actions
export default reducer