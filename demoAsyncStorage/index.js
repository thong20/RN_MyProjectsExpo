import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, TextInput } from 'react-native'
import {Block, Text, Button} from '../components/index'

// firebase
import {fb} from '../AppLoading'

// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage'

// Toast
import {useToast} from 'react-native-styled-toast'
import theme from '../config/themeToast'

const consoleLog = n => console.log('=== demoAsyncStorage.js - line: ' + n + ' ================================')

export default function DemoAsyncStorage() {
  const [state, setState] = useState({
    email: '', password: ''
  })
  const [user, setUser] = useState()
  
  // Toast
  const {toast} = useToast()

  async function checkUidExist () {
    const keys = await AsyncStorage.getItem('id')
    if(!keys){ // not exist UID in AsyncStorage
      console.log('Không tồn tại UID')
      console.Log(14)
    }else{
      console.log('Tồn tại UID')
      consoleLog(17)
    }
  }

// service API ============================================================
  const signUpUser = (email, password) => {
    return new Promise((resolve, reject) => (
      fb.auth().createUserWithEmailAndPassword(email, password)
        .then(data => resolve(data))
        .catch(err => reject(err))
    ))
  }

  const signOutUser = () => {
    return new Promise((resolve, reject) => 
      fb.auth().signOut()
        .then(data => resolve('Đăng xuất thành công'))
        .catch(err => reject('Đăng xuất không thành công'))
    )
  }

  const show_uid_Firebase = () => {
    return new Promise((resolve, reject) =>{
      const uid_Firebase = fb.auth().currentUser.uid
      if(uid_Firebase) {resolve(uid_Firebase)}
      else{reject('Không cóo uid_Firebase')}
      }
    )
  }

  const show_uid_AsyncStorage = () => {
    return AsyncStorage.getItem('uid').then(data => {
      console.log('uid_AsyncStorage:', data)
      consoleLog(60)
    })
  }

  const show_id_doc = (id) => {
    return new Promise((resolve, reject) => {
      fb.firestore().collection('users').doc(id).get()
        .then(docSnapshot => {
          console.log(docSnapshot)
          consoleLog(69)
        })
    })
  }
  
  const clearAsyncStorage = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.clear()
        .then(() => resolve('Xóa Cache thành công'))
        .catch(err => reject(e))
    })
  }

  const createDoc = (uid) => {
    return new Promise((resolve, reject) => {
      fb.firestore().collection('users').doc(uid).set({})
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
  }
// service API ============================================================


  function btnSignUp(email, password){
    signUpUser(email, password)
      .then(data => {
        toast({message: 'Đăng ký thành công'})
        return createDoc(data.user.uid) // 
      })
      .then(() => signOutUser())
      .catch(err => toast({message: err, accentColor: 'error', iconColor: 'error', iconName: "x-circle" }))
  }

  const onAuthStateChanged = user => setState(user)

  useEffect(() => {
    const subscriber = fb.auth().onAuthStateChanged(user => onAuthStateChanged(user))
    return subscriber
  }, [])

  return (
      <Block padding={[60, 0, 0, 0]} color='#eee'>
        <Text size={24} color='blue' style={{textAlign: 'center'}}>DemoAsyncStorage Component</Text>
        <Block flex={.15} padding={20}>
          <Block radius={6} color='white' flex={false} border={[1, '#ccc']} padding={10} margin={[10, 10]}row>
            <Text size={22} color='coral'>Email:</Text>
            <TextInput
              type='text'
              placeholder='Email'
              style={styles.textInput}
              onChangeText={str => setState({...state, email: str})}
            />
          </Block >
          <Block radius={6} color='white' flex={false} border={[1, '#ccc']} padding={10} margin={[10, 10]}row>
            <Text size={22} color='coral'>Password:</Text>
            <TextInput
              type='text'
              placeholder='Password'
              style={styles.textInput}
              onChangeText={str => setState({...state, password: str})}
            />
          </Block>
        </Block>
        <Block padding={[30, 10]}>
          <Button style={styles.btnLarge} onPress={() => btnSignUp(state.email, state.password)}>
            <Text color='blue' size={18}>SignUp</Text>
          </Button>
          <Button style={styles.btnLarge}>
            <Text color='blue' size={18}>SignOut</Text>
          </Button>
          
          <Block flex={false} row space='between' padding={[0, 10]}>
            <Button style={styles.btnSmall}>
              <Text color='red' size={18}>uid Firebase</Text>
            </Button>
            <Button style={styles.btnSmall}>
              <Text color='red' size={18}>uid AsyncStorage</Text>
            </Button>
          </Block>

          <Block flex={false} row space='between' padding={[0, 10]}>
            <Button style={styles.btnSmall}>
              <Text color='red' size={18}>id "doc"</Text>
            </Button>
            <Button style={styles.btnSmall}>
              <Text color='red' size={18}>clear Storage</Text>
            </Button>
          </Block>

          


        </Block>
      </Block>
  )
}

const styles = StyleSheet.create({
  btnLarge: {
    borderWidth: 1,
    borderColor: 'blue',
  },
  btnSmall: {
    borderWidth: 1,
    borderColor: 'red',
    paddingHorizontal: 10,
    width: '45%',
  },  

  textInput: {
    flex: 1,
    fontSize: 22,
    marginLeft: 20,
  }
}) 