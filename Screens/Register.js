import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useState , useContext} from "react";
import { TextInput, Button } from "react-native-paper";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../FirebaseConfig";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import {userAuth} from "../Context"


const Register = ({ navigation }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {moviePost} = useContext(userAuth)
const user = moviePost.map((val)=>val.displayName)
const userExist = (user.find((val)=>val==userName))

const spaceExist =userName.indexOf(" ")

  const signUpUser = async () => {
    setLoading(true)
    if(userName){
    if(spaceExist=== -1){
      if(userExist==undefined){
        await createUserWithEmailAndPassword(auth, email, password)
    .then(() => { Toast.show({
      type:"success",
      text1:"You have successfully registered",
      autoHide:true,
      visibilityTime:2500
    });
    setLoading(false)
      navigation.navigate("Login")})
      .catch((error) =>
        Toast.show({
          type: "error",
          text1: "Sign Up Alert",
          text2: error.message,
          autoHide:true,
          visibilityTime:2500

        })
      );
    updateProfile(auth.currentUser, { displayName: userName });

      }else{
        Toast.show({
          type: "error",
          text1: "username already exist, please try different",
          autoHide:true,
          visibilityTime:2500
        })
        setLoading(false)
      }
    }
    else{
      Toast.show({
        type: "error",
        text1: "Please dont give space in username",
        autoHide:true,
        visibilityTime:2500
      })
      setLoading(false)
    }
  }else{
    Toast.show({
      type: "error",
      text1: "username is required",
      autoHide:true,
      visibilityTime:2500
    })
    setLoading(false)
  }   
  };

  
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.heading}>Signup Here</Text>
        <TextInput
          style={styles.input}
          label="Username"
          mode="outlined"
          outlineColor="#16007A"
          activeOutlineColor="#16007A"
          onChangeText={(text) => setUserName(text)}
        />
        <TextInput
          style={styles.input}
          label="Email"
          mode="outlined"
          outlineColor="#16007A"
          activeOutlineColor="#16007A"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          label="Password"
          mode="outlined"
          outlineColor="#16007A"
          activeOutlineColor="#16007A"
          secureTextEntry={secureTextEntry}
          onChangeText={(text) => setPassword(text)}
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => {
                setSecureTextEntry(!secureTextEntry);
                return false;
              }}
            />
          }
        />
    {
      loading?(<ActivityIndicator size="large" color="#16007A" style={{ alignItems:"center", marginTop:100}}/>):(
        <Button
        style={{
          backgroundColor: "#16007A",
          width: 150,
          marginTop: 20,
          alignSelf: "center",
        }}
        onPress={() => signUpUser()}
      >
        <Text style={{ color: "white" }}>Sign Up</Text>
      </Button>
      )
    }
        
      </View>
      <Toast />
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#FAFAF7",
    margin: 25,
    marginVertical: 10,
    borderEndColor: "#16007A",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#16007A",
    alignSelf: "center",
  },
});
