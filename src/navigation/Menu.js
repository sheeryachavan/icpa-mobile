import React from "react";
import { ScrollView, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import { Block, Text, theme } from "galio-framework";
import { DrawerItem as DrawerCustomItem } from "../components";
import { TouchableOpacity } from "react-native-gesture-handler";
import Images, { notificationLogo, Logo, EditLogo } from "../constants/Images";
import { icpaTheme } from "../constants";
import { logout } from "../redux/slices/Login";
import AsyncStorage from "@react-native-community/async-storage";

function CustomDrawerContent({ navigation }) {
  const state = useSelector((_state) => _state.dataLogin);
  const screens = [
    { name: "Home", moveTo: true },
    { name: "Admin", moveTo: null, isAdmin: true },
    { name: "News", moveTo: true },
    { name: "Directives", moveTo: true },
    { name: "Letters", moveTo: true },
    { name: "Miscellaneous", moveTo: null },
    { name: "Circulars", moveTo: true },
    { name: "Flight Safety", moveTo: null },
    { name: "Members", moveTo: null },
    // { name: "Flight Request", moveTo: null },
    { name: "Welfare Scheme", moveTo: null },
    { name: "Constitution", moveTo: null },
    { name: "Grievance Section", moveTo: null },
    { name: "Payments", moveTo: null },
  ];
  const _logout = () => {
    AsyncStorage.removeItem('ICPA_STORAGE_KEY');
    navigation.navigate("Onboarding"  )
  }

  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block flex={0.02} style={styles.header}>
        <Image source={Logo} />
      </Block>

      <Block flex style={{ paddingLeft: 0, paddingRight: 14 }}>
        <Block
          flex={0.05}
          style={[styles.header, { marginBottom: 10, position: "relative" }]}
        >
          <Block
            row
            style={{
              paddingBottom: 20,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text size={16} muted bold color={icpaTheme.COLORS.PRIMARY}>
              Welcome!{" "}
              {state && state.details.firstName
                ? state.details.firstName + " "
                : ""}
              {state && state.details.lastName ? state.details.lastName : ""}
            </Text>
            <TouchableOpacity
              style={styles.editContainer}
              onPress={() => navigation.navigate("Edit Profile")}
            >
              <Image source={EditLogo} style={styles.edit} />
            </TouchableOpacity>
          </Block>
        </Block>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
            if(item.isAdmin && state.details.role !== 'admin') {
              return null;
            }
            return (
              <DrawerCustomItem
                title={item.name}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })}
          <Block
            flex
            style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}
          >
            <Block
              style={{
                borderColor: "rgba(0,0,0,0.2)",
                width: "100%",
                borderWidth: StyleSheet.hairlineWidth,
              }}
            />
            <TouchableOpacity onPress={() => _logout()}>
              <Text
                color="#8898AA"
                style={{ marginTop: 16, marginLeft: 8, paddingBottom: 60 }}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </Block>
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    fontSize: 200,
    color: "red",
  },
  editContainer: {
    position: "relative",
    marginLeft: 20,
    top: 0,
  },
  edit: {
    width: 16,
    height: 16,
    marginTop: 10,
  },
  header: {
    paddingHorizontal: 28,

    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: "center",
  },
});

export default CustomDrawerContent;
