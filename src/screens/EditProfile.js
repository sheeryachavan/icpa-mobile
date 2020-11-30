import React from 'react';
import {StyleSheet, ImageBackground, Dimensions, StatusBar} from 'react-native';
import {Block} from 'galio-framework';

import {Images, icpaTheme} from '../constants';
import EditFormComponent from './EditFormComponent';

const {width, height} = Dimensions.get('screen');

class EditProfile extends React.Component {
  state = {
    screen: 0,
  };
  render() {
    let {screen} = this.state;
    const {navigation} = this.props;
    return (
      <Block flex center style={styles.home}>
      <StatusBar hidden  backgroundColor={icpaTheme.COLORS.PRIMARY} barStyle="light-content"/>
        <ImageBackground
          source={Images.RegisterBackground}
          style={{width, height, zIndex: 1}}>
          <Block flex middle>
            <Block
              style={{
                ...styles.registerContainer,
                height: height * 0.95,
              }}>
              <Block flex style={{paddingTop: 15}}>
                <EditFormComponent navigation={navigation} />
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.8,
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
  obButtons: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
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
    fontWeight: '800',
    fontSize: 14,
  },
  active: {
    backgroundColor: icpaTheme.COLORS.PRIMARY,
    color: '#fff',
    fontWeight: '800',
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
    width: width * 0.5,
    marginTop: 25,
  },
});

export default EditProfile;
