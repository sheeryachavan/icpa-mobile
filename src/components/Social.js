import React, { useState } from "react";
import {
  Linking,
  Platform,
  StyleSheet,
  Dimensions,
  View,
  Image,
} from "react-native";
import {
  FacebookSocialButton,
  InstagramSocialButton,
  TwitterSocialButton,
} from "react-native-social-buttons";
import Modal from "react-native-modal";
import { Button, Block } from "galio-framework";
import { Share } from "../constants/Images";
import { icpaTheme } from "../constants";
const { width, height } = Dimensions.get("screen");

const Social = () => {
  const [showSocials, setState] = useState(false);

  const handleSocial = (social) => {
    switch (social) {
      case "insta":
        Linking.openURL(`https://instagram.com/icpa_india?igshid=vkbwbqwaumd1`);
        break;
      case "facebook":
        Linking.openURL(
          `https://www.facebook.com/Indian-Commercial-Pilots-Association-102201071584655/`
        );
        break;
      case "twitter":
        Linking.openURL(`https://www.twitter.com/pilotsindian`);
        break;
    }
  };

  return (
    <View style={styles.share}>
      <FacebookSocialButton
        onPress={() => {
          handleSocial("facebook");
        }}
        buttonViewStyle={{ marginBottom: 5, justifyContent: "flex-start",backgroundColor:'rgba(9, 138, 240,0.9)' }}
        buttonText={" "}
        textStyle={{ position: "absolute" }}
      />

      <InstagramSocialButton
        onPress={() => {
          handleSocial("insta");
        }}
        buttonText={" "}
        buttonViewStyle={{
          justifyContent: "flex-start",
          backgroundColor: 'rgba(182, 182, 182, 0.5)',
        }}
        textStyle={{ position: "absolute" }}
      />

      <TwitterSocialButton
        onPress={() => {
          handleSocial("twitter");
        }}
        buttonViewStyle={{ justifyContent: "flex-start",backgroundColor:'rgba(113, 201, 248,0.7)' }}
        buttonText={" "}
        textStyle={{ position: "absolute" }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  share: {
    position: "absolute",
    zIndex: 9999,
    width: 50,
    right: 0,
    bottom: 270,
    borderRadius: 5,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    // backgroundColor: "#fff",
    elevation: Platform.OS === "android" ? 50 : 0,
  },
  view: {
    // flex:1,
    width: 40,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    position: "relative",
  },
});
export default Social;
