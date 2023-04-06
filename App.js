
import {  StyleSheet,  View ,StatusBar} from 'react-native';
import Home from './Screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './Screens/Register';
import Login from './Screens/Login';
import { Provider } from 'react-native-paper';
import UserAuthProvider  from './Context';
import {onAuthStateChanged} from 'firebase/auth'
import { useEffect, useState } from 'react';
import { auth } from './FirebaseConfig';
import Comments from './Screens/Comments';


export default function App() {

  const [user,setUser] = useState()
  useEffect(()=>{
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubcribe();
    };
  },[])

const Stack = createNativeStackNavigator();

  return (
   <>
    <View style={styles.container}>
    <StatusBar backgroundColor="#16007A"/>
    <UserAuthProvider  >
    <Provider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user?"Home":"Login"} screenOptions={{headerStyle:{
        backgroundColor:"#16007A"
      }, headerTitleStyle: { fontSize: 25, color: "white" }}}>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Comments" component={Comments} />
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
    </UserAuthProvider>
    </View>
    
   </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  }
});
