
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

// firebase
import {fb} from './AppLoading'


// my Component
import HomeStack from './navigation/HomeStack';
import HomeDrawer from './navigation/HomeDrawer';
import InitialData from './screen/InitialData/initialData';
import LoginScreen from './screen/Login/Login';
import { getDocUID } from './Features/myGetter'

// Redux Toolkit
import { Provider } from 'react-redux';
import store from './redux/store/store';
import { indexInitSlice } from './redux/reducer/sliceIndexInit'
import { unitPriceSlice } from './redux/reducer/sliceUnitPrice'
import { receiptSlice } from './redux/reducer/sliceReceipt'
import { chartSlice } from './redux/reducer/sliceChart'


const consoleLog = n => console.log('****** App.js -- line: ' + n + ' ******');


function App() {
  const DATA = store.getState()
  const { electricIndex, waterIndex } = DATA.indexInit

  const [showHome, setShowHome] = useState(true)

  function submit(index, unitPrice) {

    store.dispatch(indexInitSlice.actions.initIndex(index))
    addItemToAsyncStorage('indexInit', index)
    store.dispatch(unitPriceSlice.actions.initUnitPrice(unitPrice))
    addItemToAsyncStorage('unitPrice', unitPrice)

    setShowHome(true)
  }

  const addItemToAsyncStorage = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      // saving error
    }
  }

  async function fetchThenRender(data){
    // data.data()
    const receipt = data.data().receipt
    const indexInit = data.data().indexInit
    const unitPrice = data.data().unitPrice
    
    store.dispatch(indexInitSlice.actions.initIndex(indexInit))
    store.dispatch(unitPriceSlice.actions.initUnitPrice(unitPrice))
    store.dispatch(receiptSlice.actions.initReceipt(receipt))
    
    await AsyncStorage.setItem('receipt', JSON.stringify(data.data().receipt))
    await AsyncStorage.setItem('indexInit', JSON.stringify(data.data().indexInit))
    await AsyncStorage.setItem('unitPrice', JSON.stringify(data.data().unitPrice))
    await AsyncStorage.setItem('chart', JSON.stringify(data.data().chart))
    
    setShowHome(true)
  }

  useEffect(() => {
    const uid = fb.auth().currentUser.uid

    try{
      AsyncStorage.getItem('uid') // Check uid EXIST in AsyncStorage
        .then(uid_AsyncStorage => {
          if(uid_AsyncStorage == null){ // uid NOT EXIST ==> OK
            console.log('uid_AsyncStorage rỗng')
            AsyncStorage.setItem('uid', uid) // set uid

            getDocUID(uid).then(field => { // field.data() to get value
              if(!Object.keys(field.data()).length){ // length: 0
                setShowHome(false)
              }else{  // field lenght != 0 => fetch OK
                fetchThenRender(field)
              }
            })
          }
          if(uid_AsyncStorage){ // uid EXIST .......
            // console.log(uid_AsyncStorage == 'ToGhqAoNXjRP1ayzvrjHDKePI883')

            // CHECK currentUser.uid === uid_AsyncStorage
            if(uid == uid_AsyncStorage){ // TRUE
              console.log('Trùng UID')
              // Người dùng chưa khởi tạo  --   Người dùng đã khởi tạo
              const keys = AsyncStorage.getAllKeys().then(keys => {
                return keys.filter(item => !item.includes('firebase') && !item.includes('uid'))
              })
              keys.then(key => { 
                if(key.length != 0){ // Người dùng đã khởi tạo
                  setShowHome(true)
                }else{ // Người dùng chưa khởi tạo
                  setShowHome(false)
                }
              }) 
            }else{ // FALSE - Không trùng UID => OK
              console.log('Không trùng UID')
              // test:    []
              // demo:    [ unitPrice, indexInit ]
              // thong20: [ uiniPrice, indexInit, receipt, chart]

              AsyncStorage.setItem('uid', uid) // set uid again
              
              const keys = AsyncStorage.getAllKeys().then(keys => {
                return keys.filter(item => !item.includes('firebase') && !item.includes('uid'))
              })
              keys.then(key => { 
                console.log(key)
                consoleLog(181)
                if(key.length != 0){ // clear AsyncStorage
                  AsyncStorage.multiRemove(["receipt", "unitPrice", "indexInit", "chart"])
                }else{ // không có dữ liệu (Người mới chỉ Khởi tạo index)
                  setShowHome(true)
                }
              }) 
              
              
              // clear Redux
              store.dispatch(indexInitSlice.actions.clear());
              store.dispatch(unitPriceSlice.actions.clear());
              store.dispatch(receiptSlice.actions.clear());
              store.dispatch(chartSlice.actions.clear());
              // Fetch
              getDocUID(uid).then(field => { // field.data() to get value
                if(!Object.keys(field.data()).length){ // length: 0
                  setShowHome(false)
                }else{  // field lenght != 0 => fetch OK
                  fetchThenRender(field)
                }
              })

            }
          }
        })
    }catch(e){
      console.log(e)
      consoleLog(149)
    }

  }, [showHome])

  if(showHome){
    return (
      <NavigationContainer>
        <HomeDrawer />
      </NavigationContainer>
    )
  }else{
    return <InitialData fromInitialData={submit} />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
});


export default App