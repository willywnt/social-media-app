import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS, FONTS, SIZES } from '../../constants';

const DetailPhoto = ({ route, navigation }) => {
  const { item } = route.params;

  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      width: SIZES.width,
      height: SIZES.height,
      backgroundColor: COLORS.black,
    }}>
      {/* Close Button */}
      <Pressable
        style={{
          width: 40,
          height: 40,
          position: 'absolute',
          right: 10,
          top: 10,
          zIndex: 100,
        }}
        onPress={() => {
          navigation.goBack();
        }}>
        <MaterialCommunityIcons
          name="close-circle"
          size={40}
          color={COLORS.white}
        />
      </Pressable>
      {/* Full Size Photo */}
      <ReactNativeZoomableView
        zoomEnabled={true}
        maxZoom={1.5}
        minZoom={1}
        zoomStep={0.5}
        initialZoom={1}
        bindToBorders={true}
        captureEvent={true}
        doubleTapZoomToCenter={true}
        style={{ position: 'absolute' }}>
        <Image style={{
          width: SIZES.width,
          aspectRatio: 1,
          resizeMode: 'contain',
        }} source={{ uri: item.url }} />
      </ReactNativeZoomableView>
      {/* Photo Title */}
      <View style={{
        position: 'absolute',
        bottom: 0,
        width: "100%",
        paddingHorizontal: SIZES.radius,
        paddingVertical:40,
        backgroundColor: COLORS.transparentBlack1
      }}>
        <Text style={{
          color: COLORS.white,
          ...FONTS.h3,
          textAlign: 'center'
        }}>{item.title}</Text>
      </View>
    </View>
  );
};

export default DetailPhoto;
