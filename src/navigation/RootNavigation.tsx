import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/home/Home";
import type { HomeStackParams } from "../types";

const Stack = createNativeStackNavigator<HomeStackParams>();

export default function RootNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Hacker News",
        }}
      />
    </Stack.Navigator>
  );
}
