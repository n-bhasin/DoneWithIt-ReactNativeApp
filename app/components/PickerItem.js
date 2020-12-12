import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import AppText from "./AppText";

function PickerItem({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <AppText style={styles.items}>{item.label}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  items: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
  },
});
export default PickerItem;
