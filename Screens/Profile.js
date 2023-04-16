import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { Avatar, Button } from "react-native-paper";
import { userAuth } from "../Context";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../FirebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetworkError from "./NetworkError";

const Profile = () => {
  const { user, isConnected} = useContext(userAuth);
  const navigation = useNavigation();

 
  return (
    <>
      {isConnected ? (
        <View style={styles.container}>
          <View style={{ marginTop: 10 }}>
            <Avatar.Icon
              size={140}
              color="white"
              style={{
                alignSelf: "center",
                marginTop: 10,
                backgroundColor: "#16007A",
              }}
              icon="account"
            />
          </View>
          <Text style={{ marginTop: 20, fontWeight: "bold", fontSize: 28 }}>
            {user.displayName}
          </Text>
          <Text style={{ marginTop: 2, fontWeight: "normal", fontSize: 18 }}>
            {user.email}
          </Text>
          <View
            style={{ flex: 1, justifyContent: "flex-end", marginBottom: 60 }}
          >
            <Button
              style={{ backgroundColor: "#16007A", width: 150 }}
              onPress={async () => {
                await AsyncStorage.clear().then(() => {
                  navigation.replace("Login");
                });
              }}
            >
              <Text style={{ color: "white" }}>LOGOUT</Text>
            </Button>
          </View>
        </View>
      ) : (
        <NetworkError />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default Profile;
