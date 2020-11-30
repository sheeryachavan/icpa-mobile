import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  Dimensions,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Block, theme, Text} from 'galio-framework';
import {showTopErrorMessage} from '../_utils/helper';
import CardComponent from '../components/ContactCard';
const {width, height} = Dimensions.get('screen');
import {getUserList, changeRegion} from '../redux/slices/Members';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {icpaTheme} from '../constants';
import Social from '../components/Social'
let region_props = [
  {label: 'East', value: 0, key: 'east'},
  {label: 'West', value: 1, key: 'west'},
  {label: 'North', value: 2, key: 'north'},
  {label: 'South', value: 3, key: 'south'},
];



export default function MembersList() {
  const dispatch = useDispatch();
  const state = useSelector((_state) => _state.dataLogin);
  const list = useSelector((_state) => _state.dataMembersList);

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    let token = state.token.jwtToken;
    dispatch(
      getUserList(token, (error, message) => {
        if (error) {
          showTopErrorMessage(message || 'Something went wrong');
        }
      }),
    );
  };
  const setValue = (value) => {
    dispatch(changeRegion(region_props[value]['key']));
  };
  return (
    <Block flex center style={styles.home}>
      <Block width={width * 0.9}>
        <Block style={[styles.shadow, styles.input, {marginTop: 15}]}>
          <Text style={{paddingBottom: 5, color: icpaTheme.COLORS.PLACEHOLDER}}>
            Select Region
          </Text>
          <RadioForm formHorizontal={true} animation={true}>
            {region_props.map((obj, i) => (
              <RadioButton labelHorizontal={true} key={i}>
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={list.region === region_props[i].key}
                  onPress={(value) => {
                    setValue(value);
                  }}
                  borderWidth={1}
                  buttonInnerColor={icpaTheme.COLORS.PRIMARY}
                  buttonOuterColor={
                    list.region === region_props[i].key
                      ? icpaTheme.COLORS.PRIMARY
                      : icpaTheme.COLORS.INPUT
                  }
                  buttonSize={20}
                  buttonOuterSize={20}
                  buttonStyle={{}}
                  buttonWrapStyle={[i !== 0 && {marginLeft: 10}]}
                />
                <RadioButtonLabel
                  obj={obj}
                  index={i}
                  labelHorizontal={true}
                  onPress={(value) => {
                    setValue(value);
                  }}
                  labelStyle={{
                    fontSize: 10,
                    color: icpaTheme.COLORS.PRIMARY,
                  }}
                  labelWrapStyle={{}}
                />
              </RadioButton>
            ))}
          </RadioForm>
        </Block>
      </Block>
      {!list.showLoading ? (
        list && list.userList.length ? (
          <Block flex row>
            <FlatList
              style={{width: width}}
              data={list.userList}
              numColumns={1}
              renderItem={({item}) => {
                return <CardComponent item={item} horizontal />;
              }}
            />
          </Block>
        ) : (
          <Text style={{marginTop: 20}}>No Members Found</Text>
        )
      ) : (
        <ActivityIndicator style={{marginTop: 20}} />
      )}
              <Social/>
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
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 50,
    right: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: height * 0.7,
    minWidth: width * 0.7,

    position: 'relative',
  },
  createButton: {
    width: 110,
    height: 30,
    marginTop: 5,
  },
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: '#fff',
  },
  swipeContainer: {},
  alphabetSidebar: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderCircle: {
    width: 50,
    height: 50,
    backgroundColor: '#ccc',
    borderRadius: 25,
    marginRight: 10,
    marginLeft: 5,
  },
  name: {
    fontSize: 15,
  },
  cell: {
    height: 95,
    width: width,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
