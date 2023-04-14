import { Image, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "./Profile";
import HomeScreen from "./HomeScreen";
import AddPost from "./AddPost";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import UserAuthProvider from "../Context";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const Tab = createBottomTabNavigator();
  let navigation = useNavigation()

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
              headerTitle: "",
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  size={24}
                  color="#16007A"
                />
              ),
              title: "",
              tabBaractiveTintColor: "#16007A",
              headerLeft: () => (
                <Image
                  source={require("../assets/iconNav.png")}
                  style={{ width: 140, height: 50 }}
                />
              ),
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
                  color="#16007A"
                />
              ),
              title: "",
              tabBarInactiveTintColor: "#16007A",
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
                  color="#16007A"
                />
              ),
              title: "",
              tabBarInactiveTintColor: "#16007A",
              headerRight: () => (
                <AntDesign
                  name="infocirlceo"
                  size={18}
                  color="white"
                  style={{ marginRight: 18 }}
                  onPress={()=>navigation.navigate("About Us")}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </UserAuthProvider>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({});
