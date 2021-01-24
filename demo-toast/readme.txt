support Expo

1 - Cài đặt:
yarn add react-native-styled-toast 
npm install styled-system styled-components


2 - Sử dụng:

  Bước 1 wrap:
    Ta phải wrap app ở bên trong <ThemeProvider> và <ToastPRovider>
vd:
- Giả sử app có file gốc là App.js:

...
// Toast
import { ThemeProvider } from 'styled-components'
import { ToastProvider } from 'react-native-styled-toast'
...

function App (){
  ...
  const theme = {
    space: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48],
    colors: {
      text: '#0A0A0A',
      background: '#FFF',
      border: '#E2E8F0',
      muted: '#F0F1F3',

      success: '#7DBE31',
      error: '#FC0021',
      info: '#00FFFF'
    }
  }

  ...

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        ...
          <Home />
        ...
      </ToastProvider>
    </ThemeProvider>
  )
}

Bước 2: gọi Toast
Trong file Home.js

...
import {useToast} from 'react-native-styled-toast'
...

function Home (){
  ...
  const {toast} = useToast()
  return (
    <View style={styles.container}>
      <Text>Toast Component</Text>
      <Button title='Toast' onPress={() => toast({
        // config Toast
        message: 'thong20',
        color: 'blue',
      })} />
      <Button title='Toast' onPress={() => toast({
        // config Toast
        message: 'thong20',
        color: 'blue',
        accentColor: 'error'
      })} />

      <Button title='Toast' onPress={() => toast({
        message: 'Check me out!'
      })} />
    </View>
  )
}

vậy là xong, ta có thể xem thêm các thuộc tính
cấu hình tại github:
https://github.com/jeanverster/react-native-styled-toast








