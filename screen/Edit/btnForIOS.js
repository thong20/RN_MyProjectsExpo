/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { Block, Button, Text } from '../../components';
import * as theme from '../../constants/theme'
import { uuid } from '../../Features/uuid'

const consoleLog = n => console.log('****** BtnForIOS.js -- line: ' + n + ' ******');

// khai báo props
BtnForIOS.propTypes = {
  stepPosition: PropTypes.number, // from Parent: AddNew.js
  clickNext: PropTypes.func, // from Parent: AddNew.js
  clickPrev: PropTypes.func, // from Parent: AddNew.js
  clickSave: PropTypes.func, // from Parent: AddNew.js

};

// Khởi tạo giá trị default cho props khi không nhận được
// từ parent
BtnForIOS.defaultProps = {

};

export default function BtnForIOS(props) {

  const {
    stepPosition, clickNext, clickPrev, clickSave,
    dataDate, dataElectric, dataWater, dataRoom
  } = props




  return (
    <Block flex={0.7} color='white'>
      <Block flex={0.6} />
      <Block flex={false} row space='between' padding={[0, 50]}>

        {
          stepPosition === 0
            ? <Button disable color={theme.colors.gray} style={styles.btn} onPress={() => console.log('Prev')}>
              <MaterialIcons name="keyboard-arrow-left" size={32} color="white" />
            </Button>
            : <Button gradient style={styles.btn} onPress={() => clickPrev()}>
              <MaterialIcons name="keyboard-arrow-left" size={32} color="white" />
            </Button>
        }


        {
          stepPosition === 3
            ? <Button gradient style={styles.btn} onPress={() => clickSave('Save')}>
              <Text h2 white>Save</Text>
            </Button>
            : <Button gradient style={styles.btn} onPress={() => clickNext()}>
              <MaterialIcons name="keyboard-arrow-right" size={32} color="white" />
            </Button>
        }
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 90,
  }
});
