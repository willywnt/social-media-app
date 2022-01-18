import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../constants';

const IconButton = ({ icon, iconStyle, containerStyle }) => {
  return (
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        ...containerStyle
      }}
    >
      <Image
        source={icon}
        style={{
          width: 24,
          height: 24,
          tintColor: COLORS.black,
          ...iconStyle
        }}
      />
    </TouchableOpacity>
  )
}

export default IconButton;
