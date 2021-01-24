import React from 'react'
import {ActivityIndicator, StyleSheet} from 'react-native'

function ActivityIndicatorElement(){
  return (
    <ActivityIndicator
      color="#009688"
      size="large"
      style={styles.activityIndicatorStyle}
    />
  );
};

const styles = StyleSheet.create({
  activityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center'
  }
})

export default ActivityIndicatorElement