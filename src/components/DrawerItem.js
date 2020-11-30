import React from 'react';
import {StyleSheet, TouchableOpacity, Linking} from 'react-native';
import {Block, Text, theme} from 'galio-framework';

import Icon from './Icon';
import icpaTheme from '../constants/Theme';

class DrawerItem extends React.Component {
  renderIcon = () => {
    const {title, focused} = this.props;

    switch (title) {
      case 'Letter':
        return (
          <Icon
            name="shop"
            family="IcpaExtra"
            size={14}
            color={focused ? 'white' : icpaTheme.COLORS.PRIMARY}
          />
        );
      case 'Circulars':
        return (
          <Icon
            name="shop"
            family="IcpaExtra"
            size={14}
            color={focused ? 'white' : icpaTheme.COLORS.PRIMARY}
          />
        );
      case 'Elements':
        return (
          <Icon
            name="map-big"
            family="IcpaExtra"
            size={14}
            color={focused ? 'white' : icpaTheme.COLORS.ERROR}
          />
        );
      case 'Articles':
        return (
          <Icon
            name="spaceship"
            family="IcpaExtra"
            size={14}
            color={focused ? 'white' : icpaTheme.COLORS.PRIMARY}
          />
        );
      case 'Profile':
        return (
          <Icon
            name="chart-pie-35"
            family="IcpaExtra"
            size={14}
            color={focused ? 'white' : icpaTheme.COLORS.WARNING}
          />
        );
      case 'Account':
        return (
          <Icon
            name="calendar-date"
            family="IcpaExtra"
            size={14}
            color={focused ? 'white' : icpaTheme.COLORS.INFO}
          />
        );
      case 'OnlineForms':
        return (
          <Icon
            name="calendar-date"
            family="IcpaExtra"
            size={14}
            color={focused ? 'white' : icpaTheme.COLORS.INFO}
          />
        );
      case 'Getting Started':
        return (
          <Icon
            name="spaceship"
            family="IcpaExtra"
            size={14}
            color={focused ? 'white' : 'rgba(0,0,0,0.5)'}
          />
        );
      case 'Log out':
        return <Icon />;
      default:
        return null;
    }
  };

  render() {
    const {focused, title, navigation} = this.props;

    const containerStyles = [
      styles.defaultStyle,

      focused ? [styles.activeStyle, styles.shadow] : null,
    ];

    return (
      <TouchableOpacity
        style={{height: 50}}
        onPress={() => navigation.navigate(title)}>
        <Block flex row style={containerStyles}>
          <Block row center flex={0.9}>
            <Text
              size={15}
              bold={focused ? true : false}
              color={focused ? 'white' : 'rgba(0,0,0,0.5)'}>
              {title}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 13,
    paddingHorizontal: 16,
    marginLeft: 12,
  },
  activeStyle: {
    backgroundColor: icpaTheme.COLORS.ACTIVE,
    borderRadius: 4,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
  },
});

export default DrawerItem;
