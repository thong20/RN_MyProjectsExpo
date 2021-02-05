import React, { useState, useEffect } from "react";
import {NavigationContainer} from '@react-navigation/native'

// my Component
import App from "./App";
import LoginStack from "./navigation/LoginStack";

// firebase
import * as fb from "firebase";
import "firebase/auth";
import "firebase/firestore";

// Toast
import { ThemeProvider } from 'styled-components'
import { ToastProvider, useToast } from 'react-native-styled-toast'
import theme from './config/themeToast'

import key from "./config/firebaseKey";

import { Provider } from "react-redux";
import store from "./redux/store/store";

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
          <NavigationContainer>
            <LoginStack />
          </NavigationContainer>
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
  }
}

export { fb };
export default AppLoading;
