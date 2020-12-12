import React, { useState } from "react";
import { StyleSheet, Image } from "react-native";
import * as yup from "yup";

import {
  ErrorMessage,
  AppForm,
  AppFormInput,
  SubmitButton,
} from "../components/forms";
import authApi from "../api/auth";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";

const validation = yup.object().shape({
  email: yup.string().required().email().label("Email"),
  password: yup.string().required().min(4).label("Password"),
});

function LoginScreen(props) {
  const { login } = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);

    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);
    login(result.data);
  };
  return (
    <Screen style={styles.screen}>
      <Image style={styles.logo} source={require("../assets/logo-red.png")} />
      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validation}
      >
        <ErrorMessage
          errors="Invalid Email or Password!"
          visible={loginFailed}
        />
        <AppFormInput
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          name="email"
          errorName="Email"
          keyboardType="email-address"
          placeholder="Email"
          textContentType="emailAddress"
        />

        <AppFormInput
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          errorName="Password"
          placeholder="Password"
          secureTextEntry
        />

        <SubmitButton title="LOGIN" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 50,
  },
  screen: { padding: 10 },
});
export default LoginScreen;
