import { View, Text, FlatList } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import { userAuth } from "../Context";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../FirebaseConfig";
import CommentSection from "./CommentSection";
import NetworkError from "./NetworkError";

const Comments = () => {
  let route = useRoute();
  const inputRef = useRef();
  const { user, Timestamp, isConnected } = useContext(userAuth);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(null);
  const commentCollectionRef = collection(
    db, 
    `MoviePost/${route.params.postId}/Comments`
  );
  const addUserComment = async () => {
    await addDoc(commentCollectionRef, {
      userName: user.displayName,
      comment: comment,
      date: Timestamp.now().toDate(),
      userId: user.uid,
    });
    setComment("");
    inputRef.current.clear();
  };
  const getAllCommentsPost = async () => {
    const q = query(commentCollectionRef, orderBy("date", "desc"));
    onSnapshot(q, (snapShot) => {
      const allPost = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(allPost);
    });
  };

  useEffect(() => {
    getAllCommentsPost();
  }, []);

  return (
    <>
      {isConnected ? (
        <>
          <View style={{ flex: 10 }}>
            {comments && comments.length !== 0 ? (
              <FlatList
                data={comments}
                keyExtractor={(Item) => Item.id}
                renderItem={({ item }) => {
                  return (
                    <>
                      <CommentSection
                        {...item}
                        name={route.params.postUserId}
                        postIdValue={route.params.postId}
                      />
                    </>
                  );
                }}
              />
            ) : (
              <Text
                style={{
                  alignSelf: "center",
                  marginTop: 200,
                  fontSize: 20,
                  fontWeight: "200",
                }}
              >
                Be the first person to comment{" "}
              </Text>
            )}
          </View>
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <TextInput
              ref={inputRef}
              onChangeText={(text) => setComment(text)}
              placeholder="start typing..."
              underlineColor="#16007A"
              style={{
                backgroundColor: "#FAFAF7",
                position: "absolute",
                width: "100%",
              }}
              multiline={true}
              right={
                comment.trim() ? (
                  <TextInput.Icon
                    icon="send-circle"
                    size={35}
                    onPress={() => addUserComment()}
                  />
                ) : (
                  <TextInput.Icon icon="send-circle-outline" size={35} />
                )
              }
            />
          </View>
        </>
      ) : (
        <NetworkError />
      )}
    </>
  );
};
//dddd

export default Comments;
