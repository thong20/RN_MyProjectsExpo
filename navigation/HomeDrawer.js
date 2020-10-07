/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import { LinearGradient } from 'expo-linear-gradient';
import { Entypo, AntDesign } from '@expo/vector-icons';
import hexToRgba from 'hex-to-rgba'

import HomeStack from './HomeStack'
import AddNew from '../screen/AddNew/AddNew'
import UnitPrice from '../screen/UnitPrice/UnitPrice'
import * as theme from '../constants/theme'
import { Block, Text } from '../components';

const consoleLog = n => console.log('****** HomeDrawer.js -- line: ' + n + ' ******');

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { navigation } = props
  return (
    <LinearGradient
      colors={[theme.colors.secondary, theme.colors.tertiary]}
      start={[0, 0]}
      end={[1, 0]}
      style={{ flex: 1 }}
    >
      <DrawerContentScrollView {...props} style={{ borderRightWidth: 1, borderColor: 'white' }}>
        <Block flex={false} center middle margin={[10, 0]}>
          <Block
            center middle
            width={100} height={100}
            radius={100 / 2}
            color='white'
            margin={[10, 0]}
          >
            <Entypo name="user" size={60} color={theme.colors.primary} />
          </Block>
          <Text h3 white>email@email.com</Text>
        </Block>

        {/* <DrawerItemList {...props} /> */}

        <DrawerItem
          label="Tổng quan"
          labelStyle={{ color: 'white', fontSize: 18, marginLeft: -18 }}
          icon={() => <AntDesign name='dashboard' color='white' size={24} />}
          onPress={() => navigation.navigate('Statistics')}
        />
        <DrawerItem
          label="Thêm mới"
          labelStyle={{ color: 'white', fontSize: 18, marginLeft: -18 }}
          icon={() => <AntDesign name='pluscircleo' color='white' size={24} />}
          onPress={() => navigation.navigate('AddNew')}
        />
        <DrawerItem
          label="Đơn giá"
          labelStyle={{ color: 'white', fontSize: 18, marginLeft: -18 }}
          icon={() => <Entypo name="price-ribbon" color="white" size={24} />}
          onPress={() => navigation.navigate('UnitPrice')}
        />
      </DrawerContentScrollView>
    </LinearGradient>

  );
}


export default function HomeDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName='HomeStack'
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerContentOptions={{
        activeTintColor: theme.colors.primary,
        inactiveTintColor: 'white',
        activeBackgroundColor: 'white',
      }}
    >
      <Drawer.Screen name='HomeStack' component={HomeStack}
        options={{
          title: 'Tổng quan'
        }}
      />
    </Drawer.Navigator>
  );
}


