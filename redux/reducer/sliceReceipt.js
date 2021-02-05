import { createSlice } from '@reduxjs/toolkit'
import { updateReceiptsInRedux } from '../../Features/updateReceiptsInRedux'

const receiptSlice = createSlice({
  name: 'receipt',
  initialState: [
    // {
    //   id: "rp-20200915-124914",
    //   date: "2020/09/15",
    //   electricIndex: 2321,
    //   electricIndexOld: 1982,
    //   electricUnitPrice: 3000, // 1.017.000
    //   waterIndex: 1120,
    //   waterIndexOld: 1103,
    //   waterUnitPrice: 7000, // 119.000
    //   garbage: 15000,
    //   cableTV: 0,
    //   room: 1700000 // total: 2.851.000
    // },
    // {
    //   id: "rp-20200814-124976",
    //   date: "2020/08/14",
    //   electricIndex: 1982,
    //   electricIndexOld: 1758,
    //   electricUnitPrice: 3000, // 672.000
    //   waterIndex: 1103,
    //   waterIndexOld: 1089,
    //   waterUnitPrice: 7000, // 98.000
    //   garbage: 15000,
    //   cableTV: 0,
    //   room: 1700000 // 2.485.000
    // },
    // {
    //   id: "rp-20200715-124999",
    //   date: "2020/07/15",
    //   electricIndex: 1758,
    //   electricIndexOld: 1576,
    //   electricUnitPrice: 3000, // 546.000
    //   waterIndex: 1089,
    //   waterIndexOld: 1074,
    //   waterUnitPrice: 7000, // 105.000
    //   garbage: 15000,
    //   cableTV: 0,
    //   room: 1700000 // 2.366.000
    // },
    // {
    //   id: "rp-20200615-124923",
    //   date: "2020/06/13",
    //   electricIndex: 1576,
    //   electricIndexOld: 1389,
    //   electricUnitPrice: 3000, // 561.000
    //   waterIndex: 1074,
    //   waterIndexOld: 1058,
    //   waterUnitPrice: 7000, // 112.000
    //   garbage: 15000,
    //   cableTV: 0,
    //   room: 1700000 // 2.388.000
    // },
    // {
    //   id: "rp-20200515-124123",
    //   date: "2020/05/14",
    //   electricIndex: 1389,
    //   electricIndexOld: 1247,
    //   electricUnitPrice: 3000, // 426.000
    //   waterIndex: 1058,
    //   waterIndexOld: 1042,
    //   waterUnitPrice: 7000, // 112.000
    //   garbage: 15000,
    //   cableTV: 30000,
    //   room: 1700000 // 2.283.000
    // },
    // {
    //   id: "rp-20200414-124743",
    //   date: "2020/04/14",
    //   electricIndex: 1247,
    //   electricIndexOld: 1127,
    //   electricUnitPrice: 3000, // 360.000
    //   waterIndex: 1042,
    //   waterIndexOld: 1028,
    //   waterUnitPrice: 7000, // 98.000
    //   garbage: 15000,
    //   cableTV: 30000,
    //   room: 1700000 // 2.203.000
    // },
    // {
    //   id: "rp-20200316-124532",
    //   date: "2020/03/16",
    //   electricIndex: 1127,
    //   electricIndexOld: 1013,
    //   electricUnitPrice: 3000, // 342.000
    //   waterIndex: 1028,
    //   waterIndexOld: 1014,
    //   waterUnitPrice: 7000, // 98.000
    //   garbage: 15000,
    //   cableTV: 30000,
    //   room: 1700000 // 2.185.000
    // },
    // {
    //   id: "rp-20200214-124876",
    //   date: "2020/02/14",
    //   electricIndex: 1013,
    //   electricIndexOld: 906,
    //   electricUnitPrice: 3000, // 321.000
    //   waterIndex: 1014,
    //   waterIndexOld: 1000,
    //   waterUnitPrice: 7000, // 98.000
    //   garbage: 15000,
    //   cableTV: 30000,
    //   room: 1700000 // 2.164.000
    // },
  ],
  reducers: {
    initReceipt: (state, action) => {
      return action.payload
    },
    addReceipt: (state, action) => {
      state.unshift(action.payload)
    },
    updateReceipt: (state, action) => {
      updateReceiptsInRedux(state, action.payload)
    },
    removeReceipt: (state, action) => { // hàm này sẽ nhận 1 id cần xóa
      state.splice(action.payload, 1)
    },
    clear: () => {
      return ([])
    }

  }
})

export { receiptSlice }

const { reducer, actions } = receiptSlice
export const { addReceipt, updateReceipt, removeReceipt, clear } = actions
export default reducer