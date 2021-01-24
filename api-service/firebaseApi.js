
import {fb} from '../AppLoading'

const consoleLog = n => console.log('=== firebaseApi.js - line: ' + n + ' ================================')

export const signInUser = (email, password) => {
  return new Promise((resolve, reject) => 
    fb.auth().signInWithEmailAndPassword(email, password)
      .then((data) => resolve('Đăng nhập thành công!!!'))
      .catch(err => reject('Đăng nhập không thành công'))
  )
}

export const signOutUser = () => {
  return new Promise((resolve, reject) => 
    fb.auth().signOut()
      .then(data => resolve(data))
      .catch(error => reject(error))
  )
}

export const signUpUser = (email, password) => {
  return new Promise((resolve, reject) => 
    fb.auth().createUserWithEmailAndPassword(email, password)
    .then(data => resolve(data))
    .catch(error => reject(error))
  )
}

export const createDocForNewUser = (uid) => {
  return new Promise((resolve, reject) => 
    fb.firestore().collection('users').doc(uid).set({})
    .then(data => resolve(data))
    .catch(error => reject(error))
  )
}
// lkajsdl













