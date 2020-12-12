import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as yup from "yup";

import { AppForm, AppFormInput, SubmitButton } from "../components/forms";
import ActivityIndicator from "../components/ActivityIndicator";
import Screen from "../components/Screen";
import authApi from "../api/auth";
import userApi from "../api/users";
import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";

import ErrorMessage from "../components/forms/ErrorMessage";

const validation = yup.object().shape({
  name: yup.string().required().label("Name"),
  email: yup.string().required().email().label("Email"),
  password: yup.string().required().min(4).label("Password"),
});

function RegisterScreen(props) {
  const registerApi = useApi(userApi.register);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async (userInfo) => {
    const result = await registerApi.request(userInfo);

    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpected error occured!");
        console.log(result);
      }
      return;
    }
    console.log(result.data);
    const { data } = await loginApi.request(userInfo.email, userInfo.password);
    auth.login(data);
  };
  return (
    <>
      <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
      <Screen style={styles.screen}>
        <AppForm
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validation}
        >
          <ErrorMessage error={error} visible={true} />

          <AppFormInput
            autoCapitalize="none"
            autoCorrect={false}
            icon="account"
            name="name"
            errorName="Name"
            placeholder="Name"
            textContentType="username"
          />

          <AppFormInput
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            name="email"
            errorName="Email"
            placeholder="Email"
            keyBoardType="email-address"
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

          <SubmitButton title="REGISTER" />
        </AppForm>
      </Screen>
    </>
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
export default RegisterScreen;
