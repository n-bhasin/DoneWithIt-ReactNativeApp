import React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { useNetInfo } from "@react-native-community/netinfo";
import colors from "../config/colors";
import AppText from "./AppText";

function OfflineNotice(props) {
  const netInfo = useNetInfo();

  if (netInfo.type !== null && netInfo.isInternetReachable === false) {
    return (
      <View style={styles.container}>
        <AppText style={styles.text}>No Internet Connection</AppText>
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: 50,
    width: "100%",
    position: "absolute",
    top: Constants.statusBarHeight,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  text: { color: colors.white },
});
export default OfflineNotice;
