import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import {Block, Text, theme} from 'galio-framework';
import Unorderedlist from 'react-native-unordered-list';

import {Images, icpaTheme} from '../constants';
import {committeeMembers} from '../_const/const';
import {HeaderHeight} from '../constants/utils';
import {Logo} from '../constants/Images';
import CardComponent from '../components/ContactCard';
import Social from '../components/Social'
const {width, height} = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;
class Home extends React.Component {
  render() {
    return (
      <Block flex center style={styles.home}>
        <Block flex>
          <ImageBackground
            source={Images.RegisterBackground}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}>
            <Block flex style={styles.profileCard}>
              <ScrollView style={{paddingRight: 20}}>
                {/* <Block style={styles.info}>
                  <Block row center>
                    <Image source={Logo} style={{marginTop: 30}} />
                  </Block>
                </Block> */}
                <Block flex>
                  <Block style={styles.nameInfo}>
                    <Text
                      bold
                      size={28}
                      style={{textAlign: 'center'}}
                      color={icpaTheme.COLORS.DEFAULT}>
                      Indian Commercial Pilots' Association
                    </Text>
                  </Block>
                  <Block middle style={{marginTop: 30, marginBottom: 16}}>
                    <Block style={styles.divider} />
                  </Block>
                  <Block>
                    <Text
                      size={22}
                      bold
                      color="#525F7F"
                      style={{marginBottom: 20}}>
                      Overview
                    </Text>
                  </Block>
                  <Block>
                    <Text size={16} color="#525F7F" style={{marginBottom: 10}}>
                      The Indian Commercial Pilots Association (ICPA) is a
                      professional association that represents pilots in airline
                      operations in India. Our 800 pilot members are employed
                      by Air India Ltd with the aim to ensure safe skies and
                      healthy work-life balance with integrity, dignity, safety
                      and unity as the 4 pillars of its foundation.
                    </Text>
                  </Block>
                  <Block>
                    <Text size={16} color="#525F7F" style={{marginBottom: 10}}>
                      ICPA was formed in 1950's in the aviation environment of
                      the time and the need to enhance the industrial position
                      of pilots.
                    </Text>
                  </Block>
                  <Block>
                    <Text size={15} bold color="#525F7F" style={styles.title}>
                      OBJECTIVES
                    </Text>
                  </Block>
                  <Block>
                    <Text size={16} color="#525F7F" style={{marginBottom: 10}}>
                      ICPA seeks to advance the employment interests of its
                      members and, to that end, represents individuals and the
                      membership at large both in the workplace and in the
                      broader aviation industry.
                    </Text>
                  </Block>
                  <Block>
                    <Text size={16} color="#525F7F" style={{marginBottom: 10}}>
                      ICPA regularly participates in regulatory, technical, FDTL
                      schemes and government inquiries and forums to represent
                      the interests of pilots. The Association is registered as
                      a trade union and is recognised by the airline and
                      regulatory bodies as having a stakeholder interest in the
                      Indian aviation industry. The Association is the
                      pre-eminent voice of Indian commercial airline pilots.
                    </Text>
                  </Block>
                  <Block>
                    <Text size={15} bold color="#525F7F" style={styles.title}>
                      WHAT WE DO
                    </Text>
                  </Block>
                  <Block>
                    <Text size={16} color="#525F7F" style={{marginBottom: 10}}>
                      ICPA is run by pilots for pilots. It also has a team of
                      dedicated professionals that facilitate the advancement of
                      our members’ interests.
                    </Text>
                  </Block>
                  <Block>
                    <Text size={16} color="#525F7F" style={{marginBottom: 10}}>
                      ICPA participates in bilateral wage agreements with the
                      management and ensures aviation market standard wages for
                      its members.
                    </Text>
                  </Block>
                  <Block>
                    <Text size={16} color="#525F7F" style={{marginBottom: 10}}>
                      ICPA engages with the regulatory body on a regular basis
                      to voice their inputs and suggestions for matters
                      regarding flight safety, Fatigue Risk Management and
                      Flight Duty Schemes.
                    </Text>
                  </Block>
                  <Block>
                    <Text size={16} color="#525F7F" style={{marginBottom: 10}}>
                      Our main purpose is to assist members with any issues that
                      arise in their employment to ensure their protected and
                      backed by the union.
                    </Text>
                  </Block>
                  <Block>
                    <Text
                      size={15}
                      bold
                      color="#525F7F"
                      style={{marginBottom: 10}}>
                      ICPA members receive a range of benefits which include:
                    </Text>
                  </Block>
                  <Block>
                    <Unorderedlist>
                      <Text size={16} color="#525F7F">
                        Industrial & Legal Assistance
                      </Text>
                    </Unorderedlist>
                    <Unorderedlist>
                      <Text size={16} color="#525F7F" size={16} color="#525F7F">
                        Accident & Incident Schemes
                      </Text>
                    </Unorderedlist>
                    <Unorderedlist>
                      <Text size={16} color="#525F7F">
                        Pilot Welfare Schemes
                      </Text>
                    </Unorderedlist>
                    <Unorderedlist>
                      <Text size={16} color="#525F7F">
                        Safety & Technical Assistance
                      </Text>
                    </Unorderedlist>
                    <Unorderedlist>
                      <Text size={16} color="#525F7F">
                        Loss of Licence
                      </Text>
                    </Unorderedlist>
                    <Unorderedlist>
                      <Text size={16} color="#525F7F">
                        Benevolent & Suraksha Scheme.
                      </Text>
                    </Unorderedlist>
                  </Block>
                </Block>
                <Block>
                  <Text size={22} bold color="#525F7F" style={{marginTop: 20}}>
                  CENTRAL EXECUTIVE COMMITEE
                  </Text>
                </Block>
                <Block flex row>
                  <FlatList
                    style={{width: width}}
                    data={committeeMembers}
                    numColumns={1}
                    renderItem={({item}) => {
                      return (

                         <CardComponent item={item} horizontal />
                      );
                    }}
                  />
                </Block>
              </ScrollView>
            </Block>
          </ImageBackground>
        </Block>
        <Social/>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    flex: 1,
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
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
    paddingRight: 0,
    paddingBottom: 160,
    marginHorizontal: 10,
    marginTop: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
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
    marginTop: 15,
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
  title: {
    backgroundColor: icpaTheme.COLORS.DEFAULT,
    marginBottom: 10,
    color: icpaTheme.COLORS.WHITE,
    padding: 3,
    paddingLeft: 10,
    fontSize: 12,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardContainer: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    flexDirection:'column',
    borderWidth: 0,
    minHeight: 80,
    padding: 10,
    position: 'relative',
    margin: 10,
    marginBottom: 5,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  fullImage: {
    height: 100,
    width: 100,
  },
});

export default Home;
