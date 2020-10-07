/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


const consoleLog = n => console.log('****** DatePicker.js -- line: ' + n + ' ******');
const { width } = Dimensions.get('window')

// khai báo props
DatePicker.propTypes = {
  propsOnChange: PropTypes.func, // from AddNew/AddNew.js parent
  //   onTodoClick: PropTypes.function;
};

// Khởi tạo giá trị default cho props khi không nhận được
// từ parent
DatePicker.defaultProps = {
  //   todos: [];
  //   onTodoClick: null;
};



export default function DatePicker(props) {
  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('date');

  const { propsOnChange } = props;

  const onChange = (event, selectedDate) => {

    const currentDate = selectedDate || date;
    setDate(currentDate);
    propsOnChange(selectedDate)
  };

  return (
    <View>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={mode}
        is24Hour={true}
        display="default"
        onChange={onChange}
        style={{ height: '100%', width: width }}

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
