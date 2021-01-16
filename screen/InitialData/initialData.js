/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { Image, Input, ScrollView, StyleSheet, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import AsyncStorage from '@react-native-async-storage/async-storage'

import { Block, Text, Button } from '../../components'
import * as theme from '../../constants/theme'
import { icons } from '../../constants/icons'

const consoleLog = n => console.log('****** InitialData.js -- line: ' + n + ' ******');

InitialData.propTypes = {
  fromInitialData: PropTypes.func, // from parent: App.js
}

export default function InitialData(props) {
  const { fromInitialData } = props

  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [electric, setElectric] = useState('')
  const [electricIndex, setElectricIndex] = useState('')
  const [water, setWater] = useState('')
  const [waterIndex, setWaterIndex] = useState('')
  const [garbage, setGarbage] = useState('')
  const [cableTV, setCableTV] = useState('')
  const [room, setRoom] = useState('')


  function _myHandle() {

    if (month === '') { alert('Chưa nhập Tháng'); return }
    if (+month > 12 || +month < 1) { alert('Nhập sai Tháng'); return }
    if (year === '') { alert('Chưa nhập Năm'); return }
    if (+year > (new Date()).getFullYear() || +year < 2000) { alert('Nhập sai Năm'); return }
    if (electricIndex === '') { alert('Chưa nhập Số Điện'); return }
    if (+electric === '') { alert('Chưa nhập Đơn giá Điện'); return }
    if (+electric < 1000) { alert('Nhập sai Đơn giá Điện'); return }
    if (waterIndex === '') { alert('Chưa nhập Số Nước'); return }
    if (+water === '') { alert('Chưa nhập Đơn giá Nước'); return }
    if (+water < 1000) { alert('Nhập sai Đơn giá Nước'); return }
    if (garbage === '') { alert('Chưa nhập Đơn giá Rác'); return }
    if (+garbage < 1000) { alert('Nhập sai Đơn giá Rác'); return }
    if (cableTV === '') { alert('Chưa nhập Đơn giá Cáp TV'); return }
    if (+cableTV < 1000) { alert('Nhập sai Đơn giá Cáp TV'); return }
    if (room === '') { alert('Chưa nhập Đơn giá Phòng'); return }
    if (+room < 1000) { alert('Nhập sai Đơn giá Phòng'); return }

    const fullMonth = `0${month}`.slice(-2)
    const index = { electricIndex, waterIndex }
    const unitPrice = {
      electric: [{ id: `up-${year}${fullMonth}`, date: `${year}-${fullMonth}`, price: +electric }],
      water: [{ id: `up-${year}${fullMonth}`, date: `${year}-${fullMonth}`, price: +water }],
      garbage: [{ id: `up-${year}${fullMonth}`, date: `${year}-${fullMonth}`, price: +garbage }],
      cableTV: [{ id: `up-${year}${fullMonth}`, date: `${year}-${fullMonth}`, price: +cableTV }],
      room: [{ id: `up-${year}${fullMonth}`, date: `${year}-${fullMonth}`, price: +room }],
    }
    fromInitialData(index, unitPrice)
  }

  return (
    <Block>
      <LinearGradient
        colors={[theme.colors.secondary, theme.colors.tertiary]}
        start={[0, 0]}
        end={[1, 0]}
        style={{
          height: 90,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Block flex={false} row padding={[0, 0, 10, 0]}>

          <Block flex={2.5} middle padding={[0, 0, 0, 10]}>
            <Text white h2 bold>KHỞI TẠO ĐẦU VÀO</Text>
          </Block>

          <Block center style={{ alignItems: 'flex-end', paddingRight: 20 }}>
            <Button
              color={false}
              style={{
                height: 'auto', // override
                margin: 0, // override
              }}
              onPress={_myHandle}>
              <Text white size={18}>OK</Text>
            </Button>
          </Block>

        </Block>
      </LinearGradient>

      <Block padding={10}>
        {/* MONTH / YEAR ================== */}
        <Block flex={false} center row margin={[5, 0, 20, 0]}>
          <Text h2>Thời gian:</Text>
          <Block row right center padding={[0, 10]}>
            <TextInput
              keyboardType="numeric"
              placeholder="mm"
              onChangeText={text => setMonth(text)}
              style={styles.inputDateTime}
            />
            <Text> / </Text>
            <TextInput
              keyboardType="numeric"
              placeholder="yyyy"
              onChangeText={text => setYear(text)}
              style={styles.inputDateTime}
            />
          </Block>
        </Block>
        <ScrollView
          scrollEnable
          style={{
            paddingBottom: 40
          }}
        >
          {/* Line Electric ================= */}
          <Block flex={false} row margin={[5, 0]}>

            <Block flex={false} center middle style={styles.avatar} border={[1, theme.colors.gray, 8]}>
              <Image resizeMode="contain" source={icons.electric} style={styles.image} />
            </Block>

            <Block padding={[2, 5, 2, 10]}>
              <Block row space="between" center>
                <Text h2>Số Điện</Text>
                <Block flex={false} row right padding={[2]} border={[1, theme.colors.gray, 8]} style={{ width: 150 }}>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="1234"
                    style={{}}
                    onChangeText={text => setElectricIndex(text)}
                    style={[styles.inputContent, { width: 150 }]}
                  />
                </Block>
              </Block>
              <Block row space="between" center>
                <Text h2>Đơn Giá</Text>
                <Block flex={false} row right padding={[2]} border={[1, theme.colors.gray, 8]} style={{ width: 150 }}>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="0"
                    onChangeText={text => setElectric(text)}
                    style={styles.inputContent}
                  />
                  <Text h2 gray> đ/kW</Text>
                </Block>
              </Block>
            </Block>

          </Block>
          {/* Line Water ================= */}
          <Block flex={false} row margin={[5, 0]}>

            <Block flex={false} center middle style={styles.avatar} border={[1, theme.colors.gray, 8]}>
              <Image resizeMode="contain" source={icons.water} style={styles.image} />
            </Block>

            <Block padding={[2, 5, 2, 10]}>
              <Block row space="between" center>
                <Text h2>Số Nước</Text>
                <Block flex={false} row right padding={2} border={[1, theme.colors.gray, 8]} style={{ width: 150 }}>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="1234"
                    onChangeText={text => setWaterIndex(text)}
                    style={[styles.inputContent, { width: 150 }]}
                  />
                </Block>
              </Block>
              <Block row space="between" center>
                <Text h2>Đơn Giá</Text>
                <Block flex={false} row right padding={2} border={[1, theme.colors.gray, 8]} style={{ width: 150 }}>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="0"
                    onChangeText={text => setWater(text)}
                    style={styles.inputContent}
                  />
                  <Text h2 gray> đ/m3</Text>
                </Block>
              </Block>
            </Block>

          </Block>
          {/* Line Garbage ================= */}
          <Block flex={false} row margin={[5, 0]}>

            <Block flex={false} center middle style={styles.avatar} border={[1, theme.colors.gray, 8]}>
              <Image resizeMode="contain" source={icons.garbage} style={styles.image} />
            </Block>

            <Block padding={[2, 5, 2, 10]}>
              <Block flex={0.5} row space="between" center>
                <Text h2>Đơn Giá</Text>
                <Block flex={false} row right padding={2} border={[1, theme.colors.gray, 8]} style={{ width: 150 }}>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="0"
                    onChangeText={text => setGarbage(text)}
                    style={styles.inputContent}
                  />
                  <Text h2 gray> đ/Th</Text>
                </Block>
              </Block>
            </Block>

          </Block>
          {/* Line CableTV ================= */}
          <Block flex={false} row margin={[5, 0]}>

            <Block flex={false} center middle style={styles.avatar} border={[1, theme.colors.gray, 8]}>
              <Image resizeMode="contain" source={icons.cableTV} style={styles.image} />
            </Block>

            <Block padding={[2, 5, 2, 10]}>
              <Block flex={0.5} row space="between" center>
                <Text h2>Đơn Giá</Text>
                <Block flex={false} row right padding={2} border={[1, theme.colors.gray, 8]} style={{ width: 150 }}>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="0"
                    onChangeText={text => setCableTV(text)}
                    style={styles.inputContent}
                  />
                  <Text h2 gray> đ/Th</Text>
                </Block>
              </Block>
            </Block>

          </Block>
          {/* Line Room ================= */}
          <Block flex={false} row margin={[5, 0]}>

            <Block flex={false} center middle style={styles.avatar} border={[1, theme.colors.gray, 8]}>
              <Image resizeMode="contain" source={icons.room} style={styles.image} />
            </Block>

            <Block padding={[2, 5, 2, 10]}>
              <Block flex={0.5} row space="between" center>
                <Text h2>Đơn Giá</Text>
                <Block flex={false} row right padding={2} border={[1, theme.colors.gray, 8]} style={{ minWidth: 150 }}>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="0"
                    style={{}}
                    onChangeText={text => setRoom(text)}
                    style={styles.inputContent}
                  />
                  <Text h2 gray> đ/Th</Text>
                </Block>
              </Block>
            </Block>

          </Block>
        </ScrollView>
      </Block>

    </Block>
  );
}

const styles = StyleSheet.create({
  inputDateTime: {
    textAlign: 'right',

    paddingHorizontal: 5,
    fontSize: theme.sizes.h2,
    borderWidth: 1,
    borderColor: theme.colors.gray,
    borderRadius: 3,
    minWidth: 70,
    height: 40
  },
  inputContent: {
    fontSize: theme.sizes.h2,
    minWidth: 100,
    textAlign: 'right',
  },
  avatar: {
    width: 86, height: 86
  },
  image: {
    width: 72, height: 72
  }
});
