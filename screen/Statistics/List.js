/* eslint-disable no-unused-vars */
import React, {useRef} from 'react';
import { FlatList, StyleSheet, Platform, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { removeReceipt } from '../../redux/reducer/sliceReceipt'

// Toast
import {useToast} from 'react-native-styled-toast'

// react-native-popup-menu
import {
  MenuProvider,
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
  renderers
} from 'react-native-popup-menu'

import { format } from '../../Features/standardize'

import { Button, Block, Text } from '../../components'
import * as theme from '../../constants/theme'
import { getAmount } from '../../Features/myGetter'

const consoleLog = n => console.log('=== List.js - line: ' + n + ' ================================')
const {Popover, SlideInMenu} = renderers


const Item = (props) => {
  const {navigation, item, index, year, month, amount} = props
  
  const dispatch = useDispatch()
  const {toast} = useToast()

  const ref = useRef()
  


  const _handleDeleteItem = (item, index) => {

    Alert.alert(
      'Xác nhận',
      'Bạn có muốn Xóa mục tháng 4',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => {
          dispatch(removeReceipt(index))
          toast({message: 'Đã xóa thành công'})
        }}
      ],
      { cancelable: false } // Android only khi tap bên ngoài alert
    )

    
    
  }

  return (
    <Menu
      ref={r => ref.current = r}

      renderer={Popover}
      rendererProps={{placement: 'top'}}
    >
      <MenuTrigger
        customStyles={{
          TriggerTouchableComponent: TouchableOpacity,
          triggerTouchable: {
            key: `id-${item.id}`,
            activeOpacity: 0.8,
            onPress: () => navigation.navigate('Detail', { item, idx: index }),
            // onPress: {() => console.log('onPress')},
            onLongPress: () => ref.current.open(),
          }
        }}
      >
        <Block flex={false} row center padding={10} margin={[5, 0]} color={Platform.OS === 'ios' ? null : 'white'} >
          <LinearGradient
            colors={[theme.colors.secondary, theme.colors.tertiary]}
            start={[0, 0]}
            end={[1, 0]}
            style={styles.avatar}
          >
            <Text h2 bold white>{year}</Text>
            <Text h1 bold white>{month}</Text>
          </LinearGradient>

          <Block padding={[0, 0, 0, 15]}>

            <Block row space='between'>
              <Text h3>Tổng cộng:</Text>
              <Block flex={false} row>
                <Text h3 >{amount.total.format()}</Text>
                <Text gray> đ</Text>
              </Block>
            </Block>

            <Block row space='between'>
              <Text h3>Phòng:</Text>
              <Block flex={false} row>
                <Text h3>{amount.room.format()}</Text>
                <Text gray> đ</Text>
              </Block>
            </Block>

            <Block row space='between'>
              <Text h3>Điện:</Text>
              <Block flex={false} row>
                <Text h3>{amount.electric.format()}</Text>
                <Text gray> đ</Text>
              </Block>
            </Block>

            <Block row space='between'>
              <Text h3>Nước:</Text>
              <Block flex={false} row>
                <Text h3>{amount.water.format()}</Text>
                <Text gray> đ</Text>
              </Block>
            </Block>

            <Block row space='between'>
              <Text h3>Rác & Cáp TV:</Text>
              <Block flex={false} row>
                <Text h3>{(amount.garbage + amount.cableTV).format()}</Text>
                <Text gray> đ</Text>
              </Block>
            </Block>

          </Block>
        </Block>
      
      </MenuTrigger>
      <MenuOptions
        customStyles={optionsStyles}
      >
        <MenuOption text='Edit' onSelect={() => navigation.navigate('Edit', {item, idx: index})}/>
        <MenuOption text='Delete' onSelect={() => _handleDeleteItem(item, index)}/>
      </MenuOptions>
    </Menu>
  )
}
export default function List(props) {
  const { navigation } = props
  const data = useSelector(state => state.receipt)
  const unitPrice = useSelector(state => state.unitPrice)

  return (
    <MenuProvider>
      <Block padding={[0, 10, 10, 10]}>
        <FlatList
          scrollEnabled
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToAlignment='center'
          extraData={data} // bind state
          data={data}
          keyExtractor={(item, index) => `${item.id}`}
          contentContainerStyle={{
            paddingBottom: 100
          }}
          renderItem={({ item, index }) => {

            const fullDate = item.date.split('/')
            const year = +fullDate[0]
            const month = +fullDate[1]

            const amount = getAmount(item)

            return (
              <Item navigation={navigation} item={item} index={index} year={year} month={month} amount={amount}/>
            )
          }}

        />
      </Block>
    </MenuProvider>
  );
}


// Style ============================================================
const optionsStyles = {
  optionsContainer: {
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.gray2
  },
  optionsWrapper: {
    // backgroundColor: 'purple',
    // borderWidth: 5,
    width: 200,
    justifyContent: 'center',
    // borderRadius: 16
    // alignItems: 'center'
  },
  optionWrapper: {
    // backgroundColor: 'yellow',
    // borderWidth: 3,
    borderColor: 'red',
  },
  optionTouchable: {
    underlayColor: theme.colors.accent,
  },
  optionText: {
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 5
  },
};

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
});





