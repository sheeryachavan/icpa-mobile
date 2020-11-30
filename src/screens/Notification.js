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
import {listCount, urlMap} from '../_const/const';
const {width, height} = Dimensions.get('screen');
import {
  getNotificationList,
  setUpreadAndOpen,
} from '../redux/slices/Notification';
import Social from '../components/Social'
import {icpaTheme} from '../constants';

export default function Notification({navigation}) {
  const dispatch = useDispatch();
  const state = useSelector((_state) => _state.dataLogin);
  const list = useSelector((_state) => _state.dataNotification);

  const [bottomLoader, setBottomLoader] = useState(false);
  const [topLoader, setTopLoader] = useState(false);

  useEffect(() => {
    getList(list.currentPage);
  }, []);

  const getList = (pageNo = 1) => {
    let token = state.token.jwtToken;
    dispatch(
      getNotificationList(token, pageNo, (error, message) => {
        if (error) {
          showTopErrorMessage(message || 'Something went wrong');
        }
        setBottomLoader(false);
        setTopLoader(false);
      }),
    );
  };
  const handleNotificationClick = (id, type) => {
    let token = state.token.jwtToken;
    dispatch(
      setUpreadAndOpen(id, token, () => {
        navigation.navigate(urlMap[type]);
        dispatch(getNotificationList(token));
      }),
    );
  };

  return (
    <Block flex center style={styles.home}>
      {!list.isLoading ? (
        list && list.notificationList && list.notificationList.length ? (
          <Block flex row>  
            <FlatList
              style={{width: width}}
              data={list.notificationList}
              onRefresh={() => {
                setTopLoader(true);
                getList();
              }}
              numColumns={1}
              refreshing={topLoader}
              renderItem={({item}) => (
                <CardComponent
                  item={item}
                  horizontal
                  notification
                  handleNotificationClick={(id, type) =>
                    handleNotificationClick(id, type)
                  }
                />
              )}
              keyExtractor={(item) => item._id}
              onEndReachedThreshold={0.8}
              onEndReached={() => {
                {
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
            {bottomLoader && <ActivityIndicator />}
          </Block>
        ) : (
          <Text style={{marginTop:20}}>No Notification to show</Text>
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
});
