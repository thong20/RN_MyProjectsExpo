
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import format from '../../Features/standardize'
import { Block, Text, Button } from '../../components'
import * as theme from '../../constants/theme'
import ModalForm from './ModalForm';
import ListShare from './ListShare'

export default function TabLitter() {
  const { cableTV } = useSelector(state => state.unitPrice)

  const [modalVisible, setModalVisible] = useState(false)
  const _fnHideModal = () => {
    setModalVisible(false)
  }
  return (
    <Block padding={[10, 20]}>
      {
        (modalVisible)
          ? <ModalForm
            showModal={modalVisible}
            hideModal={() => _fnHideModal()}

            name="cableTV"
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
          cableTV.map((item, index) => <ListShare key={index} item={{...item, unit: 'Tháng'}} />)
        }
      </Block>
    </Block>
  );
}
