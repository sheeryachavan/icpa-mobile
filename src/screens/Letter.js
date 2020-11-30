import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DocumentPicker from "react-native-document-picker";
import { BASE_URL } from "../_utils/api";
import {
  StyleSheet,
  Dimensions,
  Image,
  View,
  FlatList,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from "react-native";
import axios from "axios";
import { Block, theme, Text } from "galio-framework";
import { showTopErrorMessage } from "../_utils/helper";
import { Upload } from "../constants/Images";
import { Card, Button, Input } from "../components";
const { width, height } = Dimensions.get("screen");
import { listFile } from "../redux/slices/Letters";
import { listCount } from "../_const/const";
import { icpaTheme } from "../constants";
import Social from "../components/Social";

export default function Letters() {
  const [bottomLoader, setBottomLoader] = useState(false);
  const [topLoader, setTopLoader] = useState(false);

  //uploadDocument
  const [formDescription, setDescription] = useState(null);
  const [formTitle, setTitle] = useState(null);
  const [ctaText, setCtaText] = useState("Upload");
  const [singleFile, setSingleFile] = useState(null);

  const dispatch = useDispatch();
  const state = useSelector((_state) => _state.dataLogin);
  const list = useSelector((_state) => _state.dataLetters);
  let role = state.details.role;
  
  useEffect(() => {
    getList(list.currentPage);
  }, []);

  const getList = (pageNo = 1) => {
    let token = state.token.jwtToken;
    dispatch(
      listFile(token, "letters", pageNo, (error, message) => {
        if (error) {
          showTopErrorMessage(message || "Something went wrong");
        }
        setBottomLoader(false);
        setTopLoader(false);
      })
    );
  };
  
  const handleDownload = (id) => {
    Linking.openURL(`${BASE_URL}/file/download?docId=${id}`).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  //uploadDocument
  const uploadDocument = async () => {
    try {
      if (!formDescription && !formTitle) {
        return;
      }
      setCtaText("Uploading...");
      if (singleFile != null) {
        const fileToUpload = singleFile;
        const data = new FormData();
        data.append("title", formTitle);
        data.append("fileDescription", formDescription);
        data.append("type", "letters");
        data.append("fileField", fileToUpload);
        const URL = `${BASE_URL}/file/upload`;
        let token = state.token.jwtToken;
        const headers = {
          "Content-Type": "multipart/form-data; ",
          Authorization: token,
        };
        let res = await axios.post(URL, data, { headers });
        if (res.data.ok) {
          closeUploadModal();
          showTopErrorMessage("Uploaded successfully", "success");
          getList(list.currentPage);
        }
      } else {
        alert("Please Select File first");
      }
    } catch (e) {
      showTopErrorMessage("Error while uploading", "error");
    }
  };
  //uploadDocument
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

  const closeUploadModal = () => {
    setDescription(null);
    setSingleFile(null);
    setTitle(null);
    setCtaText('Upload');
  };

  return (
    <Block flex center style={styles.home}>
      <View style={{ marginBottom: 40 }}>
        {!list.isLoading ? (
          list && list.filesList && list.filesList.length ? (
            <Block>
              <Block flex row>
                <FlatList
                  style={{ width: width }}
                  data={list.filesList}
                  onRefresh={() => {
                    setTopLoader(true);
                    getList();
                  }}
                  numColumns={2}
                  refreshing={topLoader}
                  renderItem={({ item }) => (
                    <Card
                      item={item}
                      horizontal
                      download={() => handleDownload(item._id)}
                    />
                  )}
                  keyExtractor={(item) => item._id + Math.random()}
                  onEndReachedThreshold={0.8}
                  onEndReached={() => {
                    {
                      if(list.searchedForKeyword){
                        return;
                      }
                      var count = list.totalCount / listCount;
                      count = Math.floor(count);
                      if (list.totalCount % listCount > 0) {
                        count = count + 1;
                      }

                      if (list.currentPage <= count) {
                        setBottomLoader(true);
                        getList(list.currentPage + 1);
                      }
                    }
                  }}
                />
              </Block>
              {bottomLoader && <ActivityIndicator />}
            </Block>
          ) : (
            <>
              <Text style={{ marginTop: 20 }}>No Letters Found</Text>
              {role !== "pilot" && role !== "externalPilot" ? (<Block middle>
                <TouchableOpacity
                  style={[
                    styles.upload,
                    {
                      position: "absolute",
                      top: height / 2,
                      width: width / 2,
                      right:'auto'
                    },
                  ]}
                  onPress={handleUpload}
                >
                  <Image source={Upload} />
                </TouchableOpacity>
              </Block>):null}
            </>
          )
        ) : (
          <ActivityIndicator style={{ marginTop: 20 }} />
        )}
        <Modal
          animationType="slide"
          transparent
          visible={singleFile ? true : false}
          onRequestClose={() => {
            closeUploadModal;
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
                onPress={closeUploadModal}
              >
                <Text style={styles.textStyleClose}>x</Text>
              </TouchableOpacity>
              <Block middle>
                <Input
                  right
                  placeholder="Title"
                  onChangeText={(text) => {
                    setTitle(text);
                  }}
                />
              </Block>
              <Block middle>
                <Input
                  value={formDescription}
                  placeholder="Description"
                  onChangeText={(text) => {
                    setDescription(text);
                  }}
                />
              </Block>
              <Block middle>
                <Button
                  color="primary"
                  style={styles.createButton}
                  onPress={ctaText === "Upload" ? uploadDocument : null}
                >
                  <Text bold size={14} color={icpaTheme.COLORS.WHITE}>
                    {ctaText}
                  </Text>
                </Button>
              </Block>
            </View>
          </View>
        </Modal>
        {role !== "pilot" && role !== "externalPilot" ? (
          <TouchableOpacity style={styles.upload} onPress={handleUpload}>
            <Image source={Upload} />
          </TouchableOpacity>
        ) : null}
        <Social />
      </View>
    </Block>
  );
}
const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  upload: {
    width: 60,
    height: 60,
    backgroundColor: icpaTheme.COLORS.PRIMARY,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 50,
    right: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: height * 0.7,
    minWidth: width * 0.7,

    position: "relative",
  },
  modalView: {
    margin: 20,
    maxWidth: width * 0.8,
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
  createButton: {
    width: 110,
    height: 30,
    marginTop: 5,
  },
});
