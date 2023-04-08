import { View, StatusBar, FlatList , ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import {db} from "../FirebaseConfig"
import { collection,query,onSnapshot,orderBy } from 'firebase/firestore'



const HomeScreen = () => {
  const [moviePost, setMoviePost] = useState(null)
  const collectionRef = collection(db,"MoviePost")
  
  const getAllMoviePost = async ()=>{
    const q =  query(collectionRef, orderBy("date","desc"));
     onSnapshot(q,(snapShot)=>{
       const allPost = snapShot.docs.map((doc)=>({
        id : doc.id,
        ...doc.data()
      }));
      setMoviePost(allPost)
    })
  }
  
 
  useEffect(()=>{
    getAllMoviePost()
   },[])

  return (
    <View>
    <StatusBar backgroundColor="#16007A"/>
    {
      moviePost!==null?
      <FlatList
      data={moviePost}
      keyExtractor= {Item=>Item.id}
      renderItem={({item})=>{
        return(
          <>
          <MovieCard {...item}   
          />
          </>
        )
      }}
      />:<ActivityIndicator size="large" style={{marginTop: 80, alignItems:"center"}} color="#16007A"/>
    }
   
    </View>
  )
}

export default HomeScreen