import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';

const UserSection = ({ sharedElementPrefix, currentUser }) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      }}>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={() =>
          navigation.navigate('DetailUser', { currentUser, sharedElementPrefix })
        }>
        <SharedElement
          id={`${sharedElementPrefix}-Picture-User-${currentUser?.id}`}
        >
          <Image
            source={{ uri: currentUser.picture.thumbnail }}
            style={{ width: 45, height: 45, marginRight: 10, borderRadius: 45 / 2 }}
          />
        </SharedElement>
        <View>
          <Text
            style={{
              color: COLORS.darkBlue,
              ...FONTS.h3,
              lineHeight: 18,
            }}>
            {currentUser?.username}
          </Text>
          <Text
            style={{
              color: COLORS.gray,
              ...FONTS.body4,
              lineHeight: 18,
            }}>
            {currentUser?.company.name}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default UserSection;
