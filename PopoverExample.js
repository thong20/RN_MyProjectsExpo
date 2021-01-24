import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import { Text, View, StyleSheet, Button } from 'react-native';
import React, {useRef} from 'react';

const { Popover } = renderers

const MyPopover = () => {
  const ref = useRef()
  return (
    <Menu
      ref={r => ref.current = r}
      renderer={Popover}
      rendererProps={{ preferredPlacement: 'bottom' }}
    >
      <MenuTrigger
        onAlternativeAction={() => ref.current.open()}
        style={styles.menuTrigger}
      >
        <Text style={styles.triggerText}>{'\u263A'}</Text>
      </MenuTrigger>
      <MenuOptions style={styles.menuOptions}>
        <Text style={styles.contentText}>Hello world!</Text>
      </MenuOptions>
    </Menu>
  )
}

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
  const arr = [1,2,3,4,5,6]
  return (
    <MenuProvider style={styles.container} customStyles={{ backdrop: styles.backdrop }}>
      <View style={{marginTop: 40, borderWidth: 1, backgroundColor: 'white'}}>
        {
          arr.map((item, idx) => (
            <Row key={`${idx}`}/>
          ))
        }
        
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
    // flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    backgroundColor: 'coral',
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
