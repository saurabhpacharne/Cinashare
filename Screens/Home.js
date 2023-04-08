import { Alert, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "./Profile";
import HomeScreen from "./HomeScreen";
import AddPost from "./AddPost";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import UserAuthProvider from "../Context";



const Home = () => {
  const Tab = createBottomTabNavigator();
  
  return (
    <>
    <UserAuthProvider>
    <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#16007A" },
          tabBarHideOnKeyboard: true,
          headerTitleStyle: { fontSize: 18, color: "white" },
        }}
      >
        <Tab.Screen
          name="homeScreen"
          component={HomeScreen}
          options={{
            headerTitle: "Cineshare",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color="black"
              />
            ),
            title: "",
            tabBaractiveTintColor: "#5a719e",
          }}
        />
        <Tab.Screen
          name="AddPost"
          component={AddPost}
          options={{
            headerTitle: "Create Post",
            tabBarIcon: ({ focused }) => (
              <AntDesign
                name={focused ? "pluscircle" : "pluscircleo"}
                size={24}
                color="black"
              />
            ),
            title: "",
            tabBarInactiveTintColor: "#5a719e",
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerTitle: "Profile",
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name={focused ? "account-box" : "account-box-outline"}
                size={24}
                color="black"
              />
            ),
            title: "",
            tabBarInactiveTintColor: "#5a719e",
          }}
        />
      </Tab.Navigator>
    </UserAuthProvider>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({});
