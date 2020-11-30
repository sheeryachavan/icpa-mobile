import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  ImageBackground,
  StatusBar,
  Modal,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Block, Text, theme } from "galio-framework";
import { Button, Input } from "../components";
import { Images, icpaTheme } from "../constants";
import { flightNoRegex } from "../_const/const";
import Social from '../components/Social'
import {
  getFlightList,
  createFlightRequest,
  acknowledged,
} from "../redux/slices/RequestSection";
import { Calendar } from "react-native-calendars";
import { showTopErrorMessage } from "../_utils/helper";
var moment = require("moment");
const { width, height } = Dimensions.get("screen");

export function Request({ navigation }) {
  const [source, setSource] = useState("");

  const [destination, setDestination] = useState("");
  const [startDate, setDate] = useState(null);
  const [currentRequest, setCurrentRequest] = useState(false);
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  const [flightNo, setFlightNo] = useState("");
  const [ctaText, setCtaText] = useState("Submit");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [loading, setLoading] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const state = useSelector((_state) => _state.dataLogin);

  const flightState = useSelector((_state) => _state.dataRequest);
  const dispatch = useDispatch();

  useEffect(() => {
    getList();
    setCalenderDate();
  }, []);

  const getList = (pageNo) => {
    let token = state.token.jwtToken;
    dispatch(
      getFlightList(token, pageNo, (error, message) => {
        if (error) {
          showTopErrorMessage(message || "Something went wrong", "danger");
        }
      })
    );
  };

  const handleChange = (date) => {
    setDate(date);
    setSelectedDate({
      [date.dateString]: {
        selected: true,
        selectedColor: icpaTheme.COLORS.PRIMARY,
      },
    });
  };

  const handleAcknowledge = (id) => {
    let token = state.token.jwtToken;
    dispatch(
      acknowledged(id, token, (err, msg) => {
        if (err) {
          showTopErrorMessage(msg || "Something went wrong", "danger");
        } else {
          getList();
        }
      })
    );
  };

  const setCalenderDate = () => {
    let currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currenntMonth = currentDate.getMonth();
    let month;
    if (currentDay <= 7) {
      month = currenntMonth == 12 ? 0 : currenntMonth + 1;
    } else {
      month = currenntMonth == 12 ? 1 : currenntMonth + 2;
    }
    let firstDay = new Date(currentDate.getFullYear(), month, 1);
    let lastDay = new Date(currentDate.getFullYear(), month + 1, 0);
    let initailVisibleDate = moment(firstDay).format("YYYY-MM-DD");
    setDate(initailVisibleDate);
    setMinDate(firstDay);
    setMaxDate(lastDay);
    setSelectedDate({
      [initailVisibleDate]: {
        selected: true,
        selectedColor: icpaTheme.COLORS.PRIMARY,
      },
    });
  };

  const handleSubmit = (e) => {
    if (ctaText !== "Submit") {
      return;
    }
    e.preventDefault();
    if (!source) {
      showTopErrorMessage("From is required", "danger");
    } else if (!destination) {
      showTopErrorMessage("To is required", "danger");
    } else if (source == destination) {
      showTopErrorMessage("From and TO can't be same", "danger");
    } else if (!startDate) {
      showTopErrorMessage("Date is required", "danger");
    } else if (!flightNo) {
      showTopErrorMessage("Please add flight no", "danger");
    } else if (!flightNoRegex.test(flightNo)) {
      showTopErrorMessage("Flight no is not valid", "danger");
    } else {
      setCtaText("Please wait...");
      let token = state.token.jwtToken;
      let obj = {
        source,
        destination,
        requestedDate: moment(startDate.dateString).format("DD-MM-YYYY"),
        flightNo,
      };
      dispatch(
        createFlightRequest(obj, token, (error, message) => {
          if ((error, message)) {
            showTopErrorMessage(message || "Something went wrong", "danger");
          } else {
            showTopErrorMessage("Flight request submitted", "success");
          }
          setCtaText("Submit");
          setDate(new Date());
          getList();
        })
      );
    }
  };

  let role = state.details.role;
  let id = state.details.id;

  return (
    <Block flex center style={styles.home}>
      <StatusBar hidden />
      <ImageBackground
        source={Images.RegisterBackground}
        style={{ width, height, zIndex: 1 }}
      >
        <Block flex middle>
          <Block style={{ ...styles.registerContainer, height:role !== "admin" && role !== "manager"? height*0.7: height * 0.3 }}>
            <Block flex={1} middle style={styles.socialConnect}>
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
                enabled
              >
                {role !== "admin" && role !== "manager" ? (
      
                  <ScrollView style={styles.signUpContainer}>
                    <Block
                      width={width * 0.8}
                      style={{ marginTop: 15, marginBottom: 0 }}
                    >
                      <Input
                        right
                        value={source}
                        maxLength={3}
                        placeholder="From (IATA) ex:DEL"
                        onChangeText={(text) => {
                          setSource(text.toUpperCase());
                        }}
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                        value={destination}
                        placeholder="To (IATA) ex:BOM"
                        maxLength={3}
                        onChangeText={(text) => {
                          setDestination(text.toUpperCase());
                        }}
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <Text
                        style={{
                          position: "absolute",
                          zIndex: 1,
                          top: 20,
                          left: 15,
                        }}
                      >
                        AI -{" "}
                      </Text>
                      <Input
                        type="numeric"
                        style={{ paddingLeft: 39 }}
                        value={flightNo}
                        maxLength={6}
                        placeholder="Flight NO"
                        onChangeText={(text) => {
                          setFlightNo(text.toUpperCase());
                        }}
                      />
                    </Block>
                    {startDate ? (
                      <Calendar
                        onDayPress={(day) => handleChange(day)}
                        markedDates={selectedDate}
                        theme={{
                          backgroundColor: icpaTheme.COLORS.WHITE,
                          calendarBackground: icpaTheme.COLORS.WHITE,
                          textSectionTitleColor: icpaTheme.COLORS.PRIMARY,
                          selectedDayBackgroundColor: icpaTheme.COLORS.PRIMARY,
                          selectedDayTextColor: icpaTheme.COLORS.WHITE,
                          dayTextColor: icpaTheme.COLORS.BLACK,
                          textDisabledColor: icpaTheme.COLORS.BLOCK,
                        }}
                        hideArrows={true}
                        current={startDate}
                        minDate={minDate}
                        maxDate={maxDate}
                      />
                    ) : (
                      <ActivityIndicator style={{ marginTop: 20 }} />
                    )}
                  </ScrollView>
                      ) : <Text style={{paddingTop:20,textAlign: "center"}}>Click button to see list</Text>}
                      {role !== "admin" && role !== "manager" ? (
                <Block middle>
                  <Button
                    color="primary"
                    style={styles.createButton}
                    onPress={ctaText === "Pending..." ? null : handleSubmit}
                  >
                    <Text bold size={14} color={icpaTheme.COLORS.WHITE}>
                      {ctaText}
                    </Text>
                  </Button>
                </Block>
                     ) : null}
          
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
                        {!flightState.showLoading ? (
                          flightState &&
                          flightState.flightList &&
                          flightState.flightList.length ? (
                            <Block flex row>
                              <FlatList
                                data={flightState.flightList}
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
                                        if (currentRequest === index) {
                                          setCurrentRequest(-1);
                                        } else {
                                          setCurrentRequest(index);
                                        }
                                      }}
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
                                      {/* ****************** */}

                                      <Text size={14} style={styles.cardTitle}>
                                        <Text
                                          size={14}
                                          bold
                                          style={styles.cardTitle}
                                        >
                                          From:{" "}
                                        </Text>
                                        {item.source}
                                      </Text>
                                      <Text size={14} style={styles.cardTitle}>
                                        <Text
                                          size={14}
                                          bold
                                          style={styles.cardTitle}
                                        >
                                          To:{" "}
                                        </Text>
                                        {item.destination}
                                      </Text>
                                      <Text bold size={12}>
                                        Status :{" "}
                                        {item.approved ? (
                                          <Text
                                            color={icpaTheme.COLORS.SUCCESS}
                                          >
                                            Approved
                                          </Text>
                                        ) : (
                                          <Text
                                            color={icpaTheme.COLORS.WARNING}
                                          >
                                            Not Approved
                                          </Text>
                                        )}
                                      </Text>
                                      <Text size={12} bold>
                                        Requested by:{" "}
                                        <Text color={icpaTheme.COLORS.ACTIVE}>
                                          {item.createdBy.firstName +
                                            " " +
                                            item.createdBy.lastName}
                                        </Text>
                                      </Text>
                                    </TouchableOpacity>
                                    {currentRequest === index ? (
                                      <Block
                                        flex
                                        space="between"
                                        style={styles.cardDescription}
                                      >
                                        <View style={styles.modalBody}>
                                          {role !== "pilot" &&
                                          role !== "externalPilot" &&
                                          id !== item.createdBy._id ? (
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
                                                {loading
                                                  ? "Please wait..."
                                                  : "Approve"}
                                              </Text>
                                            </Button>
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
                            <Text>No Requests Found</Text>
                          )
                        ) : (
                          <ActivityIndicator style={{ marginTop: 20 }} />
                        )}
                      </View>
                    </View>
                  </Modal>

                  <TouchableOpacity
                    style={styles.openButton}
                    onPress={() => {
                      setModalVisible(true);
                    }}
                  >
                    <Text style={styles.textStyle}>Show Request List</Text>
                  </TouchableOpacity>
                </Block>
              </KeyboardAvoidingView>
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
  status: {
    fontSize: 10,
    fontWeight: "600",
    width: 100,
    textAlign: "center",
    color: icpaTheme.COLORS.WHITE,
    padding: 5,
    borderRadius: 4,
    overflow: "hidden",
  },
  pending: {
    backgroundColor: "orange",
  },
  pending: {
    backgroundColor: "green",
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
    alignSelf: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 75,
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
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
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
export default Request;
