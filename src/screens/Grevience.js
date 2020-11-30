import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  ImageBackground,
  Modal,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Block, Text, theme } from "galio-framework";
import { Button, Input } from "../components";
import { Images, icpaTheme } from "../constants";
import {
  getGrevienceList,
  addGrevience,
  acknowledged,
} from "../redux/slices/GrevienceSection";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import { showTopErrorMessage } from "../_utils/helper";
import moment from "moment";
const { width, height } = Dimensions.get("screen");

let _severity = [
  { label: "Low", value: 0, key: "low" },
  { label: "Medium", value: 1, key: "medium" },
  { label: "High", value: 2, key: "high" },
  { label: "Urgent", value: 3, key: "urgent" },
];
let _role = [
  // {label: 'All Regions', value: 0, key: 'allRegions'},
  { label: "East", value: 0, key: "east" },
  { label: "West", value: 1, key: "west" },
  { label: "North", value: 2, key: "north" },
  { label: "South", value: 3, key: "south" },
  { label: "Central", value: 4, key: "central" },
];

export function Grevience({ navigation }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState("");
  const [severity, setSeverity] = useState(1);
  const [region, setRegion] = useState([0]);
  const [ctaText, setText] = useState("Submit");
  const [modalVisible, setModalVisible] = useState(false);
  const [currentGrevience, setCurrentGrevience] = useState(-1);
  const [response, setResponse] = useState('')

  const state = useSelector((_state) => _state.dataLogin);
  const gervienceState = useSelector((_state) => _state.dataGrevience);

  const dispatch = useDispatch();

  useEffect(() => {
    getList();
  }, []);

  const getList = (pageNo) => {
    setLoading(true);
    let token = state.token.jwtToken;
    dispatch(
      getGrevienceList(token, pageNo, (error, message) => {
        if (error) {
          showTopErrorMessage(message || "Something went wrong", "danger");
        }
        setLoading(false);
      })
    );
  };

  const handleSubmit = (e) => {
    let regionsTargetted = [];
    if (region.indexOf(-1) > -1) {
      regionsTargetted.push("east", "west", "north", "south");
    }
    if (region.indexOf(0) > -1) {
      regionsTargetted.push("east");
    }
    if (region.indexOf(1) > -1) {
      regionsTargetted.push("west");
    }
    if (region.indexOf(2) > -1) {
      regionsTargetted.push("north");
    }
    if (region.indexOf(3) > -1) {
      regionsTargetted.push("south");
    }
    if (region.indexOf(4) > -1) {
      regionsTargetted.push("central");
    }
    if (subject === "") {
      showTopErrorMessage("Subject is required", "danger");
    } else if (message === "") {
      showTopErrorMessage("Message is required", "danger");
    } else if (regionsTargetted.length === 0) {
      showTopErrorMessage("Please select region", "danger");
    } else {
      setText("Please wait...");
      let token = state.token.jwtToken;
      let obj = {
        subject,
        message,
        severity: _severity[severity].key,
        regionsTargetted,
      };
      dispatch(
        addGrevience(obj, token, (error, message) => {
          if ((error, message)) {
            showTopErrorMessage(message || 'Something went wrong', 'danger');
          } else {
            showTopErrorMessage('Grevience submitted', 'success');
          }
          setText('Submit');
          setSubject('');
          setMessage('');
        }),
      );
    }
  };
  const handleAcknowledge = (id) => {
    let token = state.token.jwtToken;
    dispatch(
      acknowledged(id, {response}, token, (err, msg) => {
        if (err) {
          showTopErrorMessage(msg || "Something went wrong", "danger");
        } else {
          getList();
        }
      })
    );
  };
  let role = state.details.role;
  let id = state.details.id;

  return (
    <Block flex center style={styles.home}>
      <ImageBackground
        source={Images.RegisterBackground}
        style={{ width, height, zIndex: 1 }}
      >
        <Block flex middle>
          <Block
            style={{
              ...styles.registerContainer,
              height:
                role !== "admin" && role !== "manager"
                  ? height * 0.7
                  : height * 0.3,
            }}
          >
            <Block flex={1} middle style={styles.socialConnect}>
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
                enabled
              >
                {role !== "admin" && role !== "manager" ? (
                  <Block>
                    <Block
                      width={width * 0.8}
                      style={{ marginTop: 15, marginBottom: 0 }}
                    >
                      <Input
                        right
                        value={subject}
                        placeholder={"Subject"}
                        onChangeText={(text) => {
                          setSubject(text);
                        }}
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                        value={message}
                        placeholder="Message"
                        onChangeText={(text) => {
                          setMessage(text);
                        }}
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <Block
                        style={[styles.shadow, styles.input, { marginTop: 15 }]}
                      >
                        <Text
                          style={{
                            paddingBottom: 5,
                            color: icpaTheme.COLORS.PLACEHOLDER,
                          }}
                        >
                          Select severity
                        </Text>
                        <RadioForm formHorizontal={true} animation={true}>
                          {_severity.map((obj, i) => (
                            <RadioButton labelHorizontal={true} key={i}>
                              <RadioButtonInput
                                obj={obj}
                                index={i}
                                isSelected={severity === i}
                                onPress={(value) => {
                                  setSeverity(value);
                                }}
                                borderWidth={1}
                                buttonInnerColor={icpaTheme.COLORS.PRIMARY}
                                buttonOuterColor={
                                  severity === i
                                    ? icpaTheme.COLORS.PRIMARY
                                    : icpaTheme.COLORS.INPUT
                                }
                                buttonSize={20}
                                buttonOuterSize={20}
                                buttonWrapStyle={[
                                  i !== 0 && { marginLeft: 10 },
                                ]}
                              />
                              <RadioButtonLabel
                                obj={obj}
                                index={i}
                                labelHorizontal={true}
                                onPress={(value) => {
                                  setSeverity(value);
                                }}
                                labelStyle={{
                                  fontSize: 10,
                                  color: icpaTheme.COLORS.PRIMARY,
                                }}
                              />
                            </RadioButton>
                          ))}
                        </RadioForm>
                      </Block>
                    </Block>
                    <Block
                      style={[styles.shadow, styles.input, { marginTop: 15 }]}
                    >
                      <Text
                        style={{
                          paddingBottom: 5,
                          color: icpaTheme.COLORS.PLACEHOLDER,
                        }}
                      >
                        Select region
                      </Text>
                      <RadioForm formHorizontal={false} animation={true}>
                        {_role.map((obj, i) => (
                          <RadioButton labelHorizontal={true} key={i}>
                            <RadioButtonInput
                              obj={obj}
                              index={i}
                              isSelected={region.indexOf(i) > -1}
                              onPress={(value) => {
                                let index = region.indexOf(value);
                                let _region = [...region];
                                if (index > -1) {
                                  _region.splice(index, 1);
                                } else {
                                  _region.push(value);
                                }
                                setRegion(_region);
                              }}
                              borderWidth={1}
                              buttonInnerColor={icpaTheme.COLORS.PRIMARY}
                              buttonOuterColor={
                                region.indexOf(i) > -1
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
                                let index = region.indexOf(value);
                                let _region = [...region];
                                if (index > -1) {
                                  _region.splice(index, 1);
                                } else {
                                  _region.push(value);
                                }
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
                    <Block middle>
                      <Button
                        color="primary"
                        style={styles.createButton}
                        onPress={
                          ctaText === "Please wait..." ? null : handleSubmit
                        }
                      >
                        <Text bold size={14} color={icpaTheme.COLORS.WHITE}>
                          {ctaText}
                        </Text>
                      </Button>
                    </Block>
                  </Block>
                ) :  <Text style={{paddingTop:20,textAlign: "center"}}>Click button to see list</Text>}

                <Block style={styles.centeredView}>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      setModalVisible(false);
                    }}
                  >
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <TouchableOpacity
                          style={{
                            width: 20,
                            position: "absolute",
                            right: 10,
                            top: 10,
                          }}
                          onPress={() => {
                            setModalVisible(!modalVisible);
                          }}
                        >
                          <Text style={styles.textStyleClose}>x</Text>
                        </TouchableOpacity>
                        {!gervienceState.isLoading ? (
                          gervienceState &&
                          gervienceState.list &&
                          gervienceState.list.length ? (
                            <Block flex row>
                              <FlatList
                                data={gervienceState.list}
                                onRefresh={() => {
                                  getList(1);
                                }}
                                refreshing={false}
                                renderItem={({ item, index }) => (
                                  <Block
                                    card
                                    flex
                                    key={index}
                                    style={styles.card}
                                  >
                                    <TouchableOpacity
                                      onPress={() => {
                                        if (currentGrevience === index) {
                                          setCurrentGrevience(-1);
                                        } else {
                                          setCurrentGrevience(index);
                                        }
                                      }}
                                    >
                                      <Block
                                        flex
                                        space="between"
                                        style={styles.cardDescription}
                                      >
                                        <ImageBackground
                                          source={Images.backgroundShadow}
                                          style={styles.dateContainer}
                                        >
                                          <Block column>
                                            <Text
                                              bold
                                              color={icpaTheme.COLORS.BLACK}
                                              style={{ textAlign: "center" }}
                                              size={16}
                                            >
                                              {moment(item.createdDate).format(
                                                "DD"
                                              )}
                                            </Text>
                                            <Text
                                              bold
                                              color={icpaTheme.COLORS.BLACK}
                                              style={{ textAlign: "center" }}
                                              size={12}
                                            >
                                              {moment(item.createdDate).format(
                                                "MMM"
                                              )}
                                            </Text>
                                            <Text
                                              bold
                                              color={icpaTheme.COLORS.BLACK}
                                              style={{ textAlign: "center" }}
                                              size={12}
                                            >
                                              {moment(item.createdDate).format(
                                                "YYYY"
                                              )}
                                            </Text>
                                          </Block>
                                        </ImageBackground>
                                      </Block>
                                      <Text size={14} style={styles.cardTitle}>
                                        <Text
                                          size={14}
                                          bold
                                          style={styles.cardTitle}
                                        >
                                          Subject:{" "}
                                        </Text>
                                        {item.subject}
                                      </Text>
                                      <Text
                                        size={12}
                                        color={icpaTheme.COLORS.ACTIVE}
                                        bold
                                      >
                                        {item.createdBy.firstName +
                                          " " +
                                          item.createdBy.lastName}
                                      </Text>
                                    
                                      <Text style={styles.modalAcknowledge}>
                                   
                                        <Text
                                          size={14}
                                          bold
                                          style={styles.cardTitle}
                                        >
                                          Status:{" "}
                                        </Text>
                                        {item.acknowledged
                                          ? "Acknowledged"
                                          : "Pending"}
                                      </Text>
                                      <Text
                                        size={12}
                                        style={[
                                          styles.severity,
                                          styles[item.severity],
                                        ]}
                                      >
                                        {item.severity.toUpperCase()}
                                      </Text>
                                    </TouchableOpacity>
                                    {currentGrevience === index ? (
                                      <Block
                                        flex
                                        space="between"
                                        style={styles.cardDescription}
                                      >
                                        <View style={styles.modalBody}>
                                          <Text
                                            style={{ margin: 5, marginLeft: 0 }}
                                          >
                                            <Text
                                              size={14}
                                              bold
                                              style={styles.cardTitle}
                                            >
                                              Region:{" "}
                                            </Text>
                                            <Text>
                                              {item.regionsTargetted.join(", ")}
                                            </Text>
                                          </Text>
                                          {role !== "pilot" &&
                                          role !== "externalPilot" &&
                                          id !== item.createdBy._id &&
                                          !item.acknowledged ? (
                                            <Block width={200} style={{ marginBottom: 0 }}>
                                            <Input
                                             right
                                             placeholder="Reply"
                                             onChangeText={(text) => {
                                               setResponse(text);
                                             }}
                                            />
                                    
                                            <Button
                                              color="primary"
                                              style={styles.createButton}
                                              onPress={() =>
                                                handleAcknowledge(item._id)
                                              }
                                            >
                                              <Text
                                                bold
                                                size={12}
                                                color={icpaTheme.COLORS.WHITE}
                                              >
                                                {!loading
                                                  ? "Please wait..."
                                                  : "Acknowledge"}
                                              </Text>
                                            </Button>
                                            </Block>
                                          ) : null}
                                        </View>
                                      </Block>
                                    ) : null}
                                  </Block>
                                )}
                                keyExtractor={(item) => item._id}
                              />
                            </Block>
                          ) : (
                            <Text style={{ marginTop: 20 }}>
                              No Greviences Found
                            </Text>
                          )
                        ) : (
                          <ActivityIndicator style={{ marginTop: 20 }} />
                        )}
                      </View>
                    </View>
                  </Modal>
                </Block>
              </KeyboardAvoidingView>
              <TouchableOpacity
                style={styles.openButton}
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <Text style={styles.textStyle}>Show Grevience List</Text>
              </TouchableOpacity>
            </Block>
          </Block>
        </Block>
      </ImageBackground>
    </Block>
  );
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    marginBottom: 140,
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
    backgroundColor: icpaTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA",
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
  severity: {
    fontSize: 10,
    fontWeight: "600",
    width: 60,
    marginVertical: 10,
    textAlign: "center",
    color: icpaTheme.COLORS.WHITE,
    padding: 5,
    borderRadius: 4,
    overflow: "hidden",
  },
  high: {
    backgroundColor: "orange",
  },
  urgent: {
    backgroundColor: "#ff2727",
  },
  low: {
    backgroundColor: "#b5b1b1",
  },
  medium: {
    color: icpaTheme.COLORS.BLACK,
    backgroundColor: "yellow",
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
    width: 110,
    height: 30,
    marginTop: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    minHeight: height * 0.7,
    minWidth: width * 0.7,
    position: "relative",
  },
  modalView: {
    margin: 20,
    position: "relative",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: icpaTheme.COLORS.PRIMARY,
    borderRadius: 3,
    padding: 10,
    elevation: 2,
    position: "absolute",
    bottom: 0,
    width: width,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  textStyleClose: {
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    marginBottom: 5,
    padding: 5,
    position: "relative",
  },
  cardTitle: {
    flex: 1,
    flexWrap: "wrap",
    maxWidth: 130,
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: "hidden",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: width * 0.2,
  },
  horizontalImage: {
    height: 60,
    width: 50,
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  fullImage: {
    height: 100,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
    marginBottom: 10,
  },
  dateContainer: {
    position: "absolute",
    top: -5,
    right: 0,
    width: 50,
    padding: 10,
    borderWidth: 0,
  },
});

export default Grevience;
