import React, {useCallback} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {getAllUser, getAllPost} from '../../stores/post/postActions';
import {useFocusEffect} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, SIZES} from '../../constants';
import {LineDevider} from '../../components';

const Home = ({getAllPost, getAllUser, posts, users, navigation}) => {
  useFocusEffect(
    useCallback(() => {
      getAllPost();
      getAllUser();
    }, []),
  );

  const UserSection = ({currentUser}) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() =>
            navigation.navigate('DetailUser', {currentUser: currentUser})
          }>
          <Icon
            name="person-circle"
            size={45}
            color={COLORS.primary}
            style={{paddingRight: 10}}
          />
          <View>
            <Text
              style={{
                color: COLORS.darkBlue,
                ...FONTS.h3,
                fontWeight: 'bold',
                lineHeight: 18,
              }}>
              {currentUser?.username}
            </Text>
            <Text
              style={{
                color: COLORS.gray,
                ...FONTS.h4,
                lineHeight: 18,
              }}>
              {currentUser?.company.name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({item}) => {
    const currentUser = users.find(user => user.id === item.userId);
    return (
      <View
        style={{
          paddingHorizontal: SIZES.radius,
          paddingTop: SIZES.radius,
        }}>
        <UserSection currentUser={currentUser} />
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() =>
            navigation.navigate('DetailPost', {
              currentUser: currentUser,
              post: item,
            })
          }>
          <Text
            style={{
              color: COLORS.primary,
              ...FONTS.h2,
              fontSize: 20,
              lineHeight: 24,
              fontWeight: 'bold',
            }}>
            {item.title}
          </Text>
          <Text
            style={{
              color: COLORS.black,
              ...FONTS.h3,
              marginVertical: SIZES.radius,
            }}>
            {item.body}
          </Text>
          <LineDevider />
        </TouchableOpacity>
      </View>
    );
  };

  function renderPostSection() {
    return (
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {/* All Post From Users */}
      {renderPostSection()}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.postReducer.posts,
    users: state.postReducer.users,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    getAllPost: () => {
      return dispatch(getAllPost());
    },
    getAllUser: () => {
      return dispatch(getAllUser());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
