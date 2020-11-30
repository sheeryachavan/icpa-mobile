import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  FlatList,
  Text,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {Block, theme} from 'galio-framework';
import {Card} from '../components';
const {width} = Dimensions.get('screen');
import {getLatestNews} from '../redux/slices/NewsSlice';
import Social from '../components/Social'

export default function Letters() {
  const dispatch = useDispatch();
  const state = useSelector((_state) => _state.dataLogin);
  const newsData = useSelector((_state) => _state.dataNews);

  useEffect(() => {
    getList();
  }, [dispatch]);

  const getList = () => {
    let token = state.token.jwtToken;
    dispatch(
      getLatestNews(token, (error, message) => {
        if (error) {
          cogoToast.error(message || 'Something went wrong', options);
        }
      }),
    );
  };
  const cardContainer = [styles.card, styles.shadow];
  const imgContainer = [styles.imageContainer, styles.horizontalStyles];
  const imageStyles = [true ? styles.fullImage : styles.horizontalImage];
  return (
    <Block flex center style={styles.home}>
      <View style={{marginBottom: 40}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.articles}>
          {newsData.news &&
          newsData.news.items &&
          newsData.news.items.length > 0 ? (
            <Block flex row>
              <FlatList
                data={newsData.news.items}
                onRefresh={() => {
                  getList(1);
                }}
                refreshing={newsData.isLoading}
                renderItem={({item}) => (
                  <Card
                    item={item}
                    horizontal
                    news
                    download={() => {
                      Linking.openURL(item.url).catch((err) =>
                        console.error('An error occurred', err),
                      );
                    }}
                  />
                )}
                keyExtractor={(item) => item._id}
              />
            </Block>
          ) : (
            <ActivityIndicator style={{marginTop: 20}} />
          )}
        </ScrollView>
      </View>
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
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 70,
    marginBottom: 5,
  },
  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
    width: '95%',
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: width * 0.2,
  },
  horizontalImage: {
    height: 60,
    width: 50,
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  fullImage: {
    height: 100,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});
