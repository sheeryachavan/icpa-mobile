import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, Dimensions, KeyboardAvoidingView} from 'react-native';
import {Block, Text} from 'galio-framework';
import {showTopErrorMessage} from '../_utils/helper';
import {Button, Input} from '../components';
import {icpaTheme} from '../constants';
import {emailRegex} from '../_const/const';
import {resetPassword} from '../redux/slices/Login';

const {width, height} = Dimensions.get('screen');

export function ForgotPassword({navigation}) {
  const [email, setEmail] = useState("");
  const [ctaText, setCtaText] = useState('Send Link')
  const [emailError, setEmailError] = useState(false);

  const dispatch = useDispatch();


  const handleSubmit = () => {
    if(ctaText !=='Send Link'){
      return;
    }
    if (email === "") {
      showTopErrorMessage("Email is required", 'danger');
      setEmailError(true);
    } else if (!emailRegex.test(email)) {
      showTopErrorMessage("Email is not valid", 'danger');
      setEmailError(true);
    } else {
      setCtaText('Please wait...')
      setEmailError(false);
      dispatch(
        resetPassword(email, (error, data) => {
          if (error) {
            showTopErrorMessage(data || "Something went wrong", 'danger');
          } else {
            showTopErrorMessage("Password recovery link send to your emailId", 'success');
          }
          setCtaText('Send Link')
        })
      );
    }
  };
  return (
    <Block flex center>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
        <Block width={width * 0.8} style={{marginBottom: 0}}>
          <Input
            error={emailError}
            right
            placeholder="Email"
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
        </Block>
        <Block middle>
          <Button
            color="primary"
            style={styles.createButton}
            onPress={ctaText === 'Sending mail...' ? null : handleSubmit}>
            <Text bold size={14} color={icpaTheme.COLORS.WHITE}>
              {ctaText}
            </Text>
          </Button>
        </Block>
        <Block>
        </Block>
      </KeyboardAvoidingView>
    </Block>
  );
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.78,
    backgroundColor: '#F4F5F7',
    borderRadius: 4,
    shadowColor: icpaTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden',
  },
  socialConnect: {
    backgroundColor: icpaTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#8898AA',
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

export default ForgotPassword;
