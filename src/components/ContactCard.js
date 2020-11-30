import React from 'react';
import {withNavigation} from '@react-navigation/compat';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {Block, Text, theme} from 'galio-framework';
import {Images, icpaTheme} from '../constants';
import Communications from 'react-native-communications';
import {timeAgo} from '../_utils/helper';

class Card extends React.Component {
  render() {
    const {
      item,
      horizontal,
      full,
      style,
      notification,
      imageStyle,
      handleNotificationClick,
    } = this.props;

    const imageStyles = [
      full ? styles.fullImage : styles.horizontalImage,
      imageStyle,
    ];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [
      styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
    ];

    return !notification ? (
      <Block row={horizontal} card flex style={cardContainer}>
        <TouchableWithoutFeedback>
          <Block flex style={imgContainer}>
            <Image source={Images.pilotImage} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Block flex space="between" style={styles.cardDescription}>
            <Text size={14} bold style={styles.cardTitle}>
              {item.name}
            </Text>
            <Text size={12}>
              {item.central.designation ? item.central.designation : ''}
              {item.central.designation ? ' | ' : ''}
              {item.regional.designation ? item.regional.designation : ''}
            </Text>
            <Block>
              <TouchableOpacity
                onPress={() => Communications.phonecall(item.contact, false)}>
                <Text
                  size={12}
                  style={{marginBottom: 5}}
                  color={icpaTheme.COLORS.PRIMARY}
                  bold>
                  {item.contact}  {item.region}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Communications.email([item.email], null, null, null, null)
                }>
                <Text size={12} color={icpaTheme.COLORS.SECONDARY} bold>
                  {item.email}
                </Text>
              </TouchableOpacity>
            </Block>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    ) : (
      <TouchableOpacity
        style={{flex: 1, flexDirection: 'column'}}
        onPress={() => handleNotificationClick(item._id, item.type)}>
        <Block
          row={horizontal}
          card
          style={[styles.cardNotification, styles.shadow]}>
          <Block>
            {item.read ? (
              <Text style={styles.read}></Text>
            ) : (
              <Text style={styles.unreadRead}></Text>
            )}
          </Block>
          <Block flex space="between" style={styles.cardDescription}>
            <Text size={14} bold style={styles.cardTitle}>
              {item.title || item.originalName}
            </Text>
            <Text
              color={icpaTheme.COLORS.SECONDARY}
              style={{marginVertical: 5}}
              size={12}>
              Uploaded By: {item.createdBy}
            </Text>
            <Block>
              <Text
                size={12}
                style={{marginBottom: 5}}
                color={icpaTheme.COLORS.PRIMARY}
                bold>
                {timeAgo(item.createdDate)}
              </Text>
            </Block>
          </Block>
        </Block>
      </TouchableOpacity>
    );
  }
}

Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 110,
    margin: 5,
  },
  cardNotification: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE - 10,
    marginHorizontal: theme.SIZES.BASE - 5,
    borderWidth: 0,
    minHeight: 60,
    margin: 5,
  },
  cardTitle: {
    // flex: 1,
    // flexWrap: 'wrap',
    // paddingBottom: 6,
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    borderRadius: 3,
    maxWidth: 110,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 100,
    width: 100,
    margin: 5,
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
    height: 110,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  read: {
    width: 25,
    height: 25,
    borderRadius: 12,
    marginHorizontal: 15,
    marginTop: 20,
    overflow: 'hidden',
    backgroundColor: icpaTheme.COLORS.SWITCH_OFF,
  },
  unreadRead: {
    width: 25,
    height: 25,
    marginHorizontal: 15,
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: icpaTheme.COLORS.ACTIVE,
  },
});

export default withNavigation(Card);
