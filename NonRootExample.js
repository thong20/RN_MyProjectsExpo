import React from 'react';
import { Text, View, Button } from 'react-native';
import Menu, {
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const NonRootExample = (props) => {
  const {showHome} = props
  return(
    <View style={{padding: 60, flex:1}}>
      <MenuProvider style={{flexDirection: 'column'}}>
        <Text>Hello world!</Text>
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
      </MenuProvider>
      <Button title='go Back' onPress={showHome} />
    </View>
  );
}

export default NonRootExample;
