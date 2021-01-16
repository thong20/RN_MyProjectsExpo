# Redux - Redux Tool Kit
Install:
  Bước 1: react-redux
    npm install react-redux => Enter
    hoặc
    yarn install react-redux => Enter
  Bước 2: redux-toolkit
    npm install @reduxjs/toolkit
    hoặc
    yarn add @reduxjs/toolkit


import { Provider } from 'react-redux';
import store from './redux/store/store';
import { indexInitSlice } from './redux/reducer/sliceIndexInit'
import { unitPriceSlice } from './redux/reducer/sliceUnitPrice'
import { receiptSlice } from './redux/reducer/sliceReceipt'

Ta có tree folder:
/
|_ redux
|   |_ reducer
|   |   |_ sliceReceipt.js
|   |   |_ sliceIndexInit.js
|   |   |_ ......
|   |
|   |_ store
|       |_ store.js
|
|_ App_addNew.js        


Các bước:
- Tạo slice
- Tạo store
- Wrapp

*** Tạo slice ==============================================
Tóm tắt các bước
  Bước 1: import
    import { createSlice } from '@reduxjs/toolkit'

  Bước 2: khai báo slice
    Trong 1 slice bao gồm: name, initialState và reducers
    Trong reducers bao gồm các ACTIONS mà ta sẽ định nghĩa

  Bước 3: export
    export {tên_slice} // để khai báo trong STORE

    const { reducer, actions } = tên_slice
    export const {action_1, action_2, ...} = actions // để sử dụng với HOOK
    
    export default reducer


Và ở bước 2:
const receiptSlice = createSlice({
  name: 'receipt',
  initialState: [ // khởi tạo STATE
    {
      id: "rp-20200515-124123",
      date: "2020/05/14",
    },
    {
      id: "rp-20200414-124743",
      date: "2020/04/14",
    },
    {
      id: "rp-20200316-124532",
      date: "2020/03/16",
    },
  ],
  reducers: { // Định nghĩa các ACTIONS
    initReceipt: (state, action) => { // ACTION_1
      return action.payload
    },
    addReceipt: (state, action) => { // ACTION_2
      state.unshift(action.payload)
    },
    updateReceipt: (state, action) => { // ACTION_3
      const newReceipt = action.payload
      const idReceipt = state.findIndex(item => item.id === newReceipt.id)

      if (idReceipt >= 0)
        state[idReceipt] = newReceipt
    },
    removeReceipt: (state, action) => { // ACTION_4
      state.splice(index, 1)
    }
  }
})


*** Tạo store ==============================================
Tóm tắt các bước:
  Bước 1: import
    import { configureStore } from '@reduxjs/toolkit'

    import receiptSlice from '../reducer/sliceReceipt'
    import indexInitSlice from '../reducer/sliceIndexInit'
    ......

  Bước 2: khai báo STORE

    const store = configureStore({
      reducer: {
        receipt: reportSlice,
        indexInit: indexInitSlice,
        ......
      }
    })

  Bước 3: export
  export default store

*** Thao tác với Redux-Tool-Kit ==============================================

Để truy xuất các dữ liệu trong STORE, ta sử dụng HOOK của thư viện "react-redux"

import { useSelector, useDispatch } from 'react-redux'

Tiếp tục import các ACTIONS cần thiết, vd:

import { addReceipt } from '../../redux/reducer/sliceReceipt'
......

với:
  useSelector(): dùng để chọn các "state" trong STORE
  useDispatch(): dùng để gọi các ACTION đã import

ví dụ: Trong file App_addNew.js
...
import { useSelector, useDispatch } from 'react-redux'
import { addReceipt } from '../../redux/reducer/sliceReceipt'
...

export defualt const App_addNew = () => {
  const dispatch = useDispatch()
  const myReceipt = useSelector(state => state.receipt) // "receipt" là "key" của reducer trong STORE

  ......
  dispatch(addReceipt( param_here )) // gọi 1 action đã import và truyền tham số vào action đó

  return (
    ......
  )
}

*** Wrapp ứng dụng ==============================================

File App.js ta import <Provider> và "store" rồi bọc bên ngoài các Component
bằng <Provider> này

import { Provider } from 'react-redux';
import store from './redux/store/store';

export default function App () {
  ...
  return(
    <Provider store={store}>
      ...
      ...
    </Provider>
  )
}





