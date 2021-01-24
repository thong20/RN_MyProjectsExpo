import React, {useState, useRef} from 'react';
import { Text, Button, View, TouchableOpacity } from 'react-native';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const ChildF2 = (props) => (
  <View>
    <Text>Child F2</Text>
    <ChildF3 ctx/>
  </View>
)

const ChildF3 = () => (
  <MyItems />
)

const MyItems = (props) => {
  const {ctx} = props
  const [opened, setOpened] = useState(false)
  const ref = useRef()

  const arr = ["item 1", "item 2", "item 3", "item 4"]
  return arr.map((item, idx) => {
    return (
      <Menu
        ref={r => ref.current = r}
      >
        <MenuTrigger
          triggerOnLongPress={false}
          onPress={() => console.log('onPress')}
          onAlternativeAction={() => ref.current.open()}
          customStyles={{
            TriggerTouchableComponent: TouchableOpacity,
            triggerTouchable: {
              key: `${idx}`,
              // onLongPress: () => {
              //   Menu.open().then(data => console.log('onLongPress', '\n=== line: 38 ==========================='))
              // }
            }
          }}
        > 
          <Text>{item}</Text>
        </MenuTrigger>
        <MenuOptions>
          <MenuOption value={1} text='One' />
          <MenuOption value={2}>
            <Text style={{color: 'red'}}>Two</Text>
          </MenuOption>
          <MenuOption value={3} disabled={true} text='Three' />
        </MenuOptions>
      </Menu>
    )
  })
  

}

const BasicExample = (props) => {
  const {showHome} = props
  return (
    <MenuProvider style={{flexDirection: 'column', padding: 30}}>
      <View style={{marginTop: 40, borderWidth: 5}}>
        <Text style={{marginBottom: 20, textAlign: 'center', fontSize: 20}}>Hello world!</Text>
        <ChildF2 ctx={props}/>
      </View>
      <Button title='go Back' onPress={showHome}/>
    </MenuProvider>
  );
}

export default BasicExample;
