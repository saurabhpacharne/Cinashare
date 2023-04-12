import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { Avatar, Button } from "react-native-paper";
import { userAuth } from "../Context";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../FirebaseConfig";

const Profile = () => {
  const { user } = useContext(userAuth);
  const navigation = useNavigation();

  return (
    <>
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
        <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 60 }}>
          <Button
            style={{ backgroundColor: "#16007A", width: 150 }}
            onPress={() => {
              signOut(auth);
              navigation.replace("Login");
            }}
          >
            <Text style={{ color: "white" }}>LOGOUT</Text>
          </Button>
        </View>
      </View>
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
