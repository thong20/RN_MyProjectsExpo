import * as fb from 'firebase'

Sử dụng:
fb.auth()

*** Các properties thường sử dụng
  .currentUser
*** Các method khi Sign In
  .signInWithEmailAndPassword(email, password)
  .signOut()
  .onAuthStateChanged((user) => {}) // theo dõi user Đăng nhập hày Đăng xuất


*** Các method khi Register
  .createUserWithEmailAndPassword(email, password)
  .updateProfile({displayName, photoURL})
  .updatePassword()
  .updatePhoneNumber(phoneCredetial)

*** Lấy id của User đang Singin
  const user = fb.auth().current
  user.providerData.forEach((profile) => {
    console.log(profile.uid)
  })