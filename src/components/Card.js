import React, {useState} from 'react';
import {withNavigation} from '@react-navigation/compat';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  View,
} from 'react-native';
import {dateFormat} from '../_utils/helper'
import {Block, Text, theme} from 'galio-framework';
const {width, height} = Dimensions.get('screen');
import {Images, icpaTheme} from '../constants';
import moment from 'moment';
import {download} from '../_utils/api';

class Card extends React.Component {
  state = {
    showDetails: false,
  };
  render() {
    const {
      download,
      item,
      style,
      ctaColor,
      imageStyle,
      news,
      flight
    } = this.props;

    const imageStyles = [
      {width:40,height:40,marginBottom:20},
      imageStyle,
    ];
    const cardContainer = [styles.card, styles.shadow, style];
    return (
      <Block card flex style={cardContainer}>
        {!news ? (
          <Block>
            <Image
              source={ !flight ? Images.Letter : Images.flightSafety}
              style={imageStyles}
            />
            <Text size={12} style={styles.cardTitle}>
              {item.title || item.originalName && item.originalName <= 40 ? item.originalName : `${item.originalName.substring(0,37)}...` }
            </Text>
            <Modal isVisible={this.state.showDetails}
              onBackdropPress={() => this.setState({showDetails: false})}
            >
              <View style={{backgroundColor:'#fff',width:width*0.8,height:200,alignSelf:'center'}} >
                <Block>
                  <Text
                    size={14}
                    size={12}
                    color={ctaColor || icpaTheme.COLORS.ACTIVE}
                    style={styles.cardTitle}>
                    {item.createdBy}
                  </Text>
                  <Text size={12} style={styles.cardTitle}>
                    {item.fileDescription}
                  </Text>
                </Block>
              </View>
            </Modal>

            <ImageBackground
              source={Images.backgroundShadow}
              style={styles.dateContainer}>
              <Block column>
                <Text
                  bold
                  color={icpaTheme.COLORS.BLACK}
                  style={{textAlign: 'center'}}
                  size={16}>
                  {moment(item.createdDate).format('DD')}
                </Text>
                <Text
                  bold
                  color={icpaTheme.COLORS.BLACK}
                  style={{textAlign: 'center'}}
                  size={12}>
                  {moment(item.createdDate).format('MMM')}
                </Text>
                <Text
                  bold
                  color={icpaTheme.COLORS.BLACK}
                  style={{textAlign: 'center'}}
                  size={10}>
                  {moment(item.createdDate).format('YYYY')}
                </Text>
              </Block>
            </ImageBackground>
          </Block>
        ) : (
          <Block row >
          <Image
          source={Images.NewsIcon}
          style={styles.horizontalImageNews}
        />
          <TouchableOpacity style={{width:width - 130,marginRight:10}} onPress={download}>
            <Text bold>{item.title && item.title.length <= 80 ? item.title : `${item.title.substring(0,80)}...`}</Text>
            <Text color={icpaTheme.COLORS.PLACEHOLDER} style={{marginTop: 10}}>{item.created ? dateFormat(item.created,true) : null}</Text>
            
          </TouchableOpacity>
          </Block>
        )}

        {!news ? (
          <Block flex row space="between" style={{marginTop: 20}}>
            <TouchableOpacity onPress={download}>
              <Text
                bold
                muted={!ctaColor}
                size={12}
                color={ctaColor || icpaTheme.COLORS.ACTIVE}>
                {'Download'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.setState({showDetails: !this.state.showDetails})
              }>
              <Text
                bold
                muted={!ctaColor}
                size={12}
                color={ctaColor || icpaTheme.COLORS.ACTIVE}>
                {this.state.showDetails ? 'hide details' : 'view details'}
              </Text>
            </TouchableOpacity>
          </Block>
        ) : null}
      </Block>
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
    minHeight: 80,
    padding: 10,
    position: 'relative',
    margin: 10,
    marginBottom: 5,
  },

  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  cardTitle: {
    marginTop: 10,
    textAlign: 'center',
  },
  dateContainer: {
    position: 'absolute',
    top: -10,
    right: 0,
    width: 50,
    padding: 10,
    borderWidth: 0,
  },
  horizontalImageNews:{
    width:50,
    height:45,
    marginRight:10
  }
});

export default withNavigation(Card);
