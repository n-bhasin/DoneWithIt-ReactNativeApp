import React from "react";

import { StyleSheet, View } from "react-native";
import colors from "../config/colors";
function ListItemSeparator(props) {
  return <View style={styles.separator}></View>;
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: colors.lightGrey,
  },
});
export default ListItemSeparator;
