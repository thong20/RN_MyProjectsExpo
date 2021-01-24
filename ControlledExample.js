import React, { Component } from 'react';
import { Text, Button, View } from 'react-native';
import Menu, {
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

export default class ControlledExample extends Component {

  constructor(props, ctx) {
    super(props, ctx);
    this.state = { opened: true };
  }

  onOptionSelect(value) {
    alert(`Selected number: ${value}`);
    this.setState({ opened: false });
  }

  onTriggerPress() {
    this.setState({ opened: true });
  }

  onBackdropPress() {
    this.setState({ opened: false });
  }

  render(props) {
    const {showHome} = this.props
    const { opened } = this.state;
    console.log('ControlledExample - opened', opened)
    return (
      <MenuProvider
        style={{flexDirection: 'column', padding: 30}}>
        <View style={{marginTop: 50}}>
          <Text style={{marginBottom: 20, textAlign: 'center', fontSize: 20}}>Hello world!</Text>
          <Menu
            opened={opened}
            onBackdropPress={() => this.onBackdropPress()}
            onSelect={value => this.onOptionSelect(value)}>
            <MenuTrigger
              onPress={() => this.onTriggerPress()}
              text='Select option'/>
            <MenuOptions>
              <MenuOption value={1} text='One' />
              <MenuOption value={2}>
                <Text style={{color: 'red'}}>Two</Text>
              </MenuOption>
              <MenuOption value={3} disabled={true} text='Three' />
            </MenuOptions>
          </Menu>
        </View>

        <View>
          <Button title='go Back' onPress={showHome}/>
        </View>
      </MenuProvider>
    );
  }

}
