/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types'
import { Image, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux'

import { TabView, SceneMap, TabBar, TouchableItem } from 'react-native-tab-view';

import { Block, Text } from '../../components'
import * as theme from '../../constants/theme'

import TabWater from './TabWater'
import TabElectric from './TabElectric'
import TabGarbage from './TabGarbage'
import TabCableTV from './TabCableTV'
import TabRoom from './TabRoom'

const consoleLog = n => console.log('****** UnitPrice.js -- line: ' + n + ' ******');
const { width } = Dimensions.get('window')

export default function UnitPrice(props) {

  const { fromDetail } = props

  const [index, setIndex] = React.useState(0);

  const state = useSelector(state => state.unitPrice) // ok object

  const [routes] = React.useState([
    { key: 'tabElectric', title: 'Điện', icon: require('../../assets/images/electric.png') },
    { key: 'tabWater', title: 'Nước', icon: require('../../assets/images/water.png') },
    { key: 'tabGarbage', title: 'Rác', icon: require('../../assets/images/trash.png') },
    { key: 'tabCableTV', title: 'Cáp TV', icon: require('../../assets/images/cableTV.png') },
    { key: 'tabRoom', title: 'Phòng', icon: require('../../assets/images/home.png') },
  ]);

  const renderScene = SceneMap({
    tabElectric: TabElectric,
    tabWater: TabWater,
    tabGarbage: TabGarbage,
    tabCableTV: TabCableTV,
    tabRoom: TabRoom,
  })

  return (
    <Block>
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
  );
}

const styles = StyleSheet.create({

});
