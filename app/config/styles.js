import React from "react";
import colors from "./colors";
export default {
  colors,
  textInput: {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    // color: colors.mediumGrey,
  },
};
