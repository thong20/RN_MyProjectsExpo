import store from '../redux/store/store'
import { createDataChart } from './createDataChart'

import {fb} from '../AppLoading'


function getRateChart(receiptList, name) {
  const chart = createDataChart(receiptList)
  const arr = chart[name]
  const rate = getSixElementFirst(arr)
  return rate.map(i => i.data).reverse()
}

function getSixElementFirst(arr) {
  return arr.filter((value, index) => index < 6)
}

function getAmount(obj) {
  // obj: là item của receipt
  if (typeof obj === 'undefined')
    return ({ electric: 0, water: 0, garbage: 0, cableTV: 0, room: 0, total: 0 })
  const {
    electricIndex, electricIndexOld, electricUnitPrice,
    waterIndex, waterIndexOld, waterUnitPrice,
    garbage, cableTV, room
  } = obj
  const electric = (electricIndex - electricIndexOld) * electricUnitPrice;
  const water = (waterIndex - waterIndexOld) * waterUnitPrice;
  const total = electric + water + room + garbage + cableTV;
  return ({ electric, water, garbage, cableTV, room, total })
}

function getIndexOldValueOf(ArrayData, indexNew, nameUnitPrice) {
  // example: const arr = [{id: 11, price: 15}, {id: 22, price: 20}]
  // getIndexOldValueOf(arr, 0, 'price') => 20
  // getIndexOldValueOf(arr, -1, 'price') => 15
  // getIndexOldValueOf(arr, 1, 'price') => null

  const initIndex = store.getState().indexInit

  const indexOld = indexNew + 1;
  if (indexOld === ArrayData.length) return initIndex[nameUnitPrice]
  return ArrayData[indexOld][nameUnitPrice]
}

function getDateTime() {
  const addZeroIfOne = (n) => {
    return `0${n}`.slice(-2)
  }

  const now = new Date()
  const date = addZeroIfOne(now.getDate())
  const month = addZeroIfOne(now.getMonth() + 1)
  const year = `${now.getFullYear()}`
  const fullDate = year.concat(month, date)

  const hours = addZeroIfOne(now.getHours())
  const minutes = addZeroIfOne(now.getMinutes())
  const seconds = addZeroIfOne(now.getSeconds())
  const fullTime = hours.concat(minutes, seconds)

  return { date, month, year, hours, minutes, seconds }
}

// firebase
async function getDocUID(uid){
  const fbFirestore = fb.firestore()
  return await fbFirestore.collection('users')
    .doc(uid) // chưa có doc
    .get()
    .then( data => data)
    .catch( err => console.log(err))
}


export {
  getRateChart, getSixElementFirst,
  getIndexOldValueOf, getDateTime, getAmount,

  //firebase
  getDocUID
}