/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types'
import {
  StyleSheet, Modal, Platform, Dimensions,
  ScrollView, TextInput, TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { updateReceipt } from '../../redux/reducer/sliceReceipt'

// Toast
import {useToast} from 'react-native-styled-toast'

import { Block, Text, Button, Divider } from '../../components';
import * as theme from '../../constants/theme'
import uuid from '../../Features/uuid'

import StepIndicator from './StepIndicator'
import SlideForm from "./SlideForm";
import DatePicker from './DatePicker'
import BtnForIOS from './btnForIOS';
import BtnForAndroid from './btnForAndroid';
import EditElectric from './EditElectric';
import EditWater from './EditWater';
import EditRoom from './EditRoom'

const consoleLog = n => console.log('****** Edit.js -- line: ' + n + ' ******');
const { width } = Dimensions.get('window')

Edit.propTypes = {
  navigation: PropTypes.object, // from Parent: /navigation/HomeDrawer.js
  item: PropTypes.object, // from Statictis.js => HomeDrawer.js via navigation
  index: PropTypes.number, // from Statictis.js => HomeDrawer.js via navigation
}

export default function Edit(props) {
  const { navigation, route } = props;
  const {item: receipt, idx} = route.params

  // hooks
  const state = useSelector(state => state)
  const {toast} = useToast()
  const dispatch = useDispatch()
  
  const [newReceipt, setNewReceipt] = useState(receipt)

  const [xPos, setXPos] = useState(0);
  const refStep = useRef(0)
  const refScrollView = useRef(null)

  const [showDatePicker, setShowDatePicker] = useState(false)

  const [dateSelected, setDateSelected] = useState(new Date()) // dataDate
  const date = `0${dateSelected.getDate()}`.slice(-2)
  const month = `0${dateSelected.getMonth() + 1}`.slice(-2)
  const year = dateSelected.getFullYear()


  const _combineDataFromChild = (obj) => {

    if (obj instanceof Date) {
      const date = `0${obj.getDate()}`.slice(-2)
      const month = `0${obj.getMonth() + 1}`.slice(-2)
      const year = obj.getFullYear()

      setNewReceipt({ ...newReceipt, date: `${year}/${month}/${date}` })
    } else {
      setNewReceipt({ ...newReceipt, ...obj })
    }
  }


  const _handleBtnSave = () => {
    
    dispatch(updateReceipt(newReceipt))

    // update AsyncStorage
    let tmp = JSON.parse(JSON.stringify(state.receipt)) // deep copy array Objecj
    tmp.splice(idx, 1, newReceipt)
    updateAsyncStore(tmp)
    
    toast({message: 'Đã thay đổi thành công'})
    navigation.goBack()
  }

  const updateAsyncStore = async (arrReceipts) => {
    try {
      await AsyncStorage.setItem('receipt', JSON.stringify(arrReceipts))
    } catch (e) {
      console.log(e)
      consoleLog(100)
    }
  }

  const _handleBtnNext = () => {
    refScrollView.current.scrollTo({ x: xPos + width, y: 0, animated: true })
  }
  const _handleBtnPrev = () => {
    refScrollView.current.scrollTo({ x: xPos - width, y: 0, animated: true })
  }



  const _handleOnScroll = (e) => {
    const { x } = e.nativeEvent.contentOffset
    setXPos(x)
    if (x < width / 2) { refStep.current = 0; return }
    if (x < width / 2 + width) { refStep.current = 1; return }
    if (x < width / 2 + width * 2) { refStep.current = 2; return }
    if (x < width / 2 + width * 3) { refStep.current = 3; return }

  }

  // START -- datePicker for IOS & Android ================================
  const _handleOnChange = (selectedDate) => {
    if (!selectedDate) return

    // console.log(selectedDate)
    // consoleLog(124)

    setShowDatePicker(false)
    _combineDataFromChild(selectedDate)
    setDateSelected(selectedDate)
  }

  const datePickerForIOS = () => {
    return (
      <DatePicker propsOnChange={_handleOnChange} date={receipt.date} />
    )
  }

  const datePickerForAndroid = () => {
    return (
      <Block flex={1} center style={{ width: width }}>

        <Block center middle>
          <Block flex={false} center middle margin={[0, 0, 10, 0]} border={[1, theme.colors.gray2, 6]} style={{ minWidth: 150, height: 50 }}>
            <Text h2>{date} / {month} / {year}</Text>
          </Block>

          <Button gradient opacity={0.7} onPress={() => setShowDatePicker(true)}
            style={{ paddingHorizontal: 10 }}
          >
            <Text white>Chọn ngày</Text>
          </Button>
        </Block>

        { showDatePicker && <DatePicker propsOnChange={_handleOnChange} date={receipt.date} />}
      </Block>
    )
  }
  // END -- datePicker for IOS & Android ================================

  return (
    <Block>
      <Block flex={false} color='white' shadow>
        <StepIndicator stepPosition={refStep.current} />
      </Block>

      <Block color={Platform.OS === 'ios' ? false : 'white'}>
        <ScrollView
          ref={ref => refScrollView.current = ref}
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToAlignment="center"
          onMomentumScrollEnd={e => _handleOnScroll(e)}
        >
          {
            Platform.OS === 'ios'
              ? datePickerForIOS()
              : datePickerForAndroid()
          }

          <EditElectric dataFromElectric={_combineDataFromChild} receipt={receipt}/>
          <EditWater dataFromWater={_combineDataFromChild} receipt={receipt}/>
          <EditRoom dataFromRoom={_combineDataFromChild} receipt={receipt}/>
        </ScrollView>
      </Block>

      {/* Button BACK - NEXT =================================== */}
      {
        Platform.OS === 'ios'
          ? <BtnForIOS stepPosition={refStep.current} clickNext={_handleBtnNext} clickPrev={_handleBtnPrev} clickSave={_handleBtnSave} />
          : Platform.OS === 'android' && refStep.current === 3
            ? <BtnForAndroid clickSave={_handleBtnSave} />
            : null
      }

    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },

});
