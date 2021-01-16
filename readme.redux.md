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
- Tạo "reducer" và "actions"
- Tạo "store"
- Wrapp <Provider> và "store"
- Sử dụng

*** Tạo reducer ==============================================


*** Tạo store ==============================================



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

*** Sử dụng ==============================================

Các method:
  .getState()
  .dispatch()

vd 1:
  Ở file App.js, do ta không thể import redux-toolkit nên
ta sẽ sử dụng "redux" thuần gọi action của redux-toolkit

Cú pháp:
  Gọi 1 action từ slice của redex-toolkit:
    store.dispatch(tên_reducer.actions.tên_actions(param))

import store from 
function App(){
  ......

  function submit(index, unitPrice) {
    ......

    store.dispatch(indexInitSlice.actions.initIndex(index))
    store.dispatch(unitPriceSlice.actions.initUnitPrice(unitPrice))
    
    ......
  }

  ......
}

vd2:
  Cú pháp: gọi 1 action
    store.dispath(tên_action())


==== Sử dụng với Hook ==============

...
import { useSelector, useDispatch } from 'react-redux'
...

function Demo(){
  const state = useSelector(state => state.<name>)
  const dispatch = useDispatch()
  ...

  dispatch(tên_action(pram1, param2, ...))

  return ...

}

