# Manager Room for Renter
BRANCH: tenancy-management-app-for-tenants-BRANCH-FIREBASE



===== Change path run app ============================================
mở file package.json
ta thấy ở mục "main":
  "main": "node_modules/expo/AppEntry.js"

=> mở file AppEntry.js theo path trên, ở dòng:
  import App from '../../App';

=> ta thay thành đường dẫn hoặc file cần chạy là xong
vd:
import App from '../../Home';

===== Lib for expo ===================================================
ASYNC STORAGE v1.11.0:
expo install @react-native-async-storage/async-storage

FIREBASE:
expo install firebase

LINEAR GRADIENT:
expo install expo-linear-gradient

REACT NAVIGATION:
react-native-gesture-handler
react-native-reanimated
react-native-safe-area-context
react-native-screens

DATE TIME PICKER
expo install @react-native-community/datetimepicker


===== firebase =========================================================================

Khởi tạo kết nối firebase:

import * as fb from 'firebase'
fb.initializeApp(<configKey>)

Để sử dụng thêm các dịch vụ khác như: firestore, realtime-database, ...
thì ta chỉ cần import như bên dưới

import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

Khai báo để bên trong 1 function root của
Component để sử dụng như sau:

const fbAuth = fb.auth()
const fbDatabase = fb.database()
const fbFirestore = fb.firestore()
const fbFuctions = fb.fuctions()
const fbStorage = fb.storage()


vd: file App.js
...
import * as fb from 'firebase'
import 'firebase/auth'
import 'firebase/firestorage'
...
function App () {
  const fbAuth = fb.auth()
  const fbFirestore = fb.firestorage()
  ...

  return <Detail />
}

* Các component con của App.js thì chỉ cần import fb từ App.js
export thôi
vd: trong file Detail.js
...
import {fb} from './App.js'
...
function Detail(){
  const fbAuth = fb.auth()
  // hoặc fb.auth()
  const fbFirestore = fb.firestorage()
  // hoặc fb.firestore()
  ...
}




=== backup real-data ===================================================================
initial:
04-2020
Điện: 1247
Nước: 1042
Cáp: 30000

05-2020
Điện: 1389
Nước: 1058
Cáp: 0

06-2020
Điện: 1576
Nước: 1074

07-2020
Điện: 1758
Nước: 1089
Cáp: 0

08-2020
Điện: 1982
Nước: 1103
Cáp: 0

09-2020
Điện: 2321
Nước: 1120
Cáp: 0

10-2020
Điện: 2474
Nước: 1132
Cáp: 0

11-2020
Điện: 2540
Nước: 1136
Cáp: 0

12-2020
Điện: 2603
Nước: 1139
Cáp: 0

01-2021
Điện: 2669
Nước: 1142
Cáp: 0





