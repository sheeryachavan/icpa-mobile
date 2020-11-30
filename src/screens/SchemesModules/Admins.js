import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, Dimensions, KeyboardAvoidingView} from 'react-native';
import {Block, Text} from 'galio-framework';
import {_role} from '../../_const/const';
import {Button, Input} from '../../components';
import {icpaTheme} from '../../constants';
import {ScrollView} from 'react-native-gesture-handler';
import {showTopErrorMessage} from '../../_utils/helper';
import {raiseScheme} from '../../redux/slices/Schemes.js';

import DocumentPicker from "react-native-document-picker";
import UploadStatus from "./Upload";
import {BASE_URL} from '../../_utils/api';
import axios from 'axios';

const {width, height} = Dimensions.get('screen');

export function Adm({navigation}) {
  const state = useSelector((_state) => _state.dataLogin);

  const [email] = useState(state.profile.email);
  const [firstName, setFirstName] = useState(state.profile.firstName);
  const [lastName, setLastName] = useState(state.profile.lastName);

  const [base, setBase] = useState('');
  const [employeeNo, setEmployeeNo] = useState('');
  const [ctaText, setCtaText] = useState('Submit');

  
  const [one, setOne] = useState(1);
  const [two, setTwo] = useState(1);
  const [three, setThree] = useState(1);
  const [four, setFour] = useState(1);
  const [five, setFive] = useState(1);
  const [six, setSix] = useState(1);
  const [seven, setSeven] = useState(1);
  const [eight, setEight] = useState(1);
  const [singleFile, setSingleFile] = useState(null);
  const [docs, addToDocs] = useState([]);
  
  const dispatch = useDispatch();
  const user = {
    firstName:state.details.firstName,
    lastName:state.details.lastName
  }
  let handleUpload = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      setSingleFile(res);
    } catch (err) {
      setSingleFile(null);
      if (DocumentPicker.isCancel(err)) {
        alert("File select cancelled");
      } else {
        alert("Unknown Error: " + JSON.stringify(err));
        throw err;
      }
    }
  };

  const handleSubmit = () => {
    if (ctaText !== 'Submit') {
      return;
    }
    if (firstName === '') {
      showTopErrorMessage('First Name is required', 'danger');
    } else if (lastName === '') {
      showTopErrorMessage('Last Name is required', 'danger');
    } else if (base === '') {
      showTopErrorMessage('Base is required', 'danger');
    } else if (employeeNo === '') {
      showTopErrorMessage('Employee No is required', 'danger');
    } else if (!docs.length ) {
      showTopErrorMessage("Please attach docs", 'error');
    } else {
      setCtaText('Submitting...');

      let token = state.token.jwtToken;
      let obj = {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        email: email || undefined,
        base: base || undefined,
        empNo: employeeNo || undefined,
        docs,
        formType: 'adminstrator',
      };
      dispatch(
        raiseScheme(obj, token, 4, (error, message) => {
          if (error) {
            showTopErrorMessage(message || 'Something went wrong', 'danger');
            addToDocs([])
          } else {
            showTopErrorMessage('Submitted', 'success');
            addToDocs([])
          }
          setCtaText('Submit');
        }),
      );
    }
  };

  // uploads
  const URL = `${BASE_URL}/doc/upload`;
  const handleUploadDiagnosis = async (e) => {
    try {
      await handleUpload();
      if (singleFile != null) {   
        setOne(2);
        let formData = new FormData();
        formData.append("fileField", singleFile);
        let token = state.token.jwtToken;
        let title = `Copy of Diagnosis-${user.firstName}_${user.lastName}`;
        formData.append("title", title);
        formData.append("fileDescription", "");
        const headers = {
          "Content-Type": "multipart/form-data; ",
          Authorization: token,
        };
        let res = await axios.post(URL, formData, { headers });
        if (res.data.ok) {
          docs.push(res.data.result._id);
          showTopErrorMessage("Uploaded successfully", "success");
          setOne(4);
          setSingleFile(null)
        } else {
          setOne(3);
        }
      } else {
        alert("Retry");
        setOne(1);
      }
    } catch (e) {
      showTopErrorMessage("Error while uploading", "error");
      setOne(3);
    }
    setTimeout(() => {
      setOne(1);
    }, 10000);
  };
  const handleUploadHosp = async (e) => {
    let title = `Copy of surgery / hospitalization summary-${user.firstName}_${user.lastName}`;
    try {
      await handleUpload();
      setTwo(2);
      if (singleFile != null) {
        const formData = new FormData();
        formData.append("fileField", singleFile);
        let token = state.token.jwtToken;
        formData.append("title", title);
        formData.append("fileDescription", "");
        const headers = {
          "Content-Type": "multipart/form-data; ",
          Authorization: token,
        };
        let res = await axios.post(URL, formData, { headers });
        if (res.data.ok) {
          docs.push(res.data.result._id);
          showTopErrorMessage("Uploaded successfully", "success");
          setTwo(4);
          setSingleFile(null)
        }
      } else {
        alert("Retry");
        setTwo(1);
      }
    } catch (e) {
      showTopErrorMessage("Error while uploading", "error");
      setTwo(3);
    }
    setTimeout(() => {
      setTwo(1);
    }, 10000);
  };
  const handleUploadMedCertNACIL = async () => {
    let title = `Copy of Medical certificate by Air India –I-${user.firstName}_${user.lastName}`;
    try {
      await handleUpload();
      setThree(2);
      if (singleFile != null) {
        const formData = new FormData();
        formData.append("fileField", singleFile);
        let token = state.token.jwtToken;
        formData.append("title", title);
        formData.append("fileDescription", "");
        const headers = {
          "Content-Type": "multipart/form-data; ",
          Authorization: token,
        };
        let res = await axios.post(URL, formData, { headers });
        if (res.data.ok) {
          docs.push(res.data.result._id);
          showTopErrorMessage("Uploaded successfully", "success");
          setThree(4);
          setSingleFile(null)
        }
      } else {
        alert("Retry");
        setThree(1);
      }
    } catch (e) {
      showTopErrorMessage("Error while uploading", "error");
      setThree(3);
    }
    setTimeout(() => {
      setThree(1);
    }, 10000);
  };
  const handleUploadMedCertDoc = async (e) => {
    let title = `Copy of Medical certificate by Hospital/Doctor/Consultant-${user.firstName}_${user.lastName}`;
    try {
      await handleUpload();
      setFour(2);
      if (singleFile != null) {
        const formData = new FormData();
        formData.append("fileField", singleFile);
        let token = state.token.jwtToken;
        formData.append("title", title);
        formData.append("fileDescription", "");
        const headers = {
          "Content-Type": "multipart/form-data; ",
          Authorization: token,
        };
        let res = await axios.post(URL, formData, { headers });
        if (res.data.ok) {
          docs.push(res.data.result._id);
          showTopErrorMessage("Uploaded successfully", "success");
          setFour(4);
          setSingleFile(null)
        }
      } else {
        alert("Retry");
        setFour(1);
      }
    } catch (e) {
      showTopErrorMessage("Error while uploading", "error");
      setFour(3);
    }
    setTimeout(() => {
      setFour(1);
    }, 10000);
  };
  const handleUploadFitCertNACIL = async (e) => {
    let title = `Copy of Fitness certificate by Air India-I-${user.firstName}_${user.lastName}`;
    try {
      await handleUpload();
      setFive(2);
      if (singleFile != null) {
        const formData = new FormData();
        formData.append("fileField", singleFile);
        let token = state.token.jwtToken;
        formData.append("title", title);
        formData.append("fileDescription", "");
        const headers = {
          "Content-Type": "multipart/form-data; ",
          Authorization: token,
        };
        let res = await axios.post(URL, formData, { headers });
        if (res.data.ok) {
          docs.push(res.data.result._id);
          showTopErrorMessage("Uploaded successfully", "success");
          setFive(4);
          setSingleFile(null)
        }
      } else {
        alert("Retry");
        setFive(1);
      }
    } catch (e) {
      showTopErrorMessage("Error while uploading", "error");
      setFive(3);
    }
    setTimeout(() => {
      setFive(1);
    }, 10000);
  };
  const handleUploadFitCertDoc = async (e) => {
    let title = `Copy of Fitness certificate by Hospital/Doctor/Consultant-${user.firstName}_${user.lastName}`;
    try {
      await handleUpload();
      setSix(2);
      if (singleFile != null) {
        const formData = new FormData();
        formData.append("fileField", singleFile);
        let token = state.token.jwtToken;
        formData.append("title", title);
        formData.append("fileDescription", "");
        const headers = {
          "Content-Type": "multipart/form-data; ",
          Authorization: token,
        };
        let res = await axios.post(URL, formData, { headers });
        if (res.data.ok) {
          docs.push(res.data.result._id);
          showTopErrorMessage("Uploaded successfully", "success");
          setSix(4);
          setSingleFile(null)
        }
      } else {
        alert("Retry");
        setSix(1);
      }
    } catch (e) {
      showTopErrorMessage("Error while uploading", "error");
      setSix(3);
    }
    setTimeout(() => {
      setSix(1);
    }, 10000);
  };
  const handleUploadLeaveCard = async (e) => {
    let title = `Copy of Leave Card reflecting SL-${user.firstName}_${user.lastName}`;
    try {
      await handleUpload();
      setSeven(2);
      if (singleFile != null) {
        const formData = new FormData();
        formData.append("fileField", singleFile);
        let token = state.token.jwtToken;
        formData.append("title", title);
        formData.append("fileDescription", "");
        const headers = {
          "Content-Type": "multipart/form-data; ",
          Authorization: token,
        };
        let res = await axios.post(URL, formData, { headers });
        if (res.data.ok) {
          docs.push(res.data.result._id);
          showTopErrorMessage("Uploaded successfully", "success");
          setSeven(4);
          setSingleFile(null)
        }
      } else {
        alert("Retry");
        setSeven(1);
      }
    } catch (e) {
      showTopErrorMessage("Error while uploading", "error");
      setSeven(3);
    }
    setTimeout(() => {
      setSeven(1);
    }, 10000);
  };
  const handleUploadUnfitCert = async (e) => {
    let title = `Copy of CA 35 / Unfitness Certificate-${user.firstName}_${user.lastName}`;
    try {
      await handleUpload();
      setEight(2);
      if (singleFile != null) {
        const formData = new FormData();
        formData.append("fileField", singleFile);
        let token = state.token.jwtToken;
        formData.append("title", title);
        formData.append("fileDescription", "");
        const headers = {
          "Content-Type": "multipart/form-data; ",
          Authorization: token,
        };
        let res = await axios.post(URL, formData, { headers });
        if (res.data.ok) {
          docs.push(res.data.result._id);
          showTopErrorMessage("Uploaded successfully", "success");
          setEight(4);
          setSingleFile(null)
        }
      } else {
        alert("Retry");
        setEight(1);
      }
    } catch (e) {
      showTopErrorMessage("Error while uploading", "error");
      setEight(3);
    }
    setTimeout(() => {
      setEight(1);
    }, 10000);
  };
  //End
  return (
    <Block flex center>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
        <ScrollView
          style={styles.signUpContainer}
          contentContainerStyle={{alignItems: 'center'}}>
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
              value={base}
              placeholder="Base"
              onChangeText={(text) => {
                setBase(text);
              }}
            />
          </Block>
          <Block width={width * 0.8}>
            <Input
              borderless
              type="numeric"
              value={employeeNo}
              placeholder="Employee no"
              onChangeText={(text) => {
                setEmployeeNo(text);
              }}
            />
          </Block>
          <Block width={width * 0.8}>
            <UploadStatus
              status={one}
              onChange={handleUploadDiagnosis}
              label="Copy of Diagnosis"
            />
            <UploadStatus
              status={two}
              onChange={handleUploadHosp}
              label="Copy of surgery / hospitalization summary"
            />
            <UploadStatus
              status={three}
              onChange={handleUploadMedCertNACIL}
              label="Copy of Medical certificate by Air India –I"
            />
            <UploadStatus
              status={four}
              onChange={handleUploadFitCertNACIL}
              label="Copy of Fitness certificate by Air India -I"
            />
            <UploadStatus
              status={five}
              onChange={handleUploadMedCertDoc}
              label="Copy of Medical certificate by Hospital/Doctor/Consultant"
            />
            <UploadStatus
              status={six}
              onChange={handleUploadFitCertDoc}
              label="Copy of Fitness certificate by Hospital/Doctor/Consultant"
            />
            <UploadStatus
              status={seven}
              onChange={handleUploadLeaveCard}
              label="Copy of Leave Card reflecting SL"
            />
            <UploadStatus
              status={eight}
              onChange={handleUploadUnfitCert}
              label="Copy of CA 35 / Unfitness Certificate"
            />
          </Block>
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
    width: width,
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

export default Adm;
