/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native';
import StepIndicator from 'react-native-step-indicator';

import { Block } from '../../components'
import * as theme from '../../constants/theme'


const consoleLog = n => console.log('****** StepIndicator.js -- line: ' + n + ' ******');

// khai báo props
StepIndicatorComponent.propTypes = {
  stepPosition: PropTypes.number, // from Parent: /navigation/HomeDrawer.js

};

// Khởi tạo giá trị default cho props khi không nhận được
// từ parent
StepIndicatorComponent.defaultProps = {
  stepPosition: 0,
  //   onTodoClick: null,
};

export default function StepIndicatorComponent(props) {
  const { stepPosition } = props
  const [currentPosition, setCurrentPosition] = useState(stepPosition)

  const labels = ["Ngày tháng", "Điện", "Nước", "Phòng"];
  const customStyles = {
    stepIndicatorSize: 20,
    currentStepIndicatorSize: 25,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: theme.colors.primary,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: theme.colors.primary,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: theme.colors.primary,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: theme.colors.primary,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: theme.colors.primary,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: theme.colors.gray,
    labelSize: 13,
    currentStepLabelColor: theme.colors.primary
  }

  return (
    <Block flex={false} padding={[20, 10]} style={{ zIndex: 9999 }}>
      <StepIndicator
        stepCount={4}
        customStyles={customStyles}
        // currentPosition={currentPosition}
        currentPosition={stepPosition}
        labels={labels}
        onPress={(n) => console.log('pressed:', n)}
      />
    </Block>
  );
}

const styles = StyleSheet.create({

});
