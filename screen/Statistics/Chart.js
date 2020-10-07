/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types'
import { Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'expo-chart-kit'
import hexToRgba from 'hex-to-rgba'

import { useSelector } from 'react-redux'

import { Block, Text } from '../../components'
import * as theme from '../../constants/theme'
import { getRateChart, getAmount } from '../../Features/myGetter'
import format from '../../Features/standardize'

const consoleLog = n => console.log('****** Chart.js -- line: ' + n + ' ******');

const { width } = Dimensions.get('window')

export default function Chart() {
  const receiptList = useSelector(state => state.receipt)

  const lastMonthAmount = getAmount(receiptList[0]).total
  const prevMonthAmount = getAmount(receiptList[1]).total

  return (
    <Block center flex={0.4} color='white' shadow>
      {
        receiptList.length > 0
          ? <Block>
            <Block flex={0.6} center bottom >
              <Block flex={false} row style={{ alignItems: 'flex-end' }} >
                <Text
                  color={theme.colors.primary}
                  h1 bold spacing={0.4}
                >
                  {(lastMonthAmount - prevMonthAmount).format()}
                </Text>
                <Text h2 gray>đ</Text>
              </Block>
              {
                receiptList[1] !== undefined
                  ? <Text h2 gray>Tháng {+(receiptList[1].date).split('/')[1]}</Text>
                  : null
              }

            </Block>

            <Block center middle style={{ width: width }}>

              <LineChart
                data={{
                  // labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                  datasets: [
                    // { data: [20, 45, 28, 80, 99, 43] },
                    { data: getRateChart(receiptList, 'total') }
                  ]
                }}
                width={width - 20}
                height={90}
                chartConfig={{
                  backgroundColor: '#000',
                  backgroundGradientFrom: 'white', // #1E2923
                  backgroundGradientTo: '#fff', // #08130D
                  color: (opacity) => hexToRgba('#f00', opacity + 0.2), // #1AFF92 , 26, 255, 146

                }}
                style={{
                  flex: 1,
                  paddingLeft: 8,
                  paddingTop: 15,
                  borderRadius: 16,
                }}
              />
            </Block>
          </Block>
          : <Block middle>
            <Text h1 gray>Chưa có dữ liệu</Text>
          </Block>
      }
    </Block>
  );
}

const styles = StyleSheet.create({

});
