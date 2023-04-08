import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { Avatar, Button } from "react-native-paper";
import { userAuth } from "../Context";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { auth, db ,storage} from "../FirebaseConfig";
// import { MaterialIcons } from '@expo/vector-icons';
// import * as ImagePicker from "expo-image-picker";
// import { query, collection, orderBy, onSnapshot, addDoc } from "firebase/firestore";
// import { uploadBytes ,ref} from "firebase/storage";
// import ProfilePic from "./ProfilePic";



const Profile = () => {
  const { user} = useContext(userAuth);
  const navigation = useNavigation();
  // const [details, setDetails]= useState([])
  // const collectionProPic = collection(db,"ProfilePic")
  // const onSumbit = async()=>{
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     const img = await fetch(result.assets[0].uri)
  //     const bytes = await img.blob()
  //     const imageRef = ref(storage,`ProfilePics/${Timestamp.now().toDate()}`);
  //     const uploadResult = await uploadBytes(imageRef,bytes) 
  //     await addDoc(collectionProPic,{
  //       ProfilePicRef :uploadResult.ref.fullPath,userId: user.uid, date:Timestamp.now().toDate()
  //     })
  //   }  
   
  // }
  // const getProfileData = async()=>{
  //   const q =  query(collectionProPic, orderBy("date","desc"));
  //   onSnapshot(q,(snapShot)=>{
  //     const allPost = snapShot.docs.map((doc)=>({
  //      ...doc.data()
  //    }));
  //    setDetails(allPost)
  //  })
  // }
  // useEffect(()=>{
  //   getProfileData()
  //   console.log(details)
  // },[]) 
  
  
  return (
    <View style={styles.container}>
     <View style={{marginTop:15}}>
      <Avatar.Icon size={140} icon="account" color="white" style={{backgroundColor:"#16007A"}}/>
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
          <Text style={{ color: "white" }}>logout</Text>
        </Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default Profile;
