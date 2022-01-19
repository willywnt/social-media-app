import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS } from '../constants';
import { useNavigation } from '@react-navigation/native';

const UserSection = ({ currentUser }) => {
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
          navigation.navigate('DetailUser', { currentUser })
        }>
        <Icon
          name="person-circle"
          size={45}
          color={COLORS.primary}
          style={{ paddingRight: 10 }}
        />
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
