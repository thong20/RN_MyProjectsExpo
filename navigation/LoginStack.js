import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import Login from '../screen/Login/Login'
import ResetScreen from '../screen/Login/Reset'

const Stack = createStackNavigator()
export default function LoginStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name='Login' component={Login}/>
      <Stack.Screen name='ResetScreen' component={ResetScreen}/>
    </Stack.Navigator>
  )
}
