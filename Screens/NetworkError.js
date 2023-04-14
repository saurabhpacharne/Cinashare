import { View, Image } from "react-native";
import React from "react";

const NetworkError = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("../assets/NetworkError.jpg")}
        style={{ width: 300, height: 300 }}
      />
    </View>
  );
};

export default NetworkError;
