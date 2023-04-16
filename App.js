import { StyleSheet, View, StatusBar } from "react-native";
import Home from "./Screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./Screens/Register";
import Login from "./Screens/Login";
import { Provider } from "react-native-paper";
import UserAuthProvider from "./Context";
import Comments from "./Screens/Comments";
import UserName from "./Screens/UserName";
import About from "./Screens/About";


export default function App() {
  

  const Stack = createNativeStackNavigator();

  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor="#16007A" />
        <UserAuthProvider>
          <Provider>
            <NavigationContainer >
              <Stack.Navigator
                  initialRouteName="Login"
                  screenOptions={{
                    headerStyle: {
                      backgroundColor: "#16007A",
                    },
                    headerTitleStyle: { fontSize: 20, color: "white" },
                    headerTintColor: "white",
                  }}
                >
                  <Stack.Screen name="Register" component={Register} />
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="Comments" component={Comments} />
                  <Stack.Screen name="Set username" component={UserName} />
                  <Stack.Screen name="About Us" component={About} />
                  <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                  />
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
  },
});
