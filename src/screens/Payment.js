import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Dimensions, Image } from "react-native";
import { Block, Text, Button } from "galio-framework";
import { showTopErrorMessage } from "../_utils/helper";
import { CreditCard } from "../constants/Images";
const { width } = Dimensions.get("screen");
import { payRegistrationFees } from "../redux/slices/Login";

import { icpaTheme } from "../constants";

export default function Payment() {
  const dispatch = useDispatch();
  const state = useSelector((_state) => _state.dataLogin);
  const [ctaText, setCtaText] = useState("Make Payment");

  const handleSubmit = () => {
    let token = state.token.jwtToken;
    setCtaText("Please wait...");
    dispatch(
      payRegistrationFees(token, (error,data) => {
        if(error){
          showTopErrorMessage(data || 'Something went wrong!', 'danger');
        } else {
          showTopErrorMessage(data || 'Please check your Mail or Phone no', 'success'); 
        }
        setCtaText("Make Payment");
      })
    );
  };

  return (
    <Block flex style={styles.home}>
      <Image source={CreditCard} />
      <Block middle center>
        <Text size={16} color={icpaTheme.COLORS.SECONDARY}>Proceed To Enroll</Text>
        <Button
          color="primary"
          style={styles.createButton}
          onPress={ctaText === "Please wait..." ? () => {} : handleSubmit}
        >
          <Text bold size={14} color={icpaTheme.COLORS.WHITE}>
            {ctaText}
          </Text>
        </Button>
        <Text size={12} style={{ marginTop:40,padding:10}} center color={icpaTheme.COLORS.BLACK}>Please close the App and Login again after making the payment</Text>
      </Block>
    </Block>
  );
}
const styles = StyleSheet.create({
  home: {
    padding: 20,
    alignItems: "center",
    minWidth: width * 0.7,
    position: "relative",
  },
  createButton: {
    width: 180,
    height: 50,
    marginTop: 15,
  },
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: "#fff",
  },
});
