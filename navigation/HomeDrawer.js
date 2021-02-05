/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage' 
import {useSelector} from 'react-redux'

// firebase
import {fb} from '../AppLoading'

// Toast
import {useToast} from 'react-native-styled-toast'

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
  const state = useSelector(state => state)

  // firebase
  const user = fb.auth().currentUser
  const fbFireStore = fb.firestore()

  // Toast
  // const {toast} = useToast()
  const {toast} = useToast()

  // Back up firebase
  const backup = async () => {
    
    fbFireStore
      .collection('users')
      .doc(user.uid)
      .set(state)
      .then(() => alert('Backup thành công'))
      .catch(() => alert('Backup không thành công'))
     
  }
  const getAsyncStorage = async () => {
    console.log('==== AsyncStorage =====================')
    console.log(await AsyncStorage.getAllKeys())
    consoleLog(51)
  }
  const getDetail = async (key) => {
    console.log('==== Details =====================')
    switch (key) {
      case 'indexInit': {
        console.log('indexInit:\n', await AsyncStorage.getItem('indexInit'))
        break;
      }
      case 'chart': {
        console.log('chart:\n', await AsyncStorage.getItem('chart'))
        break;
      }
      case 'unitPrice': {
        console.log('unitPrice:\n', await AsyncStorage.getItem('unitPrice'))
        break;
      }
      case 'receipt': {
        const jsonValue = await AsyncStorage.getItem('receipt')
        
         console.log(
          'receipt:\n',
          jsonValue != null ? JSON.parse(jsonValue) : null
        )
        
        break;
      }
      case 'uid': {
        console.log('uid:', await AsyncStorage.getItem('uid').then(id => {
          if(id == null) {return 'Là rỗng'}
          else if(id === 'lQvk7Pkvr2aukCO5vNzq3bUe3lu2') {return 'thong20'}
          else if(id === 'ToGhqAoNXjRP1ayzvrjHDKePI883') {return 'demo'}
        }))
        break;
      }
    }
    consoleLog(59)
  } 
  const getReduxState = async () => {
    console.log('==== state Redux =====================')
    console.log(state)
    consoleLog((64))
  }


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
          <Text h3 white>{user.email}</Text>
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
        <DrawerItem
          label="Sao lưu dữ liệu"
          labelStyle={{ color: 'white', fontSize: 18, marginLeft: -18 }}
          icon={() => <AntDesign name="sync" color="white" size={24} />}
          onPress={() => backup()}
        />
        {/* <DrawerItem
          label="Xem AsyncStorage"
          labelStyle={{ color: 'white', fontSize: 18, marginLeft: -18 }}
          icon={() => <AntDesign name="eyeo" size={24} color="white" />}
          onPress={() => getAsyncStorage()}
        /> */}
        {/* <DrawerItem
          label="Xem uid"
          labelStyle={{ color: 'white', fontSize: 18, marginLeft: -18 }}
          icon={() => <AntDesign name="eyeo" size={24} color="white" />}
          onPress={() => getDetail('uid')}
        /> */}
        {/* <DrawerItem
          label="Set uid là rỗng"
          labelStyle={{ color: 'white', fontSize: 18, marginLeft: -18 }}
          icon={() => <AntDesign name="eyeo" size={24} color="white" />}
          onPress={() => AsyncStorage.setItem('uid', JSON.stringify('thong20'))}
        /> */}
        {/* <DrawerItem
          label="Xem indexInit"
          labelStyle={{ color: 'white', fontSize: 18, marginLeft: -18 }}
          icon={() => <AntDesign name="eyeo" size={24} color="white" />}
          onPress={() => getDetail('indexInit')}
        /> */}
        {/* <DrawerItem
          label="Xem unitPrice"
          labelStyle={{ color: 'white', fontSize: 18, marginLeft: -18 }}
          icon={() => <AntDesign name="eyeo" size={24} color="white" />}
          onPress={() => getDetail('unitPrice')}
        /> */}
        {/* <DrawerItem
          label="Xem chart"
          labelStyle={{ color: 'white', fontSize: 18, marginLeft: -18 }}
          icon={() => <AntDesign name="eyeo" size={24} color="white" />}
          onPress={() => getDetail('chart')}
        /> */}
        {/* <DrawerItem
          label="Xem receipt"
          labelStyle={{ color: 'white', fontSize: 18, marginLeft: -18 }}
          icon={() => <AntDesign name="eyeo" size={24} color="white" />}
          onPress={() => getDetail('receipt')}
        /> */}
        {/* <DrawerItem
          label="Xem State Redux"
          labelStyle={{ color: 'white', fontSize: 18, marginLeft: -18 }}
          icon={() => <AntDesign name="eyeo" size={24} color="white" />}
          onPress={() => getReduxState()}
        /> */}
        <DrawerItem
          label="Đăng xuất"
          labelStyle={{ color: 'white', fontSize: 18, marginLeft: -18 }}
          icon={() => <AntDesign name="logout" color="white" size={24} />}
          onPress={() => {
            fb.auth().signOut()
            toast({ message: 'Đăng xuất thành công' })
          }}
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


