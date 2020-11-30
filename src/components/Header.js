import React, { Component, Fragment } from "react";
import { withNavigation } from "@react-navigation/compat";
import { connect } from "react-redux";

import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import { Button, Block, NavBar, Text, theme } from "galio-framework";
import { notificationLogo } from "../constants/Images";
import Icon from "./Icon";
import Input from "./Input";
import Tabs from "./Tabs";
import icpaTheme from "../constants/Theme";
import Images, { Share } from "../constants/Images";
import { searchList } from "../redux/slices/Members.js";
import { letterSearch } from "../redux/slices/Letters";
import { circularsSearch } from "../redux/slices/LatestCirculars";
import { flightSafetySearch } from "../redux/slices/FlightSafety";
import { miscellaneousSearch } from "../redux/slices/Miscellaneous";
import { directivesSearch } from "../redux/slices/Directives";

const { height, width } = Dimensions.get("window");
const iPhoneX = () =>
  Platform.OS === "ios" &&
  (height === 812 || width === 812 || height === 896 || width === 896);

const BellButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => navigation.navigate("Notification")}
  >
    <Image
      source={notificationLogo}
      style={[styles.logo, { width: 20, height: 20 }]}
    />
    <Block middle style={styles.notify} />
  </TouchableOpacity>
);

const SearchButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity style={[styles.button, style]}>
    <Icon
      size={16}
      family="Galio"
      name="search-zoom-in"
      color={theme.COLORS[isWhite ? "WHITE" : "ICON"]}
    />
  </TouchableOpacity>
);

class Header extends React.Component {
  state = {
    showSocials: false,
  };

  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return back ? navigation.goBack() : navigation.openDrawer();
  };
  renderRight = () => {
    const { white, title, navigation } = this.props;

    if (title === "Title") {
      return [
        <BellButton key="chat-title" navigation={navigation} isWhite={white} />,
      ];
    }

    switch (title) {
      case "Letters":
        return [
          <BellButton
            key="chat-home"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Circulars":
        return [
          <BellButton
            key="chat-home"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "OnlineForms":
        return [
          <BellButton
            key="chat-home"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Search":
        return [
          <BellButton
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Home":
        return [
          <BellButton
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Notification":
        return [
          <BellButton
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Constitution":
        return [
          <BellButton
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case "Welfare Schemes":
        return [
          <BellButton
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      default:
        break;
    }
  };

  handleSearch = (text) => {
    const { title, token } = this.props;
    console.log("title", title, token);
    switch (title) {
      case "Letters":
        this.props.letterSearch(text, token);
        break;
      case "Members":
        this.props.searchList(text,token);
        break;
      case "Flight Safety":
        this.props.flightSafetySearch(text,token);
        break;
      case "Circulars":
        this.props.circularsSearch(text,token);
        break;
      case "Miscellaneous":
        this.props.miscellaneousSearch(text,token);
        break;
      case "Directives":
        this.props.directivesSearch(text,token);
        break;
    }
  };

  renderSearch = () => {
    const { navigation } = this.props;
    return (
      <Input
        right
        color="black"
        style={styles.search}
        onChangeText={(text) => {
          this.handleSearch(text);
        }}
        placeholder="Search"
        placeholderTextColor={"#8898AA"}
        iconContent={
          <Icon
            size={16}
            color={theme.COLORS.MUTED}
            name="search-zoom-in"
            family="IcpaExtra"
          />
        }
      />
    );
  };
  renderOptions = () => {
    const { navigation, optionLeft, optionRight } = this.props;

    return (
      <Block row style={styles.options}>
        <Button shadowless style={[styles.tab, styles.divider]}>
          <Block row middle>
            <Icon
              name="diamond"
              family="IcpaExtra"
              style={{ paddingRight: 8 }}
              color={icpaTheme.COLORS.ICON}
            />
            <Text size={16} style={styles.tabTitle}>
              {optionLeft || "Beauty"}
            </Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab}>
          <Block row middle>
            <Icon
              size={16}
              name="bag-17"
              family="IcpaExtra"
              style={{ paddingRight: 8 }}
              color={icpaTheme.COLORS.ICON}
            />
            <Text size={16} style={styles.tabTitle}>
              {optionRight || "Fashion"}
            </Text>
          </Block>
        </Button>
      </Block>
    );
  };
  renderTabs = () => {
    const { tabs, tabIndex, navigation } = this.props;
    const defaultTab = tabs && tabs[0] && tabs[0].id;

    if (!tabs) return null;

    return (
      <Tabs
        data={tabs || []}
        initialIndex={tabIndex || defaultTab}
        onChange={(id) => navigation.setParams({ tabId: id })}
      />
    );
  };
  renderHeader = () => {
    const { search, options, tabs } = this.props;
    if (search || tabs || options) {
      return (
        <Block center>
          {search ? this.renderSearch() : null}
          {tabs ? this.renderTabs() : null}
        </Block>
      );
    }
  };
  render() {
    const {
      back,
      title,
      white,
      transparent,
      bgColor,
      iconColor,
      titleColor,
      navigation,
      leftBig,
      ...props
    } = this.props;

    const noShadow = ["Search", "Categories", "Deals", "Profile"].includes(
      title
    );
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: "rgba(0,0,0,0)" } : null,
    ];

    const navbarStyles = [
      styles.navbar,
      bgColor && { backgroundColor: bgColor },
    ];

    return (
      <Block style={headerStyles}>
        <NavBar
          back={false}
          title={title}
          style={navbarStyles}
          tranxarent={transparent}
          right={this.renderRight()}
          rightStyle={{ alignItems: "flex-end" }}
          left={
            <TouchableOpacity
              onPress={this.handleLeftPress}
              hitSlop={{ top: 20, bottom: 20, left: 50, right: 100 }}
            >
              <Image
                source={back ? Images.Arrows : Images.Bars}
                style={{ marginTop: 2, width: 20, height: 20 }}
              />
            </TouchableOpacity>
          }
          leftStyle={[
            { paddingVertical: 12, flex: 0.2 },
            leftBig ? { minWidth: width * 0.5 } : {},
          ]}
          titleStyle={[
            styles.title,
            { color: icpaTheme.COLORS[white ? "WHITE" : "HEADER"] },
            titleColor && { color: titleColor },
          ]}
          {...props}
        />
        {this.renderHeader()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: "relative",
  },
  title: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: icpaTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: "absolute",
    top: 9,
    right: 12,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: icpaTheme.COLORS.BORDER,
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: "400",
    color: icpaTheme.COLORS.HEADER,
  },
  share: {
    position: "absolute",
    zIndex: 9999,
    width: 50,
    height: 40,
    right: 0,
    top: height * 0.7,
    borderRadius: 5,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: "red",
    elevation: Platform.OS === "android" ? 50 : 0,
  },
});

const mapStateToProps = (state) => ({
  token: state.dataLogin.token.jwtToken,
});

export default connect(mapStateToProps, {
  searchList,
  letterSearch,
  directivesSearch,
  miscellaneousSearch,
  flightSafetySearch,
  circularsSearch,
})(withNavigation(Header));
