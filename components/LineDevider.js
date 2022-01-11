import React from 'react';
import {View} from 'react-native';
import {COLORS} from '../constants';

const LineDevider = ({lineStyles}) => {
  return (
    <View
      style={{
        width: '100%',
        height: 2,
        backgroundColor: COLORS.lightGray,
        ...lineStyles,
      }}
    />
  );
};

export default LineDevider;
