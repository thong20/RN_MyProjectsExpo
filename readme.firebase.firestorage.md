Cú pháp import:

import * as fb from 'firebase'
import 'firebase/filestore'

Sử dụng:
const fbFirestore = fb.firestore()

*** Các method 
  .doc()
  .get() // trả về 1 querySnapshot
  .set() // dùng để thêm 1 "document" nhưng phải khai báo id cho "doc"
  .add()  // cũng dùng để thêm 1 "doc" nhưng ko cần khai báo id cho "doc", nó
          // sẽ tự auto-general id tự động
  .update()

===== Get a "collection"  =======================================
ta sử dụng hàm get() => nó trả về 1 querySnapshot
link: https://firebase.google.com/docs/firestore/quickstart?authuser=0#read_data

fbFirestore.collection('users').get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => console.log(doc.id, doc.data()))
  })

=> Để trích xuất dữ liệu của querySnapshot ta sử dụng method forEach() của nó
=> method này sẽ trả về 1 Object "doc", Object "doc" này có:
  - 1 method là .data(), method này trả về nội dung của "doc"
chính là các Field ở cột thứ 3 trong console.firebase.google.com
  - 1 properties là "id", nó trả về các id của các "doc" items



===== Get a "document" - viết tắt là "doc"====================================
Link: https://firebase.google.com/docs/firestore/query-data/get-data?authuser=0#get_a_document
Tương tự như get "collection", ta cũng sử dụng hàm get(), nhưng:
- hàm get() của "doc" không trả về querySnapshot mà trả về các
"item" 
Vì vậy với querySnapshot thì để trích xuất dữ liệu ta sử dụng method forEach()
của nó, nhưng với "item" doc thì ta không cần sử dụng forEach()
- Và để trích xuất các "item" này, ta sử method .data() và cũng tương tự
như querySnapshot, nó có properties là "id"

fbFirestore.collection("users").doc("1122")
  .get().then(item => {
    console.log(item.id)
    console.log(item.data())
  }).catch(err => console.log(err))
  














































































