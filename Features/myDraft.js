const checkUidInAsyncStorage = async (user) => {
  // const old_UID = await AsyncStorage.getItem("uid");

  // // USER not exist in AsyncStorage
  // if (!old_UID) {
  //   await AsyncStorage.setItem("uid", user.uid);
  //   return;
  // }

  // // exist user
  // if (old_UID !== user.uid) {
    
  //   await AsyncStorage.setItem("uid", JSON.stringify(user.uid));
  //   const arrValue = await AsyncStorage.getAllKeys(); // [[], []]
  //   const keys = arrValue.filter(
  //     (item) => !item.includes("firebase") && !item.includes("uid")
  //   );
    
  //   await AsyncStorage.multiRemove(keys);
    
  //   store.dispatch(indexInitSlice.actions.clear());
  //   store.dispatch(unitPriceSlice.actions.clear());
  //   store.dispatch(receiptSlice.actions.clear());
  //   store.dispatch(chartSlice.actions.clear());
    
  //   return
  // } 
};