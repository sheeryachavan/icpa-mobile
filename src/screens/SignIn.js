import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Dimensions, KeyboardAvoidingView } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Block, Text } from "galio-framework";
import { showTopErrorMessage } from "../_utils/helper";
import { Button, Input } from "../components";
import { icpaTheme } from "../constants";
import {
  checkLogin,
  setLoader,
  getProfile,
  checkPaymentStatus,
} from "../redux/slices/Login";
import { emailRegex } from "../_const/const";

const { width, height } = Dimensions.get("screen");

export function SignIn({ navigation }) {
  let [email, setEmail] = useState("");
  const [ctaText, setText] = useState("Login");
  const [emailError, setEmailError] = useState(false);

  let [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const dispatch = useDispatch();

  const state = useSelector((_state) => _state.dataLogin);

  const handleSubmit = async () => {
    dispatch(setLoader(true));
    email = "admin@mailsac.com";
    password = "Admin@123";
    // email = 'kkk@kkk.xom'
    // password = '1234567890'
    // email = 'junaid@local.com'
    // password = '1234567890'
    if (email === "") {
      showTopErrorMessage("Email is required", "danger");
      setEmailError(true);
    } else if (!emailRegex.test(email)) {
      showTopErrorMessage("Email is not valid", "danger");
      setEmailError(true);
    } else if (password === "") {
      showTopErrorMessage("Password is required", "danger");
      setEmailError(false);
      setPasswordError(true);
    } else {
      setPasswordError(false);
      setText("Signing in...");
      dispatch(
        checkLogin(email, password, (error, data) => {
          if (error) {
            showTopErrorMessage(data || "Something went wrong!", "danger");
          } else {
            AsyncStorage.setItem("ICPA_STORAGE_KEY", JSON.stringify(data));
            dispatch(getProfile(data.jwtToken));
            if (
              data.userData &&
              data.userData.role &&
              data.userData.role === "externalPilot"
            ) {
              dispatch(
                checkPaymentStatus(data.jwtToken, (status) => {
                  if (!status) {
                    navigation.navigate("AppPay");
                  } else {
                    navigation.navigate("App", { logout: false });
                  }
                  setText("Login");
                })
              );
            } else {
              navigation.navigate("App", { logout: false });
              setText("Login");
            }
          }
          setText("Login");
        })
      );
    }
  };
  return (
    <Block flex center>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <Block width={width * 0.8} style={{ marginBottom: 0 }}>
          <Input
            error={emailError}
            right
            placeholder="Email"
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
        </Block>
        <Block width={width * 0.8}>
          <Input
            password
            value={password}
            error={passwordError}
            placeholder="Password"
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
        </Block>
        <Block middle>
          <Button
            color="primary"
            style={styles.createButton}
            onPress={ctaText === "Signing in..." ? null : handleSubmit}
          >
            <Text bold size={14} color={icpaTheme.COLORS.WHITE}>
              {ctaText}
            </Text>
          </Button>
        </Block>
      </KeyboardAvoidingView>
    </Block>
  );
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.78,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: icpaTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden",
  },
  socialConnect: {
    backgroundColor: icpaTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA",
  },
  inputIcons: {
    marginRight: 12,
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
  },
});

export default SignIn;
