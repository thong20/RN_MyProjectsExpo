import React from 'react'
import store from '../redux/store/store'
import { importChart, addChartData } from '../redux/reducer/sliceChart'

// const receiptList = store.getState('receipt')
function createDataChart(receiptList) {

  let dataChart = {
    electric: [],
    water: [],
    garbage_cableTV: [],
    room: [],
    total: [],
  }
  for (const item of receiptList) {

    const month = +item.date.split('/')[1]
    const electricAmount = (item.electricIndex - item.electricIndexOld) * item.electricUnitPrice
    const waterAmount = (item.waterIndex - item.waterIndexOld) * item.waterUnitPrice
    const garbage_cableTVAmount = item.garbage + item.cableTV
    const roomAmount = item.room
    const totalAmount = electricAmount + waterAmount + garbage_cableTVAmount + roomAmount

    dataChart.electric.push({ month: `Tháng ${month}`, data: Math.round((electricAmount / 15000)) })
    dataChart.water.push({ month: `Tháng ${month}`, data: Math.round((waterAmount / 1500)) })
    dataChart.garbage_cableTV.push({ month: `Tháng ${month}`, data: Math.round((garbage_cableTVAmount / 500)) })
    dataChart.room.push({ month: `Tháng ${month}`, data: Math.round((roomAmount / 30000)) })
    dataChart.total.push({ month: `Tháng ${month}`, data: Math.round((totalAmount / 50000)) })
  }

  return dataChart
}
export { createDataChart }