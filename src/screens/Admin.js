import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Block, Text, theme } from "galio-framework";
import { Button, Input } from "../components";
import { Images, icpaTheme } from "../constants";
import { getUserList, updateProfile } from "../redux/slices/Admin";
import { showTopErrorMessage } from "../_utils/helper";
import moment from "moment";
const { width, height } = Dimensions.get("screen");

export function Admin({ navigation }) {
  const [selectedUser, setSelectedUser] = useState({});
  const state = useSelector((_state) => _state.dataLogin);
  const adminState = useSelector((_state) => _state.dataAdmin);
  const dispatch = useDispatch();

  useEffect(() => {
    if (role !== "admin") {
      navigation.push("Home");
    }
    getList();
  }, [state.userList]);
  const getList = (refresh) => {
    let token = state.token.jwtToken;
    dispatch(
      getUserList(token, refresh, (error, message) => {
        if (error) {
          showTopErrorMessage(message || "Something went wrong", "danger");
        }
      })
    );
  };

  const handleDetails = () => {
      // TODO
  }

  const approveOrDelete = (type, id) => {
    let _selectedUser = adminState.userList.filter((ele) => {
      return ele._id === id;
    });
    _selectedUser = _selectedUser[0];
    const data = {
      firstName: _selectedUser.firstName,
      email: _selectedUser.email,
      lastName: _selectedUser.lastName,
      dob: _selectedUser.dob,
      region: _selectedUser.region,
      contact: _selectedUser.contact,
      role: _selectedUser.role,
      airline: _selectedUser.airline,
      gender: _selectedUser.gender,
      post: _selectedUser.post,
      address: _selectedUser.address,
      state: _selectedUser.state,
      city: _selectedUser.city,
      pincode: _selectedUser.pincode,
      active: _selectedUser.active,
      approved: type === "approved" ? true : _selectedUser.approved,
      deleted: type === "deleted" ? true : _selectedUser.deleted,
      _id: id,
    };
    let token = state.token.jwtToken;
    dispatch(
      updateProfile(token, data, (error, message) => {
        if (error) {
          showTopErrorMessage(message || "Something went wrong", 'danger');
        } else {
          showTopErrorMessage(message || `User "${data.email}" ${type === "approved"?'approved':type === "deleted"?'deleted':'updated'} successfully`, 'success');
          
          setTimeout(() => {
            getList();
          }, 2500);

        }
      })
    );
  };
  const _date = (date) => {
    let event = new Date(date);
    let options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return event.toLocaleString("en", options);
  };

  const openModal = (id) => {
    const _selectedUser = adminState.userList.filter((ele) => {
      return ele._id === id;
    });
    setSelectedUser(_selectedUser[0]);
    toggleModal(true);
  };
  const closeModal = () => {
    toggleModal(false);
  };

  const desMap = {
    commander: "Commander",
    Commander: "Commander",
    "Executive Commander": "Executive Commander",
    executiveCommander: "Executive Commander",
    "First Officer": "First Officer",
    firstOfficer: "First Officer",
    Captain: "Captain",
    captain: "Captain",
  };

  const postMap = {
    p1: "Pilot",
    p2: "Co-Pilot",
  };
  const role = state.details.role;
  return (
    <Block flex center style={styles.home}>
      <ImageBackground
        source={Images.RegisterBackground}
        style={{ width, height: height, zIndex: 1 }}
      >
        <Block flex>
          <Block style={styles.registerContainer}>
            <Block flex={1} middle style={styles.socialConnect}>
              <Block style={styles.centeredView}>
                {/* <Modal
                    animationType="slide"
                    transparent={true}
                    visible={false }
                    onRequestClose={() => {
                      // setModalVisible(false);/
                    }}> */}
                {/* <View style={styles.centeredView}>
                      <View style={styles.modalView}> */}
                {!adminState.showLoading ? (
                  adminState.userList && adminState.userList.length ? (
                    <Block flex row>
                      <FlatList
                        data={adminState.userList}
                        onRefresh={() => {
                          getList(true);
                        }}
                        refreshing={false}
                        renderItem={({ item, index }) => (
                          <Block card flex key={index} style={styles.card}>
                            <TouchableOpacity
                              onPress={() => {
                                // if(currentGrevience === index){
                                //   setCurrentGrevience(-1)
                                // } else {
                                //   setCurrentGrevience(index)
                                // }
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
                                      {moment(item.createdDate).format("DD")}
                                    </Text>
                                    <Text
                                      bold
                                      color={icpaTheme.COLORS.BLACK}
                                      style={{ textAlign: "center" }}
                                      size={14}
                                    >
                                      {moment(item.createdDate).format("MMM")}
                                    </Text>
                                    <Text
                                      bold
                                      color={icpaTheme.COLORS.BLACK}
                                      style={{ textAlign: "center" }}
                                      size={10}
                                    >
                                      {moment(item.createdDate).format("YYYY")}
                                    </Text>
                                  </Block>
                                </ImageBackground>
                              </Block>
                              <Text
                                size={12}
                                style={{ marginTop: 5 }}
                                color={icpaTheme.COLORS.ACTIVE}
                                bold
                              >
                                <Text color={icpaTheme.COLORS.BLACK}>
                                  Name:{" "}
                                </Text>
                                {item.firstName + " " + item.lastName}
                              </Text>
                              <Text
                                size={12}
                                style={{ marginTop: 5 }}
                                color={icpaTheme.COLORS.ACTIVE}
                                bold
                              >
                                <Text color={icpaTheme.COLORS.BLACK}>
                                  Email:{" "}
                                </Text>
                                {item.email}
                              </Text>
                              <Text
                                size={12}
                                style={{ marginTop: 5 }}
                                color={icpaTheme.COLORS.SECONDARY}
                                bold
                              >
                                <Text color={icpaTheme.COLORS.BLACK}>
                                  Designation:
                                </Text>{" "}
                                {desMap[item.designation]}
                              </Text>
                              <Text
                                size={12}
                                style={{ marginTop: 5 }}
                                color={icpaTheme.COLORS.SECONDARY}
                                bold
                              >
                                <Text color={icpaTheme.COLORS.BLACK}>
                                  Role:
                                </Text>{" "}
                                {item.role}
                              </Text>
                              <Block row>
                              {!item.approved && <Button
                                color="primary"
                                style={styles.createButton}
                                onPress={()=>{approveOrDelete('approved',item._id)}}
                              >
                                <Text
                                  bold
                                  size={14}
                                  color={icpaTheme.COLORS.WHITE}
                                >
                                  Approve
                                </Text>
                              </Button>}
                              {!item.deleted && <Button
                                color="secondary"
                                style={styles.createButton}
                                onPress={()=>{approveOrDelete('deleted',item._id)}}
                              >
                                <Text
                                  bold
                                  size={14}
                                  color={icpaTheme.COLORS.WHITE}
                                >
                                  Delete
                                </Text>
                              </Button>}
                              {/* <Button
                                color="primary"
                                style={styles.createButton}
                                onPress={handleDetails}
                              >
                                <Text
                                  bold
                                  size={14}
                                  color={icpaTheme.COLORS.WHITE}
                                >
                                  {'Edit Details'}
                                </Text>
                              </Button> */}
                              </Block>
                            </TouchableOpacity>
                          </Block>
                        )}
                        keyExtractor={(item) => item._id}
                      />
                    </Block>
                  ) : (
                    <Text style={{ marginTop: 20 }}>No User Found</Text>
                  )
                ) : (
                  <ActivityIndicator style={{ marginTop: 20 }} />
                )}
                {/* </View>
                    </View> */}
                {/* </Modal> */}
              </Block>
            </Block>
          </Block>
        </Block>
      </ImageBackground>
    </Block>
  );
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width,
    height: height - 90,
    backgroundColor: "#F4F5F7",
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
    width: 85,
    height: 20,
    marginTop: 25,
    marginRight:5,
    opacity:0.7
  },
  centeredView: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
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
    minHeight: 120,
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

export default Admin;
