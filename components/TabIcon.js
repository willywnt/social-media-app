import React from 'react';
import {View, Text, Image} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {FONTS, COLORS} from '../constants';

const TabIcon = ({focused, icon, iconStyle, label}) => {
  const iconName = focused ? icon : icon + '-outline';
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Icon
        name={iconName}
        size={25}
        color={focused ? COLORS.black2 : COLORS.darkGray}
      />
      <Text
        style={{
          color: focused ? COLORS.black2 : COLORS.darkGray,
          ...FONTS.h4,
        }}>
        {label}
      </Text>
    </View>
  );
};

export default TabIcon;
