/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import {
  Dimensions,
  Alert,
  ScrollView,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'

import { Block, Text, Button, Divider } from '../../components'
import SelectBox from '../../components/SelectBox'
import * as theme from '../../constants/theme'

const consoleLog = n => console.log('****** AddRoom.js -- line: ' + n + ' ******');
const { width } = Dimensions.get('window')
// khai báo props
AddRoom.propTypes = {
  dataFromRoom: PropTypes.func // from parent: AddNew.js
  //   onTodoClick: PropTypes.function;
};

// Khởi tạo giá trị default cho props khi không nhận được
// từ parent
AddRoom.defaultProps = {
  //   todos: [];
  //   onTodoClick: null;
};

// [x] {cableTV: xxx}   => cableTV
// [x] {garbage: xxx}   => garbage
// [x] {room: xxx}      => room

export default function AddRoom(props) {
  const { dataFromRoom } = props

  const DATA = useSelector(state => state.unitPrice)

  const [cableTV, setCableTV] = useState({ cableTV: 0 })
  const [garbage, setGarbage] = useState({ garbage: 0 })
  const [room, setRoom] = useState({ room: 0 })

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Block flex={1} padding={20} style={{ width: width }}>

        <Block flex={false} row space='between' margin={[10, 0]} >
          <Block flex={false} row center>
            <Text h2>Cáp TV</Text>
            <Text color={theme.colors.primary} > (*)</Text>
          </Block>

          <SelectBox
            DATA={DATA.cableTV}
            padding={5}
            border={[1, theme.colors.gray2, 5]}
            minWidth={150}
            fontSize={theme.sizes.h2}

            onSelect={(value) => {
              dataFromRoom({ cableTV: value })
              setCableTV({ cableTV: value })

            }}
          />
        </Block>

        <Block flex={false} row space='between' margin={[10, 0]} >
          <Block flex={false} row center>
            <Text h2>Rác</Text>
            <Text color={theme.colors.primary} > (*)</Text>
          </Block>

          <SelectBox
            DATA={DATA.garbage}
            padding={5}
            border={[1, theme.colors.gray2, 5]}
            minWidth={150}

            fontSize={theme.sizes.h2}
            onSelect={(value) => {
              dataFromRoom({ garbage: value })
              setGarbage({ garbage: value })
            }
            }
          />
        </Block>
        <Block flex={false} row space='between' margin={[10, 0]} >
          <Block flex={false} row center>
            <Text h2>Phòng</Text>
            <Text color={theme.colors.primary} > (*)</Text>
          </Block>

          <SelectBox
            DATA={DATA.room}
            padding={5}
            border={[1, theme.colors.gray2, 5]}
            minWidth={150}

            fontSize={theme.sizes.h2}
            onSelect={value => {
              dataFromRoom({ room: value })
              setRoom({ room: value })
            }}
          />
        </Block>

        <Divider />

        <Block>
          <Block flex={false} row space='between' center>
            <Text h2 >THÀNH TIỀN</Text>
            <Block flex={false} row center>
              <Text h1 bold>{(cableTV.cableTV + garbage.garbage + room.room).format()}</Text>
              <Text h2 gray> đ</Text>
            </Block>
          </Block>
        </Block>

      </Block>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {

    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 5,
  },
});
