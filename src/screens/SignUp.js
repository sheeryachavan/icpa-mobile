import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, Dimensions, KeyboardAvoidingView} from 'react-native';
import {Block, Text} from 'galio-framework';
import {indianAirlines, _role, posts,designations,emailRegex,phoneRegex} from '../_const/const'
import {Button, Input} from '../components';
import {icpaTheme} from '../constants';
import {ScrollView} from 'react-native-gesture-handler';
import {showTopErrorMessage} from '../_utils/helper';
import {registerUser} from '../redux/slices/Login'
const {width, height} = Dimensions.get('screen');

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';


let region_props = [
  {label: 'East', value: 0, key:'east'},
  {label: 'West', value: 1, key:'west'},
  {label: 'North', value: 2, key:'north'},
  {label: 'South', value: 3, key:'south'},
];
let gender_props = [
  {label: 'Male', value: 0,key:'east'},
  {label: 'Female', value: 1,key:'east'},
  {label: 'Others', value: 2},
];



export function SignUp({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [region, setRegion] = useState(0);
  const [dob, setDob] = useState();
  const [gender, setgender] = useState(0);
  const [role, setRole] = useState(0);
  const [airline, setAirlines] = useState(0);
  const [post, setPost] = useState(0);
  const [designation, setDesignation] = useState(0);
  const dispatch = useDispatch();

  const handleChange = (date) => {
    setDob(date);
  };
  const handleSubmit = () => {
    if (firstName === '') {
      showTopErrorMessage('First Name is required', 'danger');
    } else if (lastName === '') {
      showTopErrorMessage('Last Name is required', 'danger');
    } else if (email === '') {
      showTopErrorMessage('Email is required', 'danger');
    } else if (!emailRegex.test(email)) {
      showTopErrorMessage('Email is not valid', 'danger');
    } else if (password === '') {
      showTopErrorMessage('Password is required', 'danger');
    } else if (password.length < 8) {
      showTopErrorMessage('Password should be more than 8 characters', 'danger');
    } else if (contact === '') {
      showTopErrorMessage('Contact is required', 'danger');
    } else if (!phoneRegex.test(contact)) {
      showTopErrorMessage('contact no is not valid', 'danger');
    } else if (!dob) {
      showTopErrorMessage('Dob is required', 'danger');

    } else {

      let newAirline =  indianAirlines[airline].key;
      let obj = {
        email,
        password,
        contact,
        firstName,
        lastName,
        region: region_props[region].key,
        dob,
        role: newAirline !== 'airindia' ? 'externalPilot' : _role[role].key,
        airline: newAirline,
        gender: gender_props[gender].key,
        designation: designations[designation].key,
        post: posts[post].key,
      };
      dispatch(
        registerUser(obj, (error, message) => {
          if (error) {
            showTopErrorMessage(message || 'Something went wrong', 'danger');
          } else {
            showTopErrorMessage('Success! Proceed to Login', 'success');
          }
        }),
      );
    }
  };
  return (
    <Block flex center>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
        <ScrollView style={styles.signUpContainer}>
          <Block width={width * 0.8}>
            <Input
              borderless
              placeholder="First Name"
              onChangeText={(text) => {
                setFirstName(text);
              }}
            />
          </Block>
          <Block width={width * 0.8}>
            <Input
              borderless
              placeholder="Last Name"
              onChangeText={(text) => {
                setLastName(text);
              }}
            />
          </Block>
          <Block width={width * 0.8}>
            <Input
              borderless
              placeholder="Email"
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
          </Block>
          <Block width={width * 0.8}>
            <Input
              password
              borderless
              placeholder="Password"
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
          </Block>
          <Block width={width * 0.8}>
            <Input
              borderless
              placeholder="Contact"
              onChangeText={(text) => {
                setContact(text);
              }}
            />
          </Block>
          <Block width={width * 0.8}>
            <Input
              date
              dateValue={dob}
              onChangeText={(text) => {
                setDob(text);
              }}
            />
          </Block>
          <Block width={width * 0.8}>
            <Block style={[styles.shadow, styles.input, {marginTop: 15}]}>
              <Text
                style={{paddingBottom: 5, color: icpaTheme.COLORS.PLACEHOLDER}}>
                Select Region
              </Text>
              <RadioForm formHorizontal={true} animation={true}>
                {region_props.map((obj, i) => (
                  <RadioButton labelHorizontal={true} key={i}>
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={region === i}
                      onPress={(value) => {
                       setRegion(value);
                      }}
                      borderWidth={1}
                      buttonInnerColor={icpaTheme.COLORS.PRIMARY}
                      buttonOuterColor={
                        region === i
                          ? icpaTheme.COLORS.PRIMARY
                          : icpaTheme.COLORS.INPUT
                      }
                      buttonSize={20}
                      buttonOuterSize={20}
                      buttonStyle={{}}
                      buttonWrapStyle={[i !== 0 && {marginLeft: 10}]}
                    />
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      labelHorizontal={true}
                      onPress={(value) => {
                        setRegion(value);
                      }}
                      labelStyle={{
                        fontSize: 10,
                        color: icpaTheme.COLORS.PRIMARY,
                      }}
                      labelWrapStyle={{}}
                    />
                  </RadioButton>
                ))}
              </RadioForm>
            </Block>
          </Block>
          <Block width={width * 0.8}>
            <Block style={[styles.shadow, styles.input, {marginTop: 15}]}>
              <Text
                style={{paddingBottom: 5, color: icpaTheme.COLORS.PLACEHOLDER}}>
                Select Gender
              </Text>
              <RadioForm formHorizontal={true} animation={true}>
                {gender_props.map((obj, i) => (
                  <RadioButton labelHorizontal={true} key={i}>
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={gender === i}
                      onPress={(value) => {
                        setgender(value);
                      }}
                      borderWidth={1}
                      buttonInnerColor={icpaTheme.COLORS.PRIMARY}
                      buttonOuterColor={
                      gender === i
                          ? icpaTheme.COLORS.PRIMARY
                          : icpaTheme.COLORS.INPUT
                      }
                      buttonSize={20}
                      buttonOuterSize={20}
                      buttonStyle={{}}
                      buttonWrapStyle={[i !== 0 && {marginLeft: 10}]}
                    />
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      labelHorizontal={true}
                      onPress={(value) => {
                        setgender(value);
                      }}
                      labelStyle={{
                        fontSize: 10,
                        color: icpaTheme.COLORS.PRIMARY,
                      }}
                      labelWrapStyle={{}}
                    />
                  </RadioButton>
                ))}
              </RadioForm>
            </Block>
          </Block>
          <Block width={width * 0.8}>
            <Block style={[styles.shadow, styles.input, {marginTop: 15}]}>
              <Text
                style={{paddingBottom: 5, color: icpaTheme.COLORS.PLACEHOLDER}}>
                Select Airline
              </Text>
              <RadioForm animation={true}>
                {indianAirlines.map((obj, i) => (
                  <RadioButton labelHorizontal={true} key={i}>
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={airline === i}
                      onPress={(value) => {
                        setAirlines(value);
                      }}
                      borderWidth={1}
                      buttonInnerColor={icpaTheme.COLORS.PRIMARY}
                      buttonOuterColor={
                        airline === i
                          ? icpaTheme.COLORS.PRIMARY
                          : icpaTheme.COLORS.INPUT
                      }
                      buttonSize={20}
                      buttonOuterSize={20}
                      buttonStyle={{}}
                    />
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      labelHorizontal={true}
                      onPress={(value) => {
                        setAirlines(value);
                      }}
                      labelStyle={{
                        fontSize: 10,
                        color: icpaTheme.COLORS.PRIMARY,
                      }}
                      labelWrapStyle={{}}
                    />
                  </RadioButton>
                ))}
              </RadioForm>
            </Block>
          </Block>
          <Block width={width * 0.8}>
            <Block style={[styles.shadow, styles.input, {marginTop: 15}]}>
              <Text
                style={{paddingBottom: 5, color: icpaTheme.COLORS.PLACEHOLDER}}>
                Select Role
              </Text>
              <RadioForm formHorizontal={true} animation={true}>
                {_role.map((obj, i) => (
                  <RadioButton labelHorizontal={true} key={i}>
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={role === i}
                      onPress={(value) => {
                        setRole(value);
                      }}
                      borderWidth={1}
                      buttonInnerColor={icpaTheme.COLORS.PRIMARY}
                      buttonOuterColor={
                        role === i
                          ? icpaTheme.COLORS.PRIMARY
                          : icpaTheme.COLORS.INPUT
                      }
                      buttonSize={20}
                      buttonOuterSize={20}
                      buttonStyle={{}}
                      buttonWrapStyle={[i !== 0 && {marginLeft: 10}]}
                    />
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      labelHorizontal={true}
                      onPress={(value) => {
                        setRole(value);
                      }}
                      labelStyle={{
                        fontSize: 10,
                        color: icpaTheme.COLORS.PRIMARY,
                      }}
                      labelWrapStyle={{}}
                    />
                  </RadioButton>
                ))}
              </RadioForm>
            </Block>
          </Block>
          <Block width={width * 0.8}>
            <Block style={[styles.shadow, styles.input, {marginTop: 15}]}>
              <Text
                style={{paddingBottom: 5, color: icpaTheme.COLORS.PLACEHOLDER}}>
                Select Post
              </Text>
              <RadioForm formHorizontal={true}  animation={true}>
                {posts.map((obj, i) => (
                  <RadioButton labelHorizontal={true} key={i}>
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={post === i}
                      onPress={(value) => {
                        setPost(value);
                      }}
                      borderWidth={1}
                      buttonInnerColor={icpaTheme.COLORS.PRIMARY}
                      buttonOuterColor={
                        post === i
                          ? icpaTheme.COLORS.PRIMARY
                          : icpaTheme.COLORS.INPUT
                      }
                      buttonSize={20}
                      buttonOuterSize={20}
                      buttonStyle={{}}
                      buttonWrapStyle={[i !== 0 && {marginLeft: 10}]}
                    />
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      labelHorizontal={true}
                      onPress={(value) => {
                        setPost(value);
                      }}
                      labelStyle={{
                        fontSize: 10,
                        color: icpaTheme.COLORS.PRIMARY,
                      }}
                      labelWrapStyle={{}}
                    />
                  </RadioButton>
                ))}
              </RadioForm>
            </Block>
          </Block>
          <Block width={width * 0.8}>
            <Block style={[styles.shadow, styles.input, {marginTop: 15}]}>
              <Text
                style={{paddingBottom: 5, color: icpaTheme.COLORS.PLACEHOLDER}}>
                Select Designation
              </Text>
              <RadioForm formHorizontal={false}  animation={true}>
                {designations.map((obj, i) => (
                  <RadioButton labelHorizontal={true} key={i}>
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={designation === i}
                      onPress={(value) => {
                        setDesignation(value);
                      }}
                      borderWidth={1}
                      buttonInnerColor={icpaTheme.COLORS.PRIMARY}
                      buttonOuterColor={
                        designation === i
                          ? icpaTheme.COLORS.PRIMARY
                          : icpaTheme.COLORS.INPUT
                      }
                      buttonSize={20}
                      buttonOuterSize={20}
                      buttonStyle={{}}
                      // buttonWrapStyle={[i !== 0 && {marginLeft: 10}]}
                    />
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      labelHorizontal={true}
                      onPress={(value) => {
                        setDesignation(value);
                      }}
                      labelStyle={{
                        fontSize: 10,
                        color: icpaTheme.COLORS.PRIMARY,
                      }}
                      labelWrapStyle={{}}
                    />
                  </RadioButton>
                ))}
              </RadioForm>
            </Block>
          </Block>
          <Block middle>
            <Button color="primary" style={styles.createButton} onPress={handleSubmit}>
              <Text bold size={14} color={icpaTheme.COLORS.WHITE}>
                Register
              </Text>
            </Button>
          </Block>
        </ScrollView>
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
    marginBottom: 250,
  },
  input: {
    borderRadius: 4,
    borderColor: icpaTheme.COLORS.BORDER,
    minHeight: 44,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    padding: 10,
  },
  shadow: {
    shadowColor: icpaTheme.COLORS.BLACK,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    shadowOpacity: 0.05,
    elevation: 2,
  },
  // signUpContainer: {
  //   paddingVertical: 30,
  // },
});

export default SignUp;
