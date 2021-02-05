/* eslint-disable no-unused-vars */

/*
  <SelectBox /> có 1 props onSelect là 1 function nhận vào 1 parameter 'valule'
*/

import React, { useState } from 'react';
import PropTypes from 'prop-types'
import {
  Image,
  View,
  Text,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import hexToRgba from 'hex-to-rgba'

// Number standardize
Number.prototype.format = function (n = 0, x = 3, s = '.', c = ',') {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
    num = this.toFixed(Math.max(0, ~~n)); // ~~n là toán tử bitwise NOT double, 
  // tương tự hàm Math.floor(n) là làm tròn xuống
  return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

const consoleLog = n => console.log('****** SelectBox.js -- line: ' + n + ' ******');

const { width } = Dimensions.get('window')

const icon = {
  checked: require('../assets/icons/checked.png'),
  unchecked: require('../assets/icons/unchecked.png')
}

// khai báo props
SelectBox.propTypes = {
  //   todos: PropTypes.array;
  //   onTodoClick: PropTypes.function;
};

// Khởi tạo giá trị default cho props khi không nhận được
// từ parent
SelectBox.defaultProps = {
  onSelect: x => x,
  DATA: [],
  fontSize: 18,
};

export default function SelectBox(props) {
  const {
    DATA,
    onSelect,
    border,
    margin,
    padding,
    minWidth,
    minHeight,
    width,
    height,
    fontSize,
    bold,
    style,
    ...restProps
  } = props

  const blockStylesView = [

    border && _styleBorder(border),
    margin && _handleMargins(),
    padding && _handlePaddings(),
    minWidth && { minWidth: minWidth },
    minHeight && { minHeight: minHeight },
    width && { width: width },
    height && { height: height },

  ]

  const blockStylesText = [
    fontSize && { fontSize: fontSize },
    bold && { fontWeight: 'bold' }
  ]

  function _handleMargins() {
    const { margin } = props;
    if (typeof margin === "number") {
      return {
        marginTop: margin,
        marginRight: margin,
        marginBottom: margin,
        marginLeft: margin
      };
    }

    if (typeof margin === "object") {
      const marginSize = Object.keys(margin).length;
      switch (marginSize) {
        case 1:
          return {
            marginTop: margin[0],
            marginRight: margin[0],
            marginBottom: margin[0],
            marginLeft: margin[0]
          };
        case 2:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[0],
            marginLeft: margin[1]
          };
        case 3:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[2],
            marginLeft: margin[1]
          };
        default:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[2],
            marginLeft: margin[3]
          };
      }
    }
  }

  function _handlePaddings() {
    const { padding } = props;
    if (typeof padding === "number") {
      return {
        paddingTop: padding,
        paddingRight: padding,
        paddingBottom: padding,
        paddingLeft: padding
      };
    }
    // padding={[0, theme.sizes.padding * 2]}
    if (typeof padding === "object") {
      const paddingSize = Object.keys(padding).length; // 2 [0, 1]
      switch (paddingSize) {
        case 1:
          return {
            paddingTop: padding[0],
            paddingRight: padding[0],
            paddingBottom: padding[0],
            paddingLeft: padding[0]
          };
        case 2:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[0],
            paddingLeft: padding[1]
          };
        case 3:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[2],
            paddingLeft: padding[1]
          };
        default:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[2],
            paddingLeft: padding[3]
          };
      }
    }
  }

  function _styleBorder(border) {
    if (typeof border === "number") {
      return { borderWidth: border }
    }
    if (typeof border === "object") {
      return { borderWidth: border[0], borderColor: border[1], borderRadius: border[2] }
    }
  }


  const [visible, setVisible] = useState(false)
  const [priceSelected, setPriceSelected] = useState(0)

  const _handlePriceSelected = (item) => {
    
    if(priceSelected === item.price){
      onSelect(0)
      setPriceSelected(0)
      return
    }
    onSelect(item.price)
    setPriceSelected(item.price)
    return
  }

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
                    const isChecked = (priceSelected === item.price) ? icon.checked : icon.unchecked
                    return (
                      <TouchableOpacity activeOpacity={0.8} key={`key-${index}`}
                        onPress={() => _handlePriceSelected(item)}
                      >
                        <View style={styles.item}>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.titleItem}> {(item.price).format()} </Text>
                            <Text style={{ color: '#858585', fontSize: 18 }}> đ</Text>
                          </View>
                          <Image source={isChecked} />
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

      <TouchableOpacity activeOpacity={0.7} onPress={_showModal} style={blockStylesView}>
        <View style={styles.wrapper}>
          <Text style={blockStylesText}>{priceSelected.format()}</Text>
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
    backgroundColor: hexToRgba('#000', '0.8'),

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
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  gBtn: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
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
