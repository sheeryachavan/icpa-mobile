import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableOpacity
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Block, Text, theme } from "galio-framework";
import { Button } from "../components";
import { Images, icpaTheme } from "../constants";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ForgotPassword from "./ForgotPassword";
import { getProfile, checkPaymentStatus } from "../redux/slices/Login";
import Verification from "./Verification";
import { useDispatch } from "react-redux";
import Communications from 'react-native-communications';
const { width, height } = Dimensions.get("screen");

function Onboarding(props) {
  const [screen, setState] = useState(0 );
  const [isValidatingUser, setIsValidatingUser] = useState(true);
  const dispatch = useDispatch();
  const {navigation,route} = props;
  const checkLoggedIn = async () => {
    setIsValidatingUser({ isValidatingUser: true });
    let icpaDetails = await AsyncStorage.getItem("ICPA_STORAGE_KEY");
    if (icpaDetails) {
      icpaDetails = JSON.parse(icpaDetails);
      dispatch(
        getProfile(icpaDetails.jwtToken, (error) => {
          if (!error) {
            let data = icpaDetails.userData;
            if(data.userData && data.userData.role && data.userData.role === 'externalPilot') {
              dispatch(
                checkPaymentStatus(data.jwtToken,(status)=>{
                  if(!status){
                    navigation.navigate('AppPay');
                  } else {
                    navigation.navigate('App');
                  }
                })
              );
            } else {
              navigation.navigate('App');
            }
            setIsValidatingUser({ isValidatingUser: false });
          } else {
            setIsValidatingUser({ isValidatingUser: false });
          }
        })
      );
    } else {
      setIsValidatingUser(false);
    }
    setTimeout(() => {
      setIsValidatingUser(false);
    }, 10000);
  };
  useEffect(() => {
    checkLoggedIn();
  },[]);

  const handleTechnicalDifficulties = () => {
    Communications.email(['farmit.team@gmail.com'], null, null, null, null)
  }

  return isValidatingUser && (!route.params || !route.params.logout) ?  (
    <Verification />
  ):(
    <Block flex middle>
      <StatusBar hidden />
      <ImageBackground
        source={Images.RegisterBackground}
        style={{ width, height, zIndex: 1 }}
      >
        <Block flex middle>
          <Block
            style={{
              ...styles.registerContainer,
              height: height * (screen === 1 ? 0.8 : screen === 2 ? 0.5 : 0.6),
            }}
          >
            <Block flex={0.25} middle style={styles.socialConnect}>
              <Block row style={{ marginTop: theme.SIZES.BASE }}>
                <Button
                  style={
                    screen === 0
                      ? { ...styles.obButtonsActive, marginRight: 30 }
                      : { ...styles.obButtons, marginRight: 30 }
                  }
                  onPress={() => setState(0)}
                >
                  <Block row>
                    <Text
                      style={[
                        styles.obTextButtons,
                        !screen ? styles.active : null,
                      ]}
                    >
                      Login
                    </Text>
                  </Block>
                </Button>
                <Button
                  style={
                    screen === 1 ? styles.obButtonsActive : styles.obButtons
                  }
                  onPress={() => setState(1)}
                >
                  <Block row>
                    <Text
                      style={[
                        styles.obTextButtons,
                        screen === 1 ? styles.active : null,
                      ]}
                    >
                      Join ICPA
                    </Text>
                  </Block>
                </Button>
              </Block>
            </Block>
            <Block flex style={{ paddingTop: 15 }}>
              {screen === 1 && <SignUp navigation={navigation} />}
              {screen === 0 && <SignIn navigation={navigation} />}
              {screen === 2 && <ForgotPassword navigation={navigation} />}
            </Block>
            {screen === 0 && (
              <TouchableOpacity onPress={() => setState(2)}>
                <Text
                  bold
                  size={14}
                  style={{ textAlign: "center", padding: 20 }}
                  color={icpaTheme.COLORS.PLACEHOLDER}
                >
                  {"Forgot password?"}
                </Text>
              </TouchableOpacity>
            )}
          </Block>
        </Block>
        <TouchableOpacity style = {styles.tc} onPress={handleTechnicalDifficulties}>
          <Text bold color = {icpaTheme.COLORS.PRIMARY}>For technical difficulties</Text>
        </TouchableOpacity>
      </ImageBackground>
    </Block>
  ) 
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.8,
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
    backgroundColor: icpaTheme.COLORS.SWITCH_OFF,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA",
    maxHeight: 80,
    paddingBottom: 15,
  },
  obButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: icpaTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  obButtonsActive: {
    width: 120,
    height: 40,
    backgroundColor: icpaTheme.COLORS.PRIMARY,
    shadowColor: icpaTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  obTextButtons: {
    color: icpaTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14,
  },
  active: {
    backgroundColor: icpaTheme.COLORS.PRIMARY,
    color: "#fff",
    fontWeight: "800",
    fontSize: 14,
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
  tc:{
    justifyContent: 'center', 
    alignItems: 'center',
    paddingTop:10,
    paddingBottom :40,
    backgroundColor:icpaTheme.COLORS.WHITE  
  }
});

export default Onboarding;
