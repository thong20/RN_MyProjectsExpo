import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import SelectBox from './Features/SelectBox'

const DATA = [
  {
    id: '11',
    title: 'item 1',
    price: 3000,
  },
  {
    id: '22',
    title: 'item 2',
    price: 2500,
  },
  {
    id: '33',
    title: 'item 3',
    price: 2000,
  },
]

export default function App() {

  return (
    <View style={styles.container}>
      <SelectBox
        DATA={DATA}
        fontSize={24}

        placeholder={DATA[1].price}
        
        onSelect={(value) => console.log(value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },

});

