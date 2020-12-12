import React from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import colors from "../config/colors";
import Icon from "../components/Icon";
import ListItemSeparator from "../components/ListItemSeparator";

import useAuth from "../auth/useAuth";

const menuItem = [
  {
    title: "My Listings",
    icon: { name: "format-list-bulleted", backgroundColor: colors.primary },
  },
  {
    title: "My Messages",
    icon: { name: "email", backgroundColor: colors.secondary },
    targetScreen: "Messages",
  },
];
function MyAccountScreen({ navigation }) {
  const { user, logout, setUser } = useAuth();

  return (
    <Screen style={styles.background}>
      <View style={styles.profile}>
        <ListItem
          title={user.name}
          subTitle={user.email}
          image={require("../assets/johnWick.png")}
        />
      </View>

      <View style={styles.profile}>
        <FlatList
          data={menuItem}
          keyExtractor={(items) => items.title}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              ImageComponent={
                <Icon
                  name={item.icon.name}
                  size={40}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
        ></FlatList>
      </View>
      <View style={styles.profile}>
        <ListItem
          title="Log Out"
          ImageComponent={
            <Icon name="logout" size={40} backgroundColor={colors.yellow} />
          }
          onPress={() => logout()}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.lightGrey,
  },
  profile: {
    backgroundColor: colors.white,
    marginVertical: 20,
  },
});
export default MyAccountScreen;
