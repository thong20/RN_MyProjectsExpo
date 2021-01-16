import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// my Component
import App from "./App";
import Login from "./screen/Login/Login";

// firebase
import * as fb from "firebase";
import "firebase/auth";
import "firebase/firestore";

import key from "./configKey/firebaseKey";
import { signInUser, signOutUser } from "./api-service/firebaseApi";
import FireStorage from "./demoFirebase/FireStorage";
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
  const [animating, setAnimating] = useState(true);

  const signIn = (state) => {
    // console.log('Clicked Sign In')
    signInUser(state.emailAddress, state.password)
      .then((data) => alert(data))
      .catch((err) => alert(err));
  };

  const signOut = () => {
    signOutUser()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

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
    return <Login signIn={signIn} signOut={signOut} />;
  } else {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
    // return <FireStorage />
    // return <DemoAsyncStorage />
  }
}

export { fb };
export default AppLoading;
