import React, { useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { StyleSheet, Text, View } from "react-native";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { NavigationEvents } from "react-navigation";

const SigninScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <AuthForm
        header="Sign in for Tracker"
        errorMessage={state.errorMessage}
        onSubmit={({ email, password }) => signin({ email, password })}
        submitButtonTitle="Sign in"
      />
      <NavLink text="Don't have an account? Sign up." routeName="Signup" />
    </View>
  );
};

export default SigninScreen;
SigninScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 250,
  },
});
