/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';

import format from '../../Features/standardize'
import { Block, Text, Button } from '../../components'
import * as theme from '../../constants/theme'
import ModalForm from './ModalForm'
import ListShare from './ListShare'

export default function TabElectric(props) {
  const { electric } = useSelector(state => state.unitPrice)

  const state = useSelector(state => state)
  // console.log(state, 'line: 14 =================')

  const [modalVisible, setModalVisible] = useState(false)

  const _fnHideModal = () => {
    setModalVisible(false)
  }

  const _fnHandleDataForm = (text) => {
    console.log('Text:', text)
    consoleLog(23)
  }


  // ============================================
  const addStore = async () => {
    console.log(state)
    consoleLog(26)
    try {
      await AsyncStorage.setItem('state', JSON.stringify(state))
    } catch (e) {
      // console.log(e)
    }
    alert('Add Successful')
  }

  const mergeStore = async () => {

    try {
      await AsyncStorage.mergeItem('state', JSON.stringify(state))
    } catch (e) {

    }
    alert('Merge Successful')
  }

  const getAllKeysStore = async () => {
    let allKeys = []
    try {
      allKeys = await AsyncStorage.getAllKeys()
      console.log(allKeys, 'line: 45 ------------------')
    } catch (e) {

    }
    alert('Got Successful')
  }

  const getStore = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('receipt')
      console.log(JSON.parse(jsonValue), 'line: 68 =====================')
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {

    }
    alert('Got Successful')
  }
  const removeItemStore = () => {

  }
  const clearStore = async () => {
    try {
      await AsyncStorage.clear()
    } catch (e) {
      console.log(e)
    }
    alert('Clear Successful')
  }

  return (
    <Block padding={[10, 20]}>
      {
        (modalVisible)
          ? <ModalForm
            showModal={modalVisible}
            hideModal={_fnHideModal}

            name="electric"
          />
          : null
      }

      <Block flex={false} center middle padding={10}>
        <Button gradient style={{ width: 50, height: 50, borderRadius: 50 / 2, }}
          onPress={() => setModalVisible(true)}
        >
          <Text white h1>+</Text>
        </Button>
      </Block>

      <Block>
        {
          electric.map((item, index) => <ListShare key={index} item={{...item, unit: 'Kw'}} />)
        }
      </Block>

    </Block>
  );
}

const styles = StyleSheet.create({
  gBtn: {
    flexDirection: 'row',
    width: 300,
    borderWidth: 1,
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  }
})