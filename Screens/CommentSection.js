import { Text, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Card, Avatar } from "react-native-paper";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { userAuth } from "../Context";

const CommentSection = ({ name, postIdValue, ...item }) => {
  const { user } = useContext(userAuth);
  const deleteComments = (itemData) => {
    if (name == user.uid || itemData.userId == user.uid) {
      Alert.alert("Delete comment", "Do you want to delete this comment ?", [
        {
          text: "No",
        },
        {
          text: "Yes, delete",
          onPress: async () => {
            await deleteDoc(
              doc(db, `MoviePost/${postIdValue}/Comments`, itemData.id)
            );
          },
        },
      ]);
    }
  };
 

  return (
    <>
      <Card
        style={{ padding: 5, margin: 5 }}
        onLongPress={() => deleteComments(item)}
      >
        <Card.Title
          titleStyle={{ fontWeight: "bold", fontSize: 15 }}
          title={item.userName}
          left={(props) => <Avatar.Icon {...props} icon="account" />}
        />

        <Card.Content>
          <Text
            variant="titleLarge"
            style={{ marginLeft: 50, marginTop: 0, fontSize: 15 }}
          >
            {item.comment}
          </Text>
        </Card.Content>
      </Card>
    </>
  );
};

export default CommentSection;
