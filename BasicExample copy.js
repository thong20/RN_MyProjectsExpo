import React from 'react';
import { Text, Button, View } from 'react-native';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const BasicExample = (props) => {
  const {showHome} = props
  return (
    <MenuProvider style={{flexDirection: 'column', padding: 30}}>
      <View style={{marginTop: 40}}>
        <Text style={{marginBottom: 20, textAlign: 'center', fontSize: 20}}>Hello world!</Text>
        <Menu onSelect={value => alert(`Selected number: ${value}`)}>
          <MenuTrigger text='Select option' />
          <MenuOptions>
            <MenuOption value={1} text='One' />
            <MenuOption value={2}>
              <Text style={{color: 'red'}}>Two</Text>
            </MenuOption>
            <MenuOption value={3} disabled={true} text='Three' />
          </MenuOptions>
        </Menu>
      </View>
      <Button title='go Back' onPress={showHome}/>
    </MenuProvider>
  );
}

export default BasicExample;
