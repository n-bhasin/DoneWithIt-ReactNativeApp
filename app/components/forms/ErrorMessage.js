import React from "react";
import { StyleSheet } from "react-native";
import AppText from "../AppText";

function ErrorMessage({ errors, visible }) {
  if (!visible || !errors) return null;
  return <AppText style={styles.error}>{errors}</AppText>;
}

const styles = StyleSheet.create({
  error: { color: "red" },
});
export default ErrorMessage;
