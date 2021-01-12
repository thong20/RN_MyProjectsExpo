
import firebase from '../App'

export const SignInUser = (email, password) => {
  return new Promise((resolve, reject) => 
    firebase.auth().singinWithEmailAndPassword(email, password)
      .then((data) => resolve('Đăng nhập thành công!!!'))
      .catch(err => reject('Đăng nhập không thành công'))
  )
}




















