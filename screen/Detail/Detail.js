/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Image, Dimensions, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar, TouchableItem } from 'react-native-tab-view';

import { Block, Text } from '../../components'
import * as theme from '../../constants/theme'
import { getAmount, getIndexOldValueOf, getRateChart } from '../../Features/myGetter'
import format from '../../Features/standardize'

import TabElectric from './TabElectric'
import TabWater from './TabWater'
import TabLitter from './TabLitter'
import TabRoom from './TabRoom'

import { LinearGradient } from 'expo-linear-gradient'
import { LineChart } from 'expo-chart-kit';
import hexToRgba from 'hex-to-rgba';

const consoleLog = n => console.log('****** Detail.js -- line: ' + n + ' ******');
const { width } = Dimensions.get('window')


// Khai báo thuộc tính cho Component
Detail.propTypes = {
  item: PropTypes.object, // passed from List.js via navigation.navigate()
  idx: PropTypes.number, // passed from List.js via navigation.navigate()
};

// Gán giá trị mặc định cho props, khi
// props không có giá trị
Detail.defaultProps = {
  // todos: [],
  // onTodoClick: null,
};


export default function Detail(props) {
  const { route } = props
  const { item, idx } = route.params

  const receiptList = useSelector(state => state.receipt)
  const chartData = useSelector(state => state.chart)
  const [stepPosition, setStepPosition] = useState(0)

  const fullDate = item.date.split('/')
  const year = +fullDate[0]
  const month = +fullDate[1]

  const prevMonthAmount = getAmount(receiptList[idx + 1])
  const selectedMonthAmount = getAmount(receiptList[idx])


  function _showMonthlyAmount(step) {
    switch (step) {
      case 0: // electric
        return (selectedMonthAmount.electric - prevMonthAmount.electric).format();
      case 1: // water
        return (selectedMonthAmount.water - prevMonthAmount.water).format()
      case 2: // garbage & cableTV
        const garbageAmount = selectedMonthAmount.garbage - prevMonthAmount.garbage
        const cableTVAmount = selectedMonthAmount.cableTV - prevMonthAmount.cableTV
        return (garbageAmount + cableTVAmount).format()
      case 3: // room
        return (selectedMonthAmount.room - prevMonthAmount.room).format()
    }
  }

  function _showMonthlyChart(step) {
    switch (step) {
      case 0: // electric
        return getRateChart(receiptList, 'electric')
      case 1: // water
        return getRateChart(receiptList, 'water')
      case 2: // water
        return getRateChart(receiptList, 'garbage_cableTV')
      case 3: // room
        return getRateChart(receiptList, 'room')
    }
  }


  const [index, setIndex] = useState(0)
  const [routes] = React.useState([
    { key: 'tabElectric', title: 'Điện', icon: require('../../assets/images/electric.png') },
    { key: 'tabWater', title: 'Nước', icon: require('../../assets/images/water.png') },
    { key: 'tabLitter', title: 'Rác & Cáp', icon: require('../../assets/images/trash.png') },
    { key: 'tabRoom', title: 'Phòng', icon: require('../../assets/images/home.png') },
  ]);

  const renderScene = SceneMap({
    tabElectric: () => <TabElectric fromDetail={item} />,
    tabWater: () => <TabWater fromDetail={item} />,
    tabLitter: () => <TabLitter fromDetail={item} />,
    tabRoom: () => <TabRoom fromDetail={item} />,
  })

  return (
    <Block color='white'>
      <Block flex={0.7} center >
        <Block flex={false} padding={[5, 0, 0, 0]} >
          <LinearGradient
            colors={[theme.colors.secondary, theme.colors.tertiary]}
            start={[0, 0]}
            end={[1, 0]}
            style={{
              width: 80,
              height: 80,
              borderRadius: 80 / 2,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text h2 white bold>{year}</Text>
            <Text h1 white bold>{month}</Text>
          </LinearGradient>
        </Block>

        {
          getIndexOldValueOf(receiptList, idx, 'date')
            ? <Block flex={false} center >
              <Block flex={false} row style={{ alignItems: 'flex-end' }}>
                <Text h1 bold color={theme.colors.primary}>{_showMonthlyAmount(index)}</Text>
                <Text h2 gray style={{ paddingBottom: 5 }}> đ</Text>
              </Block>

              <Block flex={false}>
                <Text h3 gray>Tháng {
                  +(getIndexOldValueOf(receiptList, idx, 'date'))
                    .split('/')[1]
                }</Text>

              </Block>
            </Block>
            : null
        }
        <Block center middle padding={[0, 10]} style={{ width: width }}>
          <LineChart
            data={{
              // labels: ['January', 'February', 'March', 'April', 'May', 'June'],
              datasets: [
                // { data: [20, 45, 28, 80, 99, 43] },
                { data: _showMonthlyChart(index) }

              ]
            }}
            width={width - 20}
            height={70}
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

      {/* === TabView ==================================================== */}
      <Block padding={[0, 20]}>
        {/* <TabRoot
          [x] renderScene={rootTab}
          [x] indexFromTabRoot={_handleChangeTab}

          [x] fromDetail={item}
        /> */}

        <TabView
          renderScene={renderScene}
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          initialLayout={width}
          sceneContainerStyle={{
            backgroundColor: 'white'
          }}

          renderTabBar={(props) => (
            <TabBar
              {...props}
              activeColor={theme.colors.primary}
              inactiveColor={theme.colors.gray}
              renderLabel={({ route, focused, color }) => {
                return (
                  <Text bold body color={color} style={{ textAlign: 'center' }}>
                    {route.title}
                  </Text>
                )
              }}

              indicatorStyle={{ borderBottomWidth: 3, borderBottomColor: theme.colors.primary }}
              renderIcon={({ route }) => <Image source={route.icon} style={{ width: 40, height: 40 }} />}
              style={{
                backgroundColor: 'white'
              }}
            />
          )}
        />
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({

});
