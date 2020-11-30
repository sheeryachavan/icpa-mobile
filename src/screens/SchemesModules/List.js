import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Linking,
} from 'react-native';
import {Block, theme, Text} from 'galio-framework';
import {showTopErrorMessage, dateFormat} from '../../_utils/helper';
import Communications from 'react-native-communications';

const {width, height} = Dimensions.get('screen');
import {getSchemeList} from '../../redux/slices/Schemes';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {icpaTheme} from '../../constants';
import {BASE_URL} from '../../_utils/api'

let list = [
  {label: 'Temperorily Medically Unfit', value: 0, key: 'tmu', role: 'admin'},
  {label: 'Permenantly Medically Unfit', value: 1, key: 'pmu', role: 'admin'},
  {label: 'Incident Grounding', value: 2, key: 'incident', role: 'manager'},
  {label: 'Accident Grounding', value: 3, key: 'accident', role: 'manager'},
  {
    label: 'Administrative Grounding',
    value: 4, 
    key: 'adminstrator',
    role: 'manager',
  },
];

export default function List({role}) {
  const dispatch = useDispatch();
  const state = useSelector((_state) => _state.dataLogin);
  const tmuState = useSelector((_state) => _state.dataSchemes);
  const [_scheme, setScheme] = useState(0);

  useEffect(() => {
    getList();
  }, []);

  const handleDownload = (id) => {
    Linking.openURL(`${BASE_URL}/file/download?docId=${id}`).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  const getList = (type, pageNo = 1) => {
    let token = state.token.jwtToken;
    dispatch(
      getSchemeList(pageNo, type, token, (error, message) => {
        if (error) {
          showTopErrorMessage(message || 'Something went wrong');
        }
      }),
    );
  };
  const handleSelectScheme = (index) => {
    setScheme(index);
    getList(list[index].key);
  };
  return (
    <Block flex center style={styles.home}>
      <Block width={width * 0.9}>
        <Text bold size={12} style={{marginTop: 15}}>
          Select Scheme
        </Text>

        <Block style={[styles.shadow, styles.input, {marginTop: 15}]}>
          <RadioForm formHorizontal={false} animation={true}>
            {list.map((obj, i) => {
              if (role === obj.role) {
                return (
                  <RadioButton labelHorizontal={true} key={i}>
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={_scheme === i}
                      onPress={(value) => {
                        handleSelectScheme(value);
                      }}
                      borderWidth={1}
                      buttonInnerColor={icpaTheme.COLORS.PRIMARY}
                      buttonOuterColor={
                        _scheme === i
                          ? icpaTheme.COLORS.PRIMARY
                          : icpaTheme.COLORS.INPUT
                      }
                      buttonSize={20}
                      buttonOuterSize={20}
                      buttonStyle={{}}
                      buttonWrapStyle={[i !== 0 && {marginLeft: 0}]}
                    />
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      labelHorizontal={true}
                      onPress={(value) => {
                        handleSelectScheme(value);
                      }}
                      labelStyle={{
                        fontSize: 10,
                        color: icpaTheme.COLORS.PRIMARY,
                      }}
                      labelWrapStyle={{}}
                    />
                  </RadioButton>
                );
              }
            })}
          </RadioForm>
        </Block>
      </Block>
      <Block middle style={{marginTop: 10, marginBottom: 0}}>
        <Block style={styles.divider} />
      </Block>
      {!tmuState.isLoading ? (
        tmuState && tmuState.filesList.length ? (
          <Block flex row>
            <FlatList
              style={{width: width}}
              contentContainerStyle={{alignItems: 'center'}}
              data={tmuState.filesList}
              numColumns={1}
              renderItem={({item}) => {
                return (
                  <Block card style={styles.card}>
                    {item.email && (
                      <TouchableOpacity
                        onPress={() =>
                          Communications.email(
                            [item.email],
                            null,
                            null,
                            null,
                            null,
                          )
                        }>
                        <Text
                          bold
                          style={{marginBottom: 2}}
                          color={icpaTheme.COLORS.SECONDARY}>
                          <Text color={icpaTheme.COLORS.PRIMARY}>Email: </Text>
                          {item.email}
                        </Text>
                      </TouchableOpacity>
                    )}
                    {item.createdAt && (
                      <Text>
                        <Text bold color={icpaTheme.COLORS.PRIMARY}>
                          Date:{' '}
                        </Text>
                        {dateFormat(item.createdAt)}
                      </Text>
                    )}
                    {item.name && (
                      <Text>
                        <Text bold color={icpaTheme.COLORS.PRIMARY}>
                          Name:{' '}
                        </Text>
                        {item.name}
                      </Text>
                    )}
                    {item.empNo && (
                      <Text>
                        <Text color={icpaTheme.COLORS.PRIMARY} bold>
                          Employee No:{' '}
                        </Text>
                        {item.empNo}
                      </Text>
                    )}
                    {item.accidentType && (
                      <Text>
                        <Text color={icpaTheme.COLORS.PRIMARY} bold>
                          Accident type:{' '}
                        </Text>
                        {item.accidentType}
                      </Text>
                    )}
                    {item.accidentDate && (
                      <Text>
                        <Text color={icpaTheme.COLORS.PRIMARY} bold>
                          Accident Date:{' '}
                        </Text>
                        {dateFormat(item.accidentDate)}
                      </Text>
                    )}
                    {item.incidentType && (
                      <Text>
                        <Text color={icpaTheme.COLORS.PRIMARY} bold>
                          Incident type:{' '}
                        </Text>
                        {item.incidentType}
                      </Text>
                    )}
                    {item.incidentType && (
                      <Text>
                        <Text color={icpaTheme.COLORS.PRIMARY} bold>
                          Incident Date:{' '}
                        </Text>
                        {dateFormat(item.incidentType)}
                      </Text>
                    )}
                    {item.contact && (
                      <Text>
                        <Text color={icpaTheme.COLORS.PRIMARY} bold>
                          Contact:{' '}
                        </Text>
                        {item.contact}
                      </Text>
                    )}
                    {item.location && (
                      <Text>
                        <Text color={icpaTheme.COLORS.PRIMARY} bold>
                          Location:{' '}
                        </Text>
                        {item.location}
                      </Text>
                    )}
                    {item.base && (
                      <Text>
                        <Text color={icpaTheme.COLORS.PRIMARY} bold>
                          Base:{' '}
                        </Text>
                        {item.base}
                      </Text>
                    )}
                    {item.reason && (
                      <Text>
                        <Text color={icpaTheme.COLORS.PRIMARY} bold>
                          Reason:{' '}
                        </Text>
                        {item.reason}
                      </Text>
                    )}
                    {item.description && (
                      <Text>
                        <Text bold color={icpaTheme.COLORS.PRIMARY}>
                          Description:{' '}
                        </Text>
                        {item.description}
                      </Text>
                    )}
                    {item.from && (
                      <Text>
                        <Text bold color={icpaTheme.COLORS.PRIMARY}>
                          From:{' '}
                        </Text>
                        {dateFormat(item.from)}
                      </Text>
                    )}
                    {item.to && (
                      <Text>
                        <Text bold color={icpaTheme.COLORS.PRIMARY}>
                          To:{' '}
                        </Text>
                        {dateFormat(item.to)}
                      </Text>
                    )}
                     {item.to && (
                      <Text>
                        <Text bold color={icpaTheme.COLORS.PRIMARY}>
                          To:{' '}
                        </Text>
                        {dateFormat(item.to)}
                      </Text>
                    )} 
                       <Block flex  space="between" style={{marginTop: 20}}>
                    {item.docs && item.docs.length && item.docs.map((ele,index)=>{
                      return (
                        <TouchableOpacity onPress={()=>handleDownload(ele._id)}>
                        <Text
                          bold
                          style={{marginTop:10  }}
                          size={12}
                          color={icpaTheme.COLORS.ACTIVE}>
                          {ele.originalName}
                        </Text>
                      </TouchableOpacity>
                      )})
                    }
                      </Block>
                  </Block>
                );
              }}
            />
          </Block>
        ) : (
          <Text style={{marginTop: 20}}>Nothing Found</Text>
        )
      ) : (
        <ActivityIndicator style={{marginTop: 20}} />
      )}
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
  card: {
    width: width * 0.9,
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 110,
    margin: 5,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
    padding: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: height * 0.7,
    minWidth: width * 0.7,

    position: 'relative',
  },
  modalView: {
    margin: 20,
    maxWidth: width * 0.8,
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
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
  divider: {
    width: width,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
});
