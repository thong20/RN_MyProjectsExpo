import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native'


const MyComponent = () => {
  const [input, setInput] = React.useState('')
  const [show, setShow] = React.useState('')

  function formatStringNumber(str){
    // Xử lý, loại bỏ dấu '.'
    var arrTmp = str.split('.')
    var n = arrTmp.join('')

    // main
    var array = []
    var tmp = n
    for(let i = 0 ; i < n.length / 3 ; i++){
      array.unshift(tmp.slice(-3))
      tmp = tmp.substring(0, tmp.length - 3)
    }
    setShow(array.join('.'))
    
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.text, {color: 'red', fontWeight: 'bold'}]}>Chuẩn hóa chuỗi số trong TextInput</Text>
      <Text style={[styles.text, {color: 'green'}]}>{show}</Text>

      <TextInput
        value={show}
        placeholder="Comment"
        onChangeText={text => {
          formatStringNumber(text)
          setInput(text)
        }}
        style={styles.textInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: 250,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 22

  },
  text: {
    fontSize: 20,
    marginBottom: 15
  }
})

export default MyComponent;