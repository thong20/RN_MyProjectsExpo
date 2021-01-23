/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import {
  Image,
  View,
  Text,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import hexToRgba from 'hex-to-rgba'

const consoleLog = n => console.log('****** SelectBox.js -- line: ' + n + ' ******');

const { width } = Dimensions.get('window')

const icon = {
  checked: require('../assets/icons/checked.png'),
  unchecked: require('../assets/icons/unchecked.png')
}

// khai báo props
SelectBox.propTypes = {
  onSelect: PropTypes.func,
  //   onTodoClick: PropTypes.function;
};

// Khởi tạo giá trị default cho props khi không nhận được
// từ parent
SelectBox.defaultProps = {
  DATA: [],
  onSelect: x => x,
  fontSize: 18,
};

export default function SelectBox(props) {
  const {
    DATA,
    onSelect,
    placeholder,
    fontSize
  } = props

  const blockStyles = [
    fontSize && { fontSize: fontSize },

  ]

  const [visible, setVisible] = useState(false)
  const [showPlaceholder, setPlaceholder] = useState(false)

  const [selected, setSelected] = useState({})

  const _onClick = (itemSelected) => {
    setSelected({price: itemSelected.price})
  }
  

  
  // const isCheck = icon[isSelected ? 'checked' : 'unchecked']

  const _showModal = () => {
    setVisible(true)
  }

  return (
    <View>
      <Modal
        visible={visible}
        animationType='fade'
        transparent
      >
        <View style={styles.modal}>
          <View style={styles.content}>

            <View style={styles.title}>
              <Text style={{ color: 'white', fontSize: 24 }}>CHỌN ĐƠN GIÁ</Text>
            </View>

            <View style={{ padding: 20 }}>
              <View>
                {
                  DATA.map((item, index) => {
                    const isSelected = selected.price === item.price
                    const isCheck = icon[isSelected ? 'checked' : 'unchecked']
                    return (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        key={`key-${item.id}`}
                        onPress={() => {
                          _onClick(item)
                          onSelect(item.price)
                      }}>
                        <View style={styles.item}>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.titleItem}>{item.price}</Text>
                            <Text style={{ color: '#858585', fontSize: 18 }}> đ</Text>
                          </View>
                         <Image source={isCheck} />
                        </View>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>

              <View style={styles.gBtn}>
                <TouchableOpacity onPress={() => setVisible(false)}>
                  <View style={styles.btn}>
                    <Text style={{ fontSize: 18, color: 'white' }}>CLOSE</Text>
                  </View>
                </TouchableOpacity>
                
              </View>
            </View>

          </View>
        </View>
      </Modal>

      <TouchableOpacity activeOpacity={0.7} onPress={_showModal}>
        <View style={styles.wrapper}>
          {
            placeholder
              ? <Text style={[blockStyles, {color: '#bbb'}]}>{placeholder}</Text>
              : <Text style={blockStyles}>{DATA[0].price}</Text>
          }
          <Text style={{ color: '#858585', fontSize: fontSize * 75 / 100 }}> đ</Text>
          <MaterialIcons name="keyboard-arrow-down" size={fontSize} color="#858585" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: hexToRgba('#000', '0.4'),

  },
  content: {
    backgroundColor: 'white',
    width: width * 75 / 100,

  },
  title: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#858585'

  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingLeft: 5,
  },
  gBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 20,

  },
  btn: {
    backgroundColor: 'dodgerblue',
    padding: 10,
    width: 90,
    alignItems: 'center'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingHorizontal: 20
  },
  titleItem: {
    fontSize: 24
  }
});
