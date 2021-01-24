import React from 'react'
import { Button, View, Text, StyleSheet } from 'react-native'

import {useToast} from 'react-native-styled-toast'

export default function Toast() {
  const {toast} = useToast()
  return (

        <View style={styles.container}>
          <Text>Toast Component</Text>
          <Button title='Toast' onPress={() => toast({
            // config Toast
            color: 'blue',
            message: 'thong20',
            accentColor: 'error'
          })} />

          <Button title='Toast' onPress={() => toast({ message: 'Check me out!' })} />
          
        </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
