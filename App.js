import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeStack from './navigation/HomeStack';
import HomeDrawer from './navigation/HomeDrawer';
import InitialData from './screen/InitialData/initialData';

import { Provider } from 'react-redux';
import store from './redux/store/store';
import { indexInitSlice } from './redux/reducer/sliceIndexInit'
import { unitPriceSlice } from './redux/reducer/sliceUnitPrice'
import { receiptSlice } from './redux/reducer/sliceReceipt'

import LoginScreen from './screen/Login/Login';

const consoleLog = n => console.log('****** App.js -- line: ' + n + ' ******');

export default function App() {
  const DATA = store.getState()
  const { electricIndex, waterIndex } = DATA.indexInit

  const [show, setShow] = useState(true)

  function submit(index, unitPrice) {

    console.log(unitPrice, 'Submit App.js - line: 26 ========================')

    store.dispatch(indexInitSlice.actions.initIndex(index))
    storeData('indexInit', index)
    store.dispatch(unitPriceSlice.actions.initUnitPrice(unitPrice))
    storeData('unitPrice', unitPrice)

    setShow(true)
  }

  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      // saving error
    }
  }
  const getMutiple = async (keys) => {

    try {
      console.log(await AsyncStorage.getAllKeys())
      consoleLog(48)
      // [[], []]
      const jsonValue = await AsyncStorage.multiGet(keys)


      const indexInit = jsonValue.filter((value, index) => {
        return value[0] == 'indexInit'
      })
      // console.log(indexInit[0][1], 'line: 59 ===================')
      if (indexInit[0][1] == null) { setShow(false); return }
      // [["indexInit", "json"]]
      store.dispatch(indexInitSlice.actions.initIndex(JSON.parse(indexInit[0][1])))

      const unitPrice = jsonValue.filter((value, index) => {
        return value[0] == 'unitPrice' // => ['unitPrice', value]
      })
      // console.log(JSON.parse(unitPrice[0][1]), 'line: 58 ========================')
      // [["unitPrice", "json"]]
      store.dispatch(unitPriceSlice.actions.initUnitPrice(JSON.parse(unitPrice[0][1])))

      // [["receipt", "json"]]
      const receipt = jsonValue.filter((value, index) => {
        return value[0] == 'receipt'
      })
      // console.log(JSON.parse(receipt[0][1]), 'line: 73 ========================')
      store.dispatch(receiptSlice.actions.initReceipt(JSON.parse(receipt[0][1])))

    } catch (e) {
      // error reading value
    }
  }

  const removeValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch (e) {
      // remove error
    }

    console.log('Remove Done.')
  }
  const clearStorage = async () => {
    await AsyncStorage.clear()
  }

  useEffect(() => {
    getMutiple(['indexInit', 'receipt', 'unitPrice', 'chart'])
  }, [])

  return (
    <LoginScreen />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
});
