import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
} from 'react-native';
import {Block, Text, theme} from 'galio-framework';

import {Button} from '../components';
import {Images, icpaTheme} from '../constants';
import {HeaderHeight} from '../constants/utils';
import {Logo} from '../constants/Images'
const {width, height} = Dimensions.get('screen');


const thumbMeasure = (width - 48 - 32) / 3;

class Profile extends React.Component {
  render() {
    return (
      <Block flex center style={styles.home}>
        <Block flex>
          <ImageBackground
            source={Images.RegisterBackground}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{width, marginTop: 10}}>
              <Block flex style={styles.profileCard}>
                <Block style={styles.info}>
                  <Block row center>
                  <Image source={Logo} style={{marginTop:30}}/>
                  </Block>
                </Block>
                <Block flex>
                  <Block middle style={styles.nameInfo}>
                    <Text bold size={28} style={{textAlign: 'center'}} color={icpaTheme.COLORS.DEFAULT}>
                      Indian Commercial Pilots Association
                    </Text>
                  </Block>
                  <Block middle style={{marginTop: 30, marginBottom: 16}}>
                    <Block style={styles.divider} />
                  </Block>
                  <Block middle>
                    <Text
                      size={16}
                      color="#525F7F"
                      style={{textAlign: 'center'}}>
                      ICPA is a representative body for the pilots of AirIndia
                      Ltd, having a strength of more than 600 members in India.
                    </Text>
                  </Block>
                  <Block
                    row
                    style={{paddingBottom: 20,paddingTop:20, justifyContent: 'flex-end'}}>
                    <Text
                      color="#525F7F"
                      size={16}
                      style={{textAlign: 'center'}}>
                      ICPA extends its wings towards better working conditions
                      of its members focusing on flight safety and building a
                      trust among its members to maintain Dignity, Unity,
                      Integrity and Safety - as its motto.
                    </Text>
                  </Block>
                </Block>
              </Block>
            </ScrollView>
          </ImageBackground>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    flex: 1,
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width: width,
    height: height / 2,
  },
  profileCard: {
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  info: {
    paddingHorizontal: 40,
  },
  avatarContainer: {
    position: 'relative',
    marginTop: -80,
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0,
  },
  nameInfo: {
    marginTop: 35,
  },
  divider: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure,
  },
});

export default Profile;
