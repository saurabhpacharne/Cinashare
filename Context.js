import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, storage } from "./FirebaseConfig";
import {
  addDoc,
  collection,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
  getDocs,
  where,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export const userAuth = createContext();

const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [moviePost, setMoviePost] = useState(null);
  const [userName, setUserName] = useState(null);
  const [id, setId] = useState(null);

  const collectionRef = collection(db, "MoviePost");
  const collectionUser = collection(db, "UserName");

  const getAllMoviePost = () => {
    const q = query(collectionRef, orderBy("date", "desc"));
    onSnapshot(q, (snapShot) => {
      const allPost = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMoviePost(allPost);
    });
  };
  const getAllUserName = () => {
    const q = query(collectionUser, orderBy("date", "desc"));
    onSnapshot(q, (snapShot) => {
      const allPost = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserName(allPost);
    });
  };

  useEffect(() => {
    getAllMoviePost();
    getAllUserName();

    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubcribe();
    };
  }, []);
  const addMoviePost = async (
    title,
    description,
    genre,
    star,
    date,
    type,
    industry,
    userId,
    displayName,
    image
  ) => {
    const imageRef = ref(storage, `images/${Timestamp.now().toDate()}`);
    const uploadResult = await uploadBytes(imageRef, image);

    await addDoc(collectionRef, {
      title,
      description,
      genre,
      star,
      date,
      type,
      industry,
      userId,
      displayName,
      ref1: uploadResult.ref.fullPath,
    }).then(() => {
      Toast.show({
        type: "success",
        text1: "Post added sucessfully",
        autoHide: true,
        visibilityTime: 2500,
      });
    });
  };
  const getImgUrl = async (path) => {
    return await getDownloadURL(ref(storage, path));
  };
  const getProfImgUrl = async (path) => {
    return await getDownloadURL(ref(storage, path));
  };

  return (
    <>
      <userAuth.Provider
        value={{
          user,
          addMoviePost,
          Timestamp,
          getImgUrl,
          moviePost,
          getProfImgUrl,
          userName,
        }}
      >
        {children}
      </userAuth.Provider>
      <Toast />
    </>
  );
};
export default UserAuthProvider;
