import React from "react";
import { Image, Text, Platform } from "react-native";
import { connect } from "react-redux";
import { AsyncStorage } from "react-native";
import { Block, GalioProvider } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import firebase from "react-native-firebase";
import { sendRegistrationToken } from "./src/_utils/api";

enableScreens();

import Screens from "./src/navigation/Screens";
import { Images, icpaTheme } from "./src/constants";

// cache app images
const assetImages = [
  Images.Onboarding,
  Images.LogoOnboarding,
  Images.Logo,
  Images.iOSLogo,
  Images.androidLogo,
];

// cache product images

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    }
  });
}

class App extends React.Component {
  state = {
    isLoadingComplete: false,
    registration_token: "",
    sendToken: false,
  };

  getToken = async () => {
    if(Platform.OS === 'ios'){
      return;
    }
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem("fcmToken", fcmToken);
        this.sendToken(fcmToken, this.props);
      }
    } else {
      this.sendToken(fcmToken, this.props);
    }
    console.log("fcmToken", fcmToken);
  };

  sendToken = (token, props) => {
    try {
      this.setState({ registration_token: token }, () => {
        const emailId = props.profile ? props.profile.email : "";
        const authToken = props.token.jwtToken;
        if (token && emailId && !this.state.sendToken) {
          sendRegistrationToken(emailId, token, authToken)
            .then((res) => {
              this.setState({ sendToken: true });
            })
            .catch((_error) => {});
        }
      });
    } catch (_error) {
      console.log("sendToken", _error);
    }
  };

  componentWillReceiveProps(nextProps) {
    if(Platform.OS === 'ios'){
      return;
    }
    if (!this.state.sendToken) {
      this.sendToken(this.state.registration_token, nextProps);
    }
  }

  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  };

  requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {
      console.log("permission rejected");
    }
  };

  createNotificationListeners = () => {
    this.onUnsubscribeNotificaitonListener = firebase
      .notifications()
      .onNotification((notification) => {
        firebase.notifications().displayNotification(notification);
      });
  };

  removeNotificationListeners = () => {
    if (Platform.OS === "ios") {
      return;
    }
    this.onUnsubscribeNotificaitonListener();
  };

  componentDidMount() {
    if (Platform.OS === "ios") {
      return;
    }
    // Build a channel
    const channel = new firebase.notifications.Android.Channel(
      "test-channel",
      "Test Channel",
      firebase.notifications.Android.Importance.Max
    ).setDescription("My apps test channel");

    // Create the channel
    firebase.notifications().android.createChannel(channel);
    this.checkPermission();
    this.createNotificationListeners();
  }

  componentWillUnmount() {
    this.removeNotificationListeners();
  }

  render() {
    if (this.state.isLoadingComplete) {
      return <Text>Loading...</Text>;
    } else {
      return (
        <NavigationContainer>
          <GalioProvider theme={icpaTheme}>
            <Block flex>
              <Screens />
            </Block>
          </GalioProvider>
        </NavigationContainer>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([...cacheImages(assetImages)]);
  };

  _handleLoadingError = (error) => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const mapStateToProps = function (state) {
  return state.dataLogin;
};
export default connect(mapStateToProps)(App);
