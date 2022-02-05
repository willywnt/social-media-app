import React, { useRef } from 'react';
import { Animated, View, Text, Image, Pressable } from 'react-native';
import ReactNativeZoomableView from '@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SharedElement } from 'react-navigation-shared-element';

import { COLORS, FONTS, SIZES } from '../../constants';

const DetailPhoto = ({ route, navigation }) => {
  const { item, sharedElementPrefix } = route.params;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const hideTitleClose = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start();
  }

  const showTitleClose = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    }).start();
  }

  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      width: SIZES.width,
      height: SIZES.height,
      backgroundColor: COLORS.black,
    }}>
      {/* Close Button */}
      <Animated.View
        style={{
          width: 40,
          height: 40,
          position: 'absolute',
          right: 10,
          top: 10,
          zIndex: 100,
          opacity: fadeAnim,
        }}
      >
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <MaterialCommunityIcons
            name="close-circle"
            size={40}
            color={COLORS.white}
          />
        </Pressable>
      </Animated.View>
      {/* Full Size Photo */}
      <ReactNativeZoomableView
        zoomEnabled={true}
        maxZoom={3}
        minZoom={1}
        zoomStep={1}
        initialZoom={1}
        bindToBorders={true}
        captureEvent={true}
        doubleTapZoomToCenter={true}
        onPanResponderGrant={hideTitleClose}
        onPanResponderEnd={showTitleClose}
      >
        <SharedElement
          id={`${sharedElementPrefix}-${item?.id}`}
        >
          <Image style={{
            width: SIZES.width,
            aspectRatio: 1,
            resizeMode: 'contain',
          }} source={{ uri: item.url }} />
        </SharedElement>
      </ReactNativeZoomableView>
      {/* Photo Title */}
      <Animated.View style={{
        position: 'absolute',
        bottom: 0,
        width: "100%",
        opacity: fadeAnim,
        paddingHorizontal: SIZES.radius,
        paddingVertical: 40,
        backgroundColor: COLORS.transparentBlack1
      }}>
        <Text style={{
          color: COLORS.white,
          ...FONTS.h3,
          textAlign: 'center'
        }}>{item.title}</Text>
      </Animated.View>
    </View>
  );
};

DetailPhoto.sharedElements = (route, otherRoute, showing) => {
  const { item, sharedElementPrefix } = route.params;
  return [
    { id: `${sharedElementPrefix}-${item?.id}` }
  ]
}

export default DetailPhoto;
