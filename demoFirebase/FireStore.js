import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Block, Text, Button } from "../components/index";
import PropTypes from "prop-types";
import AsyncStorage from "@react-native-async-storage/async-storage";

// firebase
import { fb } from "../AppLoading";
import "firebase/firestore";

const consoleLog = (n) =>
  console.log(
    "=== FireStore.js - line: " + n + " ================================"
  );

// Khai báo thuộc tính cho Component
FireStore.propTypes = {
  // todos: PropTypes.array,
  // onTodoClick: PropTypes.function,
};

// Gán giá trị mặc định cho props, khi
// props không có giá trị
FireStore.defaultProps = {
  // todos: [],
  // onTodoClick: null,
};

export default function FireStore() {
  const fbFireStore = fb.firestore();

  const [dataLocal, setDataLocal] = useState();
  const [name, setName] = useState('')

  const getData = async () => {
    await fbFireStore
      .collection("users")
      .doc("Jb0JGoJkoJ4XyYx3iv4b")
      .get()
      .then((items) => {
        console.log(items.id);
        console.log(items.data().data);
        consoleLog(32);
      });
  };

  const backupData = async () => {
    const jsonValue = await AsyncStorage.getItem("unitPrice");
    const obj = JSON.parse(jsonValue)
    
    fbFireStore
      .collection('users')
      .doc('8888')
      .set(obj) // return về Promise
      .then(() => console.log('Back up thành công'))
      .catch(() => console.log('Back up không thành công'))
  };

  const getMutiple = async (keys) => {
    const jsonValue = await AsyncStorage.multiGet(keys)
    console.log(typeof jsonValue)
    consoleLog(55)
  }
  
  const createDocWithName = (name) => {
    console.log(name)
    consoleLog(67)
    fbFireStore.collection('users').doc(name).set({})
  }

  useEffect(() => {
    let newArr = null;
    AsyncStorage.getAllKeys()
      .then(data => {
        newArr = data.filter(item => !item.includes("firebase"))
        
        getMutiple(newArr)
        
      });
  }, []);

  return (
    <Block>
      <Block flex={0.5} middle center>
        <Button
          style={{ borderWidth: 1, paddingHorizontal: 20, borderColor: "red" }}
          onPress={() => backupData()}
        >
          <Text color="red">Back up</Text>
        </Button>
        <Button
          style={{
            marginTop: 30,
            borderWidth: 1,
            paddingHorizontal: 20,
            borderColor: "blue",
          }}
          onPress={() => getData()}
        >
          <Text color="blue">Load data</Text>
        </Button>
      </Block>

      <Block flex={0.5} padding={[0, 20]}>
        <Block
          flex={false}
          row
          padding={[10, 0]}
          margin={[20, 0, 0, 0]}
          style={styles.row}
        >
          <Text size={18} color="blue">
            Name
          </Text>
          <TextInput
            placeholder="Name"
            style={{ marginLeft: 20, fontSize: 18 }}
            onChangeText={(str) => setName(str)}
          />
        </Block>
        <Block
          flex={false}
          row
          padding={[10, 0]}
          margin={[20, 0, 0, 0]}
          style={styles.row}
        >
          <Text size={18} color="blue">
            E-mail
          </Text>
          <TextInput
            placeholder="E-mail"
            style={{ marginLeft: 20, fontSize: 18 }}
          />
        </Block>
        <Block>
          <Button
            style={{
              marginTop: 30,
              borderWidth: 1,
              paddingHorizontal: 20,
              borderColor: "blue",
            }}
            onPress={() => console.log("Clicked")}
          >
            <Text color="blue">Load data</Text>
          </Button>
        </Block>
        <Block>
          <Button
            style={{
              borderWidth: 1,
              paddingHorizontal: 20,
              borderColor: "blue",
            }}
            onPress={() => createDocWithName(name)}
          >
            <Text color="blue">Tạo doc theo Name</Text>
          </Button>
        </Block>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  row: {
    borderColor: "red",
    borderBottomWidth: 1,
  },
});
