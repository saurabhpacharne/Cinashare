import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from "react-native";
import React, { useState, useContext, useEffect, useRef } from "react";
import { TextInput, Button } from "react-native-paper";
import { Rating } from "react-native-ratings";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { MultiSelect } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { userAuth } from "../Context";
import { Toast } from "react-native-toast-message/lib/src/Toast";


const AddPost = () => {
  const navigation = useNavigation();
  const [selectedIndValue, setSelectedIndValue] = useState();
  const [selectedTypeValue, setSelectedTypeValue] = useState();
  const [selectedGen, setSelectedGen] = useState([]);
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [star, setStar] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const { user, addMoviePost, Timestamp } = useContext(userAuth);
  const [loading, setLoading] = useState(false)
  const inputRef =useRef()
  const inputDRef =useRef()
 

  const gentre = [
    { label: "Action", value: "Action" },
    { label: "Drama", value: "Drama" },
    { label: "Crime", value: "Crime" },
    { label: "Thriller", value: "Thriller" },
    { label: "Romance", value: "Romance" },
    { label: "Mystery", value: "Mystery" },
    { label: "Horror", value: "Horror" },
    { label: "Comedy", value: "Comedy" },
    { label: "Fantasy", value: "Fantasy" },
    { label: "Suspense", value: "Suspense" },
    { label: "Westren", value: "Westren" },
    { label: "Historical", value: "Historical" },
    { label: "Science fiction", value: "Science fiction" },
    { label: "Adventure", value: "Adventure" },
    { label: "Crime-thriller", value: "Crime-thriller" },
    { label: "Psychological thriller", value: "Psychological thriller" },
  ];
  const rating = (rate) => {
    setStar(rate);
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const img = await fetch(result.assets[0].uri)
      const bytes = await img.blob()
      setImage(bytes)
      setSelectedImage(result.assets[0].uri)
    }
  };

  const onSubmit = async() => {
    setLoading(true)
    if(title && description && selectedGen && (star!==0) && selectedIndValue && selectedIndValue && image){
    await addMoviePost(
      title,
      description,
      selectedGen.toString(),
      star,
      Timestamp.now().toDate(),
      selectedTypeValue,
      selectedIndValue,
      user.uid,
      user.displayName,
      image
    ).then(()=>{
      setLoading(false)
      navigation.navigate("homeScreen")
    })
    setSelectedGen([])
    setStar(0)
    setTitle("")
    setdescription("")
    setSelectedIndValue("")
    setSelectedTypeValue("")
    setSelectedImage(null)
    inputRef.current.clear()
    inputDRef.current.clear()
    
    }
    else{
      setLoading(false);
      Toast.show({
        type:"error",
        text1: "Post alert",
        text2 : "Plese fill all the details",
        autoHide: true,
        visibilityTime: 2500
      })
    }
    
    
  };


  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.heading}>Create new post</Text>
          </View>
          <TextInput
            ref={inputRef}
            style={styles.input}
            label="Title"
            mode="outlined"
            outlineColor="#16007A"
            activeOutlineColor="#16007A"
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            ref={inputDRef}
            style={styles.input1}
            label="Description"
            mode="outlined"
            outlineColor="#16007A"
            activeOutlineColor="#16007A"
           multiline={true}
            onChangeText={(text) => setdescription(text)}
          />

          <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={gentre}
            labelField="label"
            valueField="value"
            placeholder="Select Genre"
            searchPlaceholder="Search..."
            value={selectedGen}
            onChange={(item) => {
              setSelectedGen(item);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color="black"
                name="Safety"
                size={20}
              />
            )}
            selectedStyle={styles.selectedStyle}
          />
          <View style={{ padding: 12 }}>
            <Picker
              selectedValue={selectedIndValue}
              style={{ height: 50, backgroundColor: "#FAFAF7" }}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedIndValue(itemValue)
              }
            >
              <Picker.Item
                style={{ fontWeight: "bold" }}
                label="Select Industry"
                value=""
              />
              <Picker.Item label="Hollywood" value="Hollywood" />
              <Picker.Item label="Bollywood" value="Bollywood" />
              <Picker.Item label="Marathi" value="Marathi" />
              <Picker.Item label="South Indian" value="South Indian" />
              <Picker.Item label="Korean" value="Korean" />
              <Picker.Item label="Japanese" value="Japanese" />
            </Picker>
          </View>
          <View style={{ padding: 12 }}>
            <Picker
              selectedValue={selectedTypeValue}
              style={{ height: 50, backgroundColor: "#FAFAF7" }}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedTypeValue(itemValue)
              }
            >
              <Picker.Item
                style={{ fontWeight: "bold" }}
                label="Select Type"
                value=""
              />
              <Picker.Item label="Movie" value="Movie" />
              <Picker.Item label="series" value="series" />
              <Picker.Item label="Documentry" value="Documentry" />
              <Picker.Item label="Anime" value="Anime" />
            </Picker>
          </View>
          <View>
            {selectedTypeValue && (
              <Text
                style={{
                  alignSelf: "center",
                  marginTop: 15,
                  fontWeight: "600",
                }}
              >
                Rate this {selectedTypeValue}
              </Text>
            )}
          </View>
          <Rating
            type="star"
            ratingCount={5}
            imageSize={28}
            onFinishRating={rating}
            fractions={2}
            jumpValue={0.1}
            startingValue={star}
            showRating
            
          />

          <View>
            {selectedImage && (
              <Text
                style={{
                  alignSelf: "center",
                  marginTop: 15,
                  fontWeight: "600",
                }}
              >
                Your selected image
              </Text>
            )}
          </View>
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={{
                width: 100,
                height: 100,
                alignSelf: "center",
                marginTop: 15,
              }}
            />
          )}
          <Feather
            onPress={pickImage}
            name="upload"
            size={40}
            color="black"
            style={{ alignSelf: "center", marginTop: 18 }}
          />
          <View>
            <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
              Upload image
            </Text>
          </View>
          {
            loading ?(<ActivityIndicator size="large" color="#16007A" style={{ alignItems:"center"}}/>):(
              <Button
              style={{
                backgroundColor: "#16007A",
                width: 150,
                marginTop: 15,
                alignSelf: "center",
                marginBottom: 15,
              }}
              onPress={() => {onSubmit()}}
            >
              <Text style={{ color: "white" }}>Post</Text>
            </Button>
            )
          }
          
        </View>
      </ScrollView>
      <Toast/>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    marginTop: 5,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 15,
  },
  input: {
    margin: 12,
    backgroundColor: "#FAFAF7",
    marginVertical: 0,
  },
  input1: {
   
    margin: 12,
    backgroundColor: "#FAFAF7",
    height:130
  },
  dropdown: {
    height: 50,
    backgroundColor: "#FAFAF7",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    margin: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
    marginLeft: 10,
  },
});
export default AddPost;
