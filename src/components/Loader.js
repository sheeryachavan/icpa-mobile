import React from 'react';
import {ActivityIndicator} from 'react-native';
import './style.scss';

export function Loader() {
  return <ActivityIndicator size="large" style={{marginTop: 20}} />;
}
export default Loader;
