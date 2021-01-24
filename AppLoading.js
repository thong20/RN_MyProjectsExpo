import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// my Component
import App from "./App";
import Login from "./screen/Login/Login";
import Toast from './demo-toast/Toast'

// firebase
import * as fb from "firebase";
import "firebase/auth";
import "firebase/firestore";

// Toast
import { ThemeProvider } from 'styled-components'
import { ToastProvider, useToast } from 'react-native-styled-toast'
import theme from './config/themeToast'


import key from "./config/firebaseKey";
import { signInUser, signOutUser } from "./api-service/firebaseApi";
import FireStore from "./demoFirebase/FireStore";
import DemoAsyncStorage from "./demoAsyncStorage";

import { Provider } from "react-redux";
import store from "./redux/store/store";
import { indexInitSlice } from "./redux/reducer/sliceIndexInit";
import { unitPriceSlice } from "./redux/reducer/sliceUnitPrice";
import { receiptSlice } from "./redux/reducer/sliceReceipt";
import { chartSlice } from "./redux/reducer/sliceChart";

fb.initializeApp(key);

const consoleLog = (n) =>
  console.log(
    "=== AppLoading.js - line: " + n + " ================================"
  );

function AppLoading() {
  const fbAuth = fb.auth();
  
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
  }

  useEffect(() => {
    const subscriber = fbAuth.onAuthStateChanged((user) =>
      onAuthStateChanged(user)
    );
    return subscriber; // unsubscribe on unmount
  }, []);

  
  if (!user) {
    return (
      <ThemeProvider theme={theme}>
        <ToastProvider>
          {/* <Login signIn={signIn} signOut={signOut} /> */}
          <Login />

          {/* <DemoAsyncStorage /> */}

        </ToastProvider>
      </ThemeProvider>
      )
  } else {
    return (
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </ToastProvider>
      </ThemeProvider>
    );

    // return <FireStore />

    // return (
    //   <ThemeProvider theme={theme}>
    //     <ToastProvider>
    //       <DemoAsyncStorage />
    //     </ToastProvider>
    //   </ThemeProvider>
    // )
  }
}

export { fb };
export default AppLoading;
