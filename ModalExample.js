import React, { Component } from 'react';
import { Text, Modal, Button, View } from 'react-native';
import Menu, {
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

class ModalExample extends Component {

  constructor(props, ctx) {
    super(props, ctx);
    this.state = { visible: false };
  }

  render(props) {
    const {showHome} = this.props
    return (
      <MenuProvider style={{flexDirection: 'column', padding: 30}}>
        <View style={{marginTop: 50}}>
          <Text style={{textAlign: 'center', fontSize: 20, marginBottom: 20}}>Main window</Text>
          <Menu>
            <MenuTrigger text='Select option' />
            <MenuOptions>
              <MenuOption onSelect={() => this.setState({ visible: true })} text='Open modal' />
            </MenuOptions>
          </Menu>
          

            <Modal visible={this.state.visible} onRequestClose={() => this.setState({ visible: false })}>
              <MenuProvider skipInstanceCheck style={{flexDirection: 'column', padding: 30, backgroundColor: 'white'}}>
                
                <View style={{marginTop: 50}}>
                  <Text style={{textAlign: 'center', fontSize: 20, marginBottom: 20, color: 'red'}}>Modal window</Text>
                  <Menu onSelect={value => alert(`Selected number: ${value}`)}>
                    <MenuTrigger text='Select option' />
                    <MenuOptions>
                      <MenuOption value={1} text='One' />
                      <MenuOption value={2} text='Two' />
                      <MenuOption onSelect={() => this.setState({ visible: false })} text='Close modal' />
                    </MenuOptions>
                  </Menu>
                </View>
              </MenuProvider>
            </Modal>

        </View>
        <Button title='go Back' onPress={showHome} />
      </MenuProvider>
    );
  }

}

export default ModalExample;
