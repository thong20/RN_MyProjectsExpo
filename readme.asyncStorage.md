# Async Storage

import AsyncStorage from '@react-native-async-storage/async-storage';
 * Note: các giá trị trả về có 2 loại:
  1. là JSON, khi sử dụng giá trị này phải sử dụng JSON.parse()
  2. là null

các method:
  .setItem(key, JSON.stringify(data))
  .getItem(key) // trả về 1 JSON, để convert lại đối tượng gốc ta sử dụng JSON.parse(jsonValue)
  .multiGet(key) // trả về [[key1, json], [key2, json], ...]
  .getAllKeys() // trả về [key1, key2, ...]
  .removeItem(key)
  .clear()
  
* Chú ý:
- Ở hàm setItem(), argument thứ 2 phải là 1 chuỗi JSON

Để sử dụng ta phải dùng async-await









