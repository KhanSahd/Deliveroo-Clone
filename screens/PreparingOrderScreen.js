import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import * as Animitable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);
  }, []);

  return (
    <SafeAreaView className="bg-[#00CCBB] flex-1 justify-center items-center">
      <Animitable.Image
        source={require("../assets/orderloading.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-96"
      />

      <Animitable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-white text-lg font-bold text-center my-10"
      >
        Waiting for restaurant to accept your order
      </Animitable.Text>

      <Progress.Circle size={60} indeterminate={true} color="white" />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
