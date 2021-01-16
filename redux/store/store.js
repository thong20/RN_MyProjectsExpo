import { configureStore } from '@reduxjs/toolkit'
import reportSlice from '../reducer/sliceReceipt'
import unitPriceSlice from '../reducer/sliceUnitPrice'
import indexInitSlice from '../reducer/sliceIndexInit'
import chartSlice from '../reducer/sliceChart'



const store = configureStore({
  reducer: {
    receipt: reportSlice, // [{}, {}]
    unitPrice: unitPriceSlice, // {a: [], b: []}
    indexInit: indexInitSlice, // {}
    chart: chartSlice,
  }
})

export default store