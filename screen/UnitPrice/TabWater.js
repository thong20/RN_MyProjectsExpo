/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import format from '../../Features/standardize'
import { Block, Text, Button } from '../../components'
import * as theme from '../../constants/theme'
import ModalForm from './ModalForm';
import ListShare from './ListShare'

export default function TabWater() {
  const { water } = useSelector(state => state.unitPrice)

  const [modalVisible, setModalVisible] = useState(false)

  const _fnHideModal = () => {
    setModalVisible(false)
  }
  const _fnHandleDataForm = (text) => {
    console.log('Text:', text)
    consoleLog(33)
  }
  return (
    <Block padding={[10, 20]}>
      {
        (modalVisible)
          ? <ModalForm
            showModal={modalVisible}
            hideModal={_fnHideModal}

            // dataForm={_fnHandleDataForm}
            name="water"
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
          water.map((item, index) => <ListShare key={index} item={{...item, unit: 'm3'}} />)
        }
      </Block>
    </Block>
  );
}

