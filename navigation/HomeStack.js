/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { TouchableOpacity, View, Text, StyleSheet, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

import Statistics from '../screen/Statistics/Statistics'
import Detail from '../screen/Detail/Detail'
import UnitPrice from '../screen/UnitPrice/UnitPrice'
import AddNew from '../screen/AddNew/AddNew'
import Edit from '../screen/Edit/Edit'


const consoleLog = n => console.log('****** HomeStack.js -- line: ' + n + ' ******');
const { width } = Dimensions.get('window')

const ButtonBack = () => (
  <MaterialIcons
    name='chevron-left'
    color='white'
    size={32}
    style={{ paddingHorizontal: 10, paddingVertical: 5 }}
  />
)

const Stack = createStackNavigator();

export default function HomeStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackground: () => (
          <LinearGradient
            colors={['#C20068', '#FF7F50']}
            start={[0, 1]}
            end={[1, 1]}
            style={{ flex: 1 }}
          />
        ),
        headerStyle: {
          height: 100,
        },
        headerTitleStyle: {
          color: 'white',
          fontSize: 26,
        },
        headerTitleAlign: 'center',
        headerBackImage: () => <ButtonBack />,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name='Statistics'
        component={Statistics}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <MaterialIcons
                name="menu"
                size={32}
                color="white"
                style={{ paddingHorizontal: 15, paddingVertical: 10 }}
              />
            </TouchableOpacity>
          ),
          headerTitle: 'Tổng quan'
        }}
      />
      <Stack.Screen
        name='Detail'
        component={Detail}
        options={{
          headerTitle: 'Chi tiết'
        }}
      />
      <Stack.Screen
        name='AddNew'
        component={AddNew}
        options={{
          headerTitle: 'Thêm mới'
        }}
      />
      <Stack.Screen
        name='UnitPrice'
        component={UnitPrice}
        options={{
          headerTitle: 'Đơn giá'
        }}
      />
      <Stack.Screen
        name='Edit'
        component={Edit}
        options={{
          headerTitle: 'Thay đổi'
        }}
      />

    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({

});
