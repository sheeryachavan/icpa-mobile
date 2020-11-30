import React from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Image
} from 'react-native';
import  { Logo } from "../constants/Images";
import {Block, theme,Input,Button, Text} from 'galio-framework';
import {icpaTheme} from '../constants';
const {width, height} = Dimensions.get('screen');

export default function Verification() {
  return (
    <Block flex center>
        <Block width={width} style={styles.home}>
        <Image source={Logo} />
        <ActivityIndicator style={{ marginTop: 20 }} size="small" color={icpaTheme.COLORS.PRIMARY} />
        </Block>
    </Block>
  );
}
const styles = StyleSheet.create({
  home: {
    backgroundColor:'#fff',
    height: height,
    justifyContent:'center',
    alignItems: 'center',
    flex: 1,
  },
});
