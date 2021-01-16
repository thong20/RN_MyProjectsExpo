import { createSlice } from '@reduxjs/toolkit'

const unitPriceSlice = createSlice({
  name: 'unitPrice',
  initialState: {
    electric: [
      // { id: 'up-202002', date: "2020-02", price: 3000 },
      // { id: 'up-201903', date: "2019-03", price: 2000 },
      // { id: 'up-201803', date: "2018-03", price: 1500 }
    ],
    water: [
      // { id: 'up-202002', date: "2020-02", price: 7000 },
      // { id: 'up-201903', date: "2019-03", price: 6000 },
      // { id: 'up-201803', date: "2018-03", price: 5000 }
    ],
    cableTV: [
      // { id: 'up-202002', date: "2020-02", price: 15000 },
      // { id: 'up-201903', date: "2019-03", price: 13000 }
    ],
    garbage: [
      // { id: 'up-202002', date: "2020-02", price: 15000 },
      // { id: 'up-201903', date: "2019-03", price: 10000 }
    ],
    room: [
      // { id: 'up-202002', date: "2020-02", price: 1700000 },
      // { id: 'up-201903', date: "2019-03", price: 1500000 },
      // { id: 'up-201803', date: "2018-03", price: 1300000 }
    ]
  },
  reducers: {
    initUnitPrice: (state, action) => {
      return action.payload
      // state.electric.unshift(action.payload.electric[0])
      // state.water.unshift(action.payload.water[0])
      // state.garbage.unshift(action.payload.garbage[0])
      // state.cableTV.unshift(action.payload.cableTV[0])
      // state.room.unshift(action.payload.room[0])

      // console.log('state:', state, 'sliceUnitPrice.js - line: 38 ===========================')
    },
    addUnitPrice: (state, action) => {
      state[(Object.keys(action.payload))[0]].unshift((Object.values(action.payload)[0]))
      // return state
    },
    updateUnitPrice: (state, action) => {

    },
    removeUnitPrice: (state, action) => {
      /* 
          Thuật toán gỡ bỏ 1 phần tử trong mảng
          Arr.filter((value, index) => index < Array.length - 1)

          hoặc sử dụng method pop()
          Arr.pop()
          return Arr
      */
    },
    clear: () => {
      return ({})
    }
  }
})

export { unitPriceSlice }
// for react-redux
const { reducer, actions } = unitPriceSlice
export const { initUnitPrice, addUnitPrice, updateUnitPrice, removeUnitPrice, clear } = actions
export default reducer