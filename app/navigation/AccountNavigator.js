import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MessageScreen from "../components/MessageScreen";
import MyAccountScreen from "../screen/MyAccountScreen";

const Stack = createStackNavigator();
const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Account" component={MyAccountScreen} />
    <Stack.Screen name="Messages" component={MessageScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
