import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Block, Text} from 'galio-framework';
import {
  indianAirlines,
  _role,
  posts,
  designations,
  phoneRegex,
} from '../_const/const';
import {Button, Input} from '../components';
import {icpaTheme} from '../constants';
import {ScrollView} from 'react-native-gesture-handler';
import {showTopErrorMessage} from '../_utils/helper';
import {updateUser, getProfile} from '../redux/slices/Login';
import Modal from 'react-native-modal';
import {cityState} from '../_const/cityState';
const {width, height} = Dimensions.get('screen');

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

let region_props = [
  {label: 'East', value: 0, key: 'east'},
  {label: 'West', value: 1, key: 'west'},
  {label: 'North', value: 2, key: 'north'},
  {label: 'South', value: 3, key: 'south'},
];
let _region = {
  east: 0,
  west: 1,
  north: 2,
  south: 3,
};
let gender_props = [
  {label: 'Male', value: 0, key: 'male'},
  {label: 'Female', value: 1, key: 'female'},
  {label: 'Others', value: 2, key: 'others'},
];
let _gender = {
  male: 0,
  female: 1,
  others: 2,
};
let __role = {
  admin: 0,
  manager: 1,
  pilot: 2,
};

let __airlines = {
  AIRINDIA: 0,
  VISTARA: 1,
  IFLY: 2,
  GOAIR: 3,
  EXPRESSINDIA: 4,
  SPICEJET: 5,
  REDKNIGHT: 6,
};
let _post = {
  p1: 0,
  p2: 1,
};
let _postValue = ['p1','p2']
let _designationValue = ['Captain','Comander','First Officer']

let _designation = {
  captain: 0,
  Captain: 0,
  commander: 1,
  Commander: 1,
  firstOfficer: 2,
};
export function EditFormComponent({navigation}) {
  const state = useSelector((_state) => _state.dataLogin);

  const [cityStateList, setCityStateList] = useState(cityState);
  const [cityList, setCityList] = useState(cityState[0].districts);

  const [email] = useState(state.profile.email);
  const [contact, setContact] = useState(state.profile.contact);
  const [firstName, setFirstName] = useState(state.profile.firstName);
  const [lastName, setLastName] = useState(state.profile.lastName);
  // const [region, setRegion] = useState(_region[state.profile.region])
  const [dob, setDob] = useState(state.profile.dob);
  const [gender, setgender] = useState(_gender[state.profile.gender]);
  // const [role, setRole] = useState(__role[state.profile.role]);
  // const [airline, setAirlines] = useState(__airlines[state.profile.airline]);
  const [_state, setState] = useState(state.profile.state || '');
  const [city, setCity] = useState(state.profile.city || '');
  const [post, setPost] = useState(_post[state.profile.post]);
  const [address, setAddress] = useState(state.profile.address);
  const [pincode, setPincode] = useState(state.profile.pincode + '');
  const [designation, setDesignation] = useState(
    _designation[state.profile.designation],
  );
  const [nomineeOne, setNomineeOne] = useState(state.profile.nomineeOne);
  const [nomineeOnePercent, setNomineeOnePercent] = useState(
    state.profile.nomineeOnePercent
  );
  const [nomineeTwo, setNomineeTwo] = useState(state.profile.nomineeTwo);
  const [nomineeTwoPercent, setNomineeTwoPercent] = useState(
    state.profile.nomineeTwoPercent
  );
  const [anniversaryDate, setAnniversaryDate] = useState(state.profile.anniversaryDate);

  const [ctaText, setCtaText] = useState('Update');

  const [selectState, setSelectState] = useState(false);
  const [selectCity, setSelectCity] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    let _cityList = cityStateList.filter((item) => {
      return item.value === (state.profile.state || 'Andhra Pradesh');
    });
    if (_cityList) {
      setCityList(_cityList[0].districts);
    }
  }, [state.profile.state]);
  const handleSubmit = () => {
    if (ctaText !== 'Update') {
      return;
    }
    if (firstName === '') {
      showTopErrorMessage('First Name is required', 'danger');
    } else if (lastName === '') {
      showTopErrorMessage('Last Name is required', 'danger');
    } else if (contact === '') {
      showTopErrorMessage('Contact is required', 'danger');
    } else if (!phoneRegex.test(contact)) {
      showTopErrorMessage('contact no is not valid', 'danger');
    } else if (!dob) {
      showTopErrorMessage('Dob is required', 'danger');
    } else if (pincode && pincode.length !== 6) {
      showTopErrorMessage('Pincode in not valid', 'danger');
    } else if (nomineeOne && !nomineeOnePercent) {
      cshowTopErrorMessage("Nominee One Percentage is required", 'danger');
    } else if (nomineeTwo && !nomineeTwoPercent) {
      showTopErrorMessage("Nominee Two Percentage is required", 'danger');
    } else {
      setCtaText('Updating...');

      let token = state.token.jwtToken;
      let obj = {
        userId: state.profile._id,
        contact,
        firstName,
        lastName,
        dob,
        gender: gender_props[gender]['key'],
        city,
        address,
        state: _state,
        pincode,
        designation: _designationValue[designation],
        post: _postValue[post],
        nomineeOne,
        nomineeOnePercent: nomineeOnePercent / 100,
        nomineeTwo,
        nomineeTwoPercent: nomineeTwoPercent / 100,
        anniversaryDate
      };
      dispatch(
        updateUser(obj, token, (error, message) => {
          if (error) {
            showTopErrorMessage(message || 'Something went wrong', 'danger');
          } else {
            showTopErrorMessage('Profile Updated', 'success');
            let token = state.token.jwtToken;
            dispatch(getProfile(token));
          }
          setCtaText('Update');
        }),
      );
    }
  };
  const handleState = (state) => {
    setSelectState(false);
    setState(state);
    let _cityList = cityStateList.filter((item) => {
      return item.value === (state || 'Andhra Pradesh');
    });
    if (_cityList) {
      setCityList(_cityList[0].districts);
      setCity(_cityList[0].districts[0]);
    }
  };
  const handleCity = (city) => {
    setSelectCity(false);
    setCity(city);
  };
  return (
    <Block flex center>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
        <ScrollView style={styles.signUpContainer}>
          <Block width={width * 0.8}>
            <Input
              borderless
              value={firstName}
              placeholder="First Name"
              onChangeText={(text) => {
                setFirstName(text);
              }}
            />
          </Block>
          <Block width={width * 0.8}>
            <Input
              borderless
              value={lastName}
              placeholder="Last Name"
              onChangeText={(text) => {
                setLastName(text);
              }}
            />
          </Block>
          <Block width={width * 0.8}>
            <Block style={[styles.input, styles.shadow, {marginVertical: 7}]}>
              <Text color={icpaTheme.COLORS.MUTED}>{state.profile.email}</Text>
            </Block>
          </Block>
          <Block width={width * 0.8}>
            <Input
              borderless
              type="numeric"
              value={contact}
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
          {/* <Block width={width * 0.8}>
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
          </Block> */}
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
          {/* <Block width={width * 0.8}>
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
          </Block> */}
          {/* <Block width={width * 0.8}>
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
          </Block> */}
          <Block width={width * 0.8}>
            <Block style={[styles.shadow, styles.input, {marginTop: 15}]}>
              <Text
                style={{paddingBottom: 5, color: icpaTheme.COLORS.PLACEHOLDER}}>
                Select Post
              </Text>
              <RadioForm formHorizontal={true} animation={true}>
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
              <RadioForm formHorizontal={false} animation={true}>
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
                      buttonWrapStyle={{marginLeft: 0}}
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

          <Block width={width * 0.8} style={{marginTop: 10}}>
            <Input
              borderless
              value={address}
              placeholder={'Address'}
              onChangeText={(text) => {
                setAddress(text);
              }}
            />
          </Block>

          <Block width={width * 0.8}>
            <Input
              borderless
              value={pincode}
              maxLength={6}
              type="numeric"
              placeholder={'Pincode'}
              onChangeText={(text) => {
                setPincode(text);
              }}
            />
          </Block>
          <Block width={width * 0.8} style={{marginTop: 10}}>
            <TouchableOpacity
              style={[styles.input, styles.shadow]}
              onPress={() => setSelectState(true)}>
              <Text>{_state || 'Select State'}</Text>
            </TouchableOpacity>
          </Block>
          <Block width={width * 0.8} style={{marginTop: 10}}>
            <TouchableOpacity
              style={[styles.input, styles.shadow]}
              onPress={() => setSelectCity(true)}>
              <Text>{city || 'Select city'}</Text>
            </TouchableOpacity>
          </Block>
          {/* ***************** */}
          <Block width={width * 0.8}>
            <Input
              borderless
              value={nomineeOne}
              placeholder={'Nominee One'}
              onChangeText={(text) => {
                setNomineeOne(text);
              }}
            />
          </Block>
          <Block width={width * 0.8}>
            <Input
              borderless
              value={nomineeOnePercent}
              type="numeric"
              placeholder={'Nominee One (%)'}
              onChangeText={(text) => {
                setNomineeOnePercent(text);
              }}
            />
            </Block>
            <Block width={width * 0.8}>
            <Input
              borderless
              value={nomineeTwo}
              placeholder={'Nominee Two'}
              onChangeText={(text) => {
                setNomineeTwo(text);
              }}
            />
          </Block>
          <Block width={width * 0.8}>
            <Input
              borderless
              value={nomineeTwoPercent}
              type="numeric"
              placeholder={'Nominee Two (%)'}
              onChangeText={(text) => {
                setNomineeTwoPercent(text);
              }}
            />
          </Block>
          <Block width={width * 0.8} style={{marginTop: 10}}>
            <Text>Wedding Anniversary</Text>
            <Input
              date
              placeholder="Anniversary"
              dateValue={anniversaryDate}
              onChangeText={(text) => {
                setAnniversaryDate(text);
              }}
            />
          </Block>
          {/* ***************** */}

          <Block middle>
            <Button
              color="primary"
              style={styles.createButton}
              onPress={handleSubmit}>
              <Text bold size={14} color={icpaTheme.COLORS.WHITE}>
                {ctaText}
              </Text>
            </Button>
          </Block>
        </ScrollView>
      </KeyboardAvoidingView>
      {/* STATE CITY MODALS */}
      <Modal
        isVisible={selectState}
        onBackdropPress={() => setSelectState(false)}>
        <Block style={styles.listStateCity}>
          <FlatList
            scrollEnabled
            data={cityStateList}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.listStateCityComponent,
                  _state === item.label
                    ? styles.listStateCityComponentActive
                    : null,
                ]}
                onPress={() => handleState(item.label)}>
                <Text color={icpaTheme.COLORS.WHITE}>{item.label}</Text>
              </TouchableOpacity>
            )}></FlatList>
        </Block>
      </Modal>
      <Modal
        isVisible={selectCity}
        onBackdropPress={() => setSelectState(false)}>
        <Block style={styles.listStateCity}>
          <FlatList
            scrollEnabled
            data={cityList}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.listStateCityComponent,
                  city === item ? styles.listStateCityComponentActive : null,
                ]}
                onPress={() => handleCity(item)}>
                <Text color={icpaTheme.COLORS.WHITE}>{item}</Text>
              </TouchableOpacity>
            )}></FlatList>
        </Block>
      </Modal>
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
  signUpContainer: {
    paddingVertical: 30,
  },
  listStateCity: {
    backgroundColor: '#fff',
    width: width * 0.8,
    height: 500,
    alignSelf: 'center',
    padding: 20,
  },
  listStateCityComponent: {
    padding: 5,
    borderRadius: 4,
    backgroundColor: icpaTheme.COLORS.SWITCH_OFF,
    marginBottom: 2,
  },
  listStateCityComponentActive: {
    padding: 5,
    borderRadius: 4,
    backgroundColor: icpaTheme.COLORS.PRIMARY,
    marginBottom: 2,
  },
});

export default EditFormComponent;