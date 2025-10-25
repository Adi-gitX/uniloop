import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const AsyncScreen = () => {
  const [screenText, setScreenText] = useState("");


  const setString = async () => {
    try {
      await AsyncStorage.setItem('user', screenText);
    } catch (error) {
      console.error("Error saving data", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={screenText}
        onChangeText={setScreenText}
        style={styles.input}
      />
      <Button title="Add User" onPress={setString} />
    </View>
  );
};

export default AsyncScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#fafafa',
  },
});
