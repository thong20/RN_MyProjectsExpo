import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import {Block, Text, Button} from '../components/index'

import AsyncStorage from '@react-native-async-storage/async-storage'

export default function DemoAsyncStorage() {

  async function checkUidExist () {
    const keys = await AsyncStorage.getItem('id')
    if(!keys){ // not exist UID in AsyncStorage
      console.log('Không tồn tại UID')
    }else{
      console.log('Tồn tại UID')
    }
  }

  useEffect(() => {
    checkUidExist()
  }, [])

  return (
    <Block>
      <Text>DemoAsyncStorage Component</Text>
    </Block>
  )
}

const styles = StyleSheet.create({
  container: {
    
  }
}) 