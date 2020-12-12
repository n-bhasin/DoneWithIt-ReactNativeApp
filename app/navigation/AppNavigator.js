import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

import AccountNavigator from "./AccountNavigator";
import expoPushToken from "../api/expoPushToken";
import ListEditingScreen from "../screen/ListEditingScreen";
import FeedNavigator from "./FeedNavigator";
import NewListingButton from "./NewListingButton";
import routes from "../navigation/routes";

const Tab = createBottomTabNavigator();
const AppNavigator = () => {
  useEffect(() => {
    registerForPushNotification();
  }, []);
  const registerForPushNotification = async () => {
    try {
      const permissions = await Permissions.askAsync(Permissions.NOTIFICATIONS);

      if (!permissions.granted) return;

      const token = await Notifications.getExpoPushTokenAsync();
      console.log("token", token);
      expoPushToken.register(token);
    } catch (error) {
      console.log("Error getting notification token", error);
    }
  };
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ListEditing"
        component={ListEditingScreen}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <NewListingButton
              onPress={() => navigation.navigate(routes.LIST_EDITING)}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
