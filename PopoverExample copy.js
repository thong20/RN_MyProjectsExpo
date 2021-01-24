import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import { Text, View, StyleSheet, Button } from 'react-native';
import React from 'react';

const { Popover } = renderers

const MyPopover = () => (
  <Menu renderer={Popover} rendererProps={{ preferredPlacement: 'bottom' }}>
    <MenuTrigger style={styles.menuTrigger} >
      <View style={{
        borderWidth: 1,
      }}>
        <Text style={styles.triggerText}>{'\u263A'}</Text>
      </View>
    </MenuTrigger>
    <MenuOptions style={styles.menuOptions}>
      <Text style={styles.contentText}>Hello world!</Text>
    </MenuOptions>
  </Menu>
)

const Row = () => (
  <View style={styles.row}>
    <MyPopover />
    <MyPopover />
    <MyPopover />
    <MyPopover />
    <MyPopover />
    <MyPopover />
  </View>
)

const PopoverExample = (props) => {
  const {showHome} = props
  return (
    <MenuProvider style={styles.container} customStyles={{ backdrop: styles.backdrop }}>
      <View style={{marginTop: 40, borderWidth: 1}}>
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
      </View>
      <View style={{borderWidth: 1}}>
        <Button title='go Back' onPress={showHome} />
      </View>
    </MenuProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    backgroundColor: 'green',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backdrop: {
  },
  menuOptions: {
    padding: 50,
  },
  menuTrigger: {
    padding: 5,
  },
  triggerText: {
    fontSize: 20,
  },
  contentText: {
    fontSize: 18,
  },
})

export default PopoverExample;
