import { View, Text } from "react-native";
import React, { useContext, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { userAuth } from "../Context";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const UserName = ({ navigation }) => {
  const [user, setUser] = useState("");
  const { userName, Timestamp } = useContext(userAuth);
  const userCollectionRef = collection(db, "UserName");
  const str = /\s/.test(user)



  const usrnme = userName.map((val) => val.username);
  const userExist = usrnme.find((val) => val == user);
  const addUserName = async () => {
    if (str==false) {
      if (userExist == undefined) {
        await addDoc(userCollectionRef, {
          date: Timestamp.now().toDate(),
          username: user,
        }).then(() => {
          navigation.navigate("Register", {
            displyname: user,
          });
        });
      } else {
        Toast.show({
          type: "error",
          text1: "username already exist, please try different.",
          autoHide: true,
          visibilityTime: 2500,
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Dont give space before, after and between username.",
        autoHide: true,
        visibilityTime: 2500,
      });
    }
  };
  
  return (
    <>
      <View>
        <Text>Step:1/2</Text>
      </View>
      <View style={{ marginTop: "40%" }}>
        <Text style={{ alignSelf: "center", fontWeight: "700" }}>
          Set a username
        </Text>
        <TextInput
          style={{ margin: 20 }}
          label="Username"
          mode="outlined"
          outlineColor="#16007A"
          placeholder="Set Username"
          activeOutlineColor="#16007A"
          onChangeText={(text) => setUser(text)}
        />
      </View>
      {user.trim() ? (
        <Button
          style={{
            backgroundColor: "#16007A",
            width: 150,
            marginTop: 20,
            alignSelf: "center",
          }}
          onPress={addUserName}
        >
          <Text style={{ color: "white" }}>NEXT</Text>
        </Button>
      ) : (
        <Button
          style={{
            backgroundColor: "grey",
            width: 150,
            marginTop: 20,
            alignSelf: "center",
          }}
        >
          <Text style={{ color: "white" }}>NEXT</Text>
        </Button>
      )}
      <Toast />
    </>
  );
};

export default UserName;
