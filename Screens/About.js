import { View, Text } from "react-native";
import React, { useContext } from "react";
import { userAuth } from "../Context";

const About = () => {
  const { user } = useContext(userAuth);
  return (
    <>
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 25, fontWeight: "600" }}>
          Dear {user.displayName},{" "}
        </Text>
        <Text style={{ marginTop: 15, fontSize: 15, fontWeight: "400" }}>
          This app is developed by{" "}
          <Text style={{ fontWeight: "bold" }}>Saurabh Pacharne</Text>.This app
          was made only for learning purpose.If you have any suggesion or
          feedback then share at{" "}
          <Text style={{ fontWeight: "bold" }}>
            saurabhpacharne007@gmail.com .
          </Text>
        </Text>
      </View>
      <View style={{ alignItems: "flex-end", marginRight: 30, marginTop: 15 }}>
        <Text style={{fontSize: 15, fontWeight: "600"}}>Thank You</Text>
      </View>
    </>
  );
};

export default About;
