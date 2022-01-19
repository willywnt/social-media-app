import React from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';
import { COLORS, FONTS } from "../constants";

const IconLabelButton = ({ label, icon, onPress, containerStyle, labelStyle, iconStyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        ...containerStyle
      }}
    >
      <Image
        source={icon}
        style={{
          width: 18,
          height: 18,
          tintColor: COLORS.black,
          ...iconStyle
        }} />
      <Text
        style={{
          color: COLORS.black,
          ...FONTS.h5,
          ...labelStyle
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}

export default IconLabelButton;
