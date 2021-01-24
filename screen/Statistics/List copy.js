/* eslint-disable no-unused-vars */
import React from 'react';
import { FlatList, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux'

import { format } from '../../Features/standardize'

import { Button, Block, Text } from '../../components'
import * as theme from '../../constants/theme'
import { getAmount } from '../../Features/myGetter'

const consoleLog = n => console.log('=== List.js - line: ' + n + ' ================================')

export default function List(props) {
  const { navigation } = props
  const data = useSelector(state => state.receipt)
  const unitPrice = useSelector(state => state.unitPrice)

  return (
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
            <TouchableOpacity
              key={`id-${item.id}`}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Detail', { item, idx: index })}
              // onPress={() => console.log('onPress')}
              onLongPress={() => console.log('onLongPress')}
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
            </TouchableOpacity>
          )
        }}

      />
    </Block>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
