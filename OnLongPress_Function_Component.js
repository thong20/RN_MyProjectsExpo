import React, { useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Constants } from 'expo';
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { Ionicons } from '@expo/vector-icons';

export default function App (props) {
    console.log('App.menu:', App.menu)
    console.log('\n=== OnLongPress - line: 15 =========================')
    const {showHome} = props

    const ref = useRef()
    
    return (
      <MenuProvider style={styles.container}>
        <View>
          <TouchableOpacity
            style={styles.button}
            onLongPress={() => console.log('button')}>
            <Text> Touch Here 0.15.1</Text>
          </TouchableOpacity>
          <Menu ref={r => (ref.current = r)}>
            <MenuTrigger
              customStyles={{
                triggerTouchable: {
                  onLongPress: (e) => {
                    ref.current.open()
                  },
                },
              }}>
              <Ionicons name="md-checkmark-circle" size={64} color="green" />
            </MenuTrigger>

            <MenuOptions>
              <MenuOption onSelect={() => alert(`Save`)} text="Save" />
              <MenuOption onSelect={() => alert(`Delete`)}>
                <Text style={{ color: 'red' }}>Delete</Text>
              </MenuOption>
              <MenuOption
                onSelect={() => alert(`Not called`)}
                disabled={true}
                text="Disabled"
              />
            </MenuOptions>
          </Menu>
        </View>
        <Button title='go Back' onPress={showHome} />
      </MenuProvider>
    );
  
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    backgroundColor: '#ecf0f1',
  },
  button: {
    padding: 20,
    margin: 30,
  },
});
