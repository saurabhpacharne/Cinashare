import { Alert, View } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { Avatar, Card, Paragraph, Text, IconButton } from "react-native-paper";
import { Rating } from "react-native-ratings";
import { userAuth } from "../Context";
import { useNavigation } from "@react-navigation/native";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../FirebaseConfig";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { deleteObject, ref } from "firebase/storage";

const MovieCard = ({ ...item }) => {
  const { getImgUrl, user } = useContext(userAuth);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    getImgUrl(`${item.ref1}`).then((url) => setUrl(url));
  }, []);

  let navigation = useNavigation();

  const addComment = () => {
    navigation.navigate("Comments", {
      postId: item.id,
      postUserId: item.userId,
    });
  };
  const showAlert = async (id) => {
    Alert.alert(
      "Delete Post",
      "If you delete this post, this post will delete for everyone ",
      [
        {
          text: "No",
        },
        {
          text: "Yes, delete",
          onPress: async () => {
            await deleteDoc(doc(db, "MoviePost", id)).then(async () => {
              Toast.show({
                type: "success",
                text1: "Post Alert",
                text2: "Your post has been deleted successfully.",
                autoHide: true,
                visibilityTime: 2500,
              });
              const storageImg = ref(storage, item.ref1);
              await deleteObject(storageImg);
            });
          },
        },
      ]
    );
  };

  return (
    <View>
      {user.uid && item.userId == user.uid ? (
        <Card style={{ padding: 3, margin: 5, backgroundColor: "white" }}>
          <Card.Title
            title={item.displayName}
            titleStyle={{ fontWeight: "bold", fontSize: 17 }}
            left={() => (
              <Avatar.Icon
                size={48}
                icon="account"
                style={{ backgroundColor: "#16007A" }}
              />
            )}
            right={(props) => (
              <IconButton
                {...props}
                icon="dots-vertical"
                onPress={() => showAlert(item.id)}
              />
            )}
            style={{ margin: 0 }}
          />
          <Card.Cover
            source={{
              uri: url,
            }}
          />
          <Card.Content
            style={{
              justifyContent: "center",
              alignItems: "center",
              margin: 10,
            }}
          >
            <Text variant="titleLarge" style={{ fontWeight: "900" }}>
              {item.title}{" "}
            </Text>
            <Text variant="bodyMedium">{item.genre} </Text>
            <Paragraph
              numberOfLines={4}
              style={{ marginTop: 10, fontWeight: "400" }}
            >
              {item.description}
            </Paragraph>
            <Text
              variant="bodyMedium"
              style={{ marginTop: 10, fontWeight: "700" }}
            >
              Type : {item.type}
            </Text>
            <Text
              variant="bodyMedium"
              style={{ marginTop: 5, fontWeight: "700" }}
            >
              Industry: {item.industry}
            </Text>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={28}
              startingValue={item.star}
              readonly
              style={{ margin: 15 }}
            />
            <View>
              <Text
                onPress={() => addComment()}
                style={{ color: "#16007A", fontWeight: "bold", fontSize: 15 }}
              >
                comments
              </Text>
            </View>
          </Card.Content>
        </Card>
      ) : (
        <Card style={{ padding: 3, margin: 5, backgroundColor: "white" }}>
          <Card.Title
            title={item.displayName}
            titleStyle={{ fontWeight: "bold", fontSize: 17 }}
            left={() => (
              <Avatar.Icon
                size={48}
                icon="account"
                style={{ backgroundColor: "#16007A" }}
              />
            )}
          />
          <Card.Cover
            source={{
              uri: url,
            }}
          />
          <Card.Content
            style={{
              justifyContent: "center",
              alignItems: "center",
              margin: 10,
            }}
          >
            <Text variant="titleLarge" style={{ fontWeight: "900" }}>
              {item.title}{" "}
            </Text>
            <Text variant="bodyMedium">{item.genre} </Text>
            <Paragraph
              numberOfLines={4}
              style={{ marginTop: 10, fontWeight: "400" }}
            >
              {item.description}
            </Paragraph>
            <Text
              variant="bodyMedium"
              style={{ marginTop: 10, fontWeight: "700" }}
            >
              Type : {item.type}
            </Text>
            <Text
              variant="bodyMedium"
              style={{ marginTop: 5, fontWeight: "700" }}
            >
              Industry: {item.industry}
            </Text>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={28}
              startingValue={item.star}
              readonly
              style={{ margin: 15 }}
            />
            <View>
              <Text
                onPress={() => addComment()}
                style={{ color: "#16007A", fontWeight: "bold", fontSize: 15 }}
              >
                comments
              </Text>
            </View>
          </Card.Content>
        </Card>
      )}
    </View>
  );
};

export default MovieCard;
