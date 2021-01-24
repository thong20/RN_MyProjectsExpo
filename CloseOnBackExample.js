import React, { Component } from 'react';
import { Text, Button, View } from 'react-native';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

class CloseOnBackExample extends Component {
  state = {
    customBackHandler: false,
  }

  customBackHandler = (instance) => {
    alert(`Back button was pressed. Current menu state: ${instance.isMenuOpen() ? 'opened' : 'closed'}`);
    return true;
  }

  render(props) {
    const {showHome} = this.props
    return (
      <MenuProvider
        style={{flexDirection: 'column', padding: 30}}
        backHandler={this.state.customBackHandler ? this.customBackHandler : true}>
        <View style={{marginTop: 40}}>
        <Menu>
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
        <Button
          title={this.state.customBackHandler ? "Change to default" : "Change to custom"}
          onPress={() => this.setState({ customBackHandler: !this.state.customBackHandler })}
        />
        <Button title='go Back' onPress={showHome}/>
      </MenuProvider>
    );
  }
}

export default CloseOnBackExample;
