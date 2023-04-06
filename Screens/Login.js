import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { auth } from "../FirebaseConfig";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { signInWithEmailAndPassword } from "firebase/auth";


const Login = ({ navigation }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)

  const signInUser = async () => {
    setLoading(true)
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {navigation.navigate("Home"); setLoading(false)})
      .catch((error) =>{
        Toast.show({
          type: "error",
          text1: "Sign In Alert",
          text2: error.message,
          autoHide: true,
          visibilityTime: 2500,
        })
        setLoading(false)
      }
      );
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.heading}>Sign In Here</Text>
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
      loading? (
        <ActivityIndicator size="large" color="#16007A" style={{ alignItems:"center", marginTop:100}}/>
      ):(<Button
        style={{
          backgroundColor: "#16007A",
          width: 150,
          marginTop: 20,
          alignSelf: "center",
        }}
        onPress={() =>signInUser()}
      >
        <Text style={{ color: "white" }}>Sign In</Text>
      </Button>)
    }
        
        <View>
          <Text
            style={{ marginTop: 30, fontWeight: "500", alignSelf: "center" }}
          >
            Hava an account ?{" "}
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={{ fontSize: 15, fontWeight: "bold", color: "blue" }}>
                Sign Up{" "}
              </Text>
            </TouchableOpacity>
            Here
          </Text>
        </View>
      </View>
      <Toast />
    </>
  );
};

export default Login;

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
