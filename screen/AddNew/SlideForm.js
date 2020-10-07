/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { FlatList, View, Text, StyleSheet } from 'react-native';

import DatePicker from "./DatePicker";
import AddElectric from "./AddElectric";
import AddWater from "./AddWater";
import AddRoom from "./AddRoom";


const consoleLog = n => console.log('****** SlideForm.js -- line: ' + n + ' ******');

// khai báo props
SlideForm.propTypes = {
  //   todos: PropTypes.array;
  //   onTodoClick: PropTypes.function;
};

// Khởi tạo giá trị default cho props khi không nhận được
// từ parent
SlideForm.defaultProps = {
  //   todos: [];
  //   onTodoClick: null;
};

export default function SlideForm() {
  const [state, setState] = useState(null)

  const DATA = new Array();
  DATA[0] = <DatePicker />
  DATA[1] = <AddElectric />
  DATA[2] = <AddWater />
  DATA[3] = <AddRoom />
  return (
    <View>
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        snapToAlignment='center'
        scrollEventThrottle={16}
        data={DATA}
        extraData={state}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item, index }) => (
          <View key={`key-${index}`}>
            {item}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
