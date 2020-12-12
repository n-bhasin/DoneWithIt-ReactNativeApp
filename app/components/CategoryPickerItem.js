import React from "react";
import { StyleSheet, View } from "react-native";

import Icon from "./Icon";
import AppText from "../components/AppText";
import { TouchableOpacity } from "react-native-gesture-handler";
function CategoryPickerItem({ name, item, onPress }) {
  console.log("items", item.label);
  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Icon
          name={item.icon}
          backgroundColor={item.backgroundColor}
          size={80}
        ></Icon>
        <AppText style={styles.labels}>{item.label}</AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: "center",
  },
  labels: { marginTop: 5, textAlign: "center", fontSize: 17 },
});
export default CategoryPickerItem;
