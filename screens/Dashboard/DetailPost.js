import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {COLORS, FONTS, SIZES} from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {LineDevider} from '../../components';

const DetailPost = ({route, navigation}) => {
  const {currentUser, post} = route.params;
  const [postComments, setPostComments] = useState([]);

  useEffect(() => {
    let apiUrl = `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`;
    axios({
      url: apiUrl,
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then(response => {
        if (response.status === 200) {
          setPostComments(response.data);
        } else {
          console.log(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [post.id]);

  function renderPostContent() {
    return (
      <>
        <View
          style={{
            paddingTop: SIZES.radius,
            width: SIZES.width,
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
              style={{paddingHorizontal: 10}}
            />
            <Text
              style={{
                color: COLORS.darkBlue,
                ...FONTS.h3,
                fontWeight: 'bold',
              }}>
              {currentUser.username}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              paddingTop: 5,
              paddingBottom: SIZES.radius,
              marginHorizontal: SIZES.radius,
            }}>
            <Text
              style={{
                color: COLORS.primary,
                ...FONTS.h2,
                fontSize: 20,
                lineHeight: 24,
                fontWeight: 'bold',
              }}>
              {post.title}
            </Text>
            <Text
              style={{
                color: COLORS.black,
                ...FONTS.h4,
                lineHeight: 20,
                marginVertical: SIZES.radius,
              }}>
              {post.body}
            </Text>
          </View>
        </View>
        <LineDevider />
      </>
    );
  }

  const renderItem = ({item}) => {
    return (
      <View>
        <View
          style={{
            paddingTop: SIZES.radius,
            width: SIZES.width,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="person-circle"
              size={45}
              color={COLORS.primary}
              style={{paddingHorizontal: 10}}
            />
            <Text
              style={{
                color: COLORS.darkBlue,
                ...FONTS.h3,
                fontWeight: 'bold',
                flex: 1,
              }}>
              {item.name}
            </Text>
          </View>
          <View
            style={{
              paddingTop: 5,
              paddingBottom: SIZES.radius,
              marginLeft: 65,
              marginRight: SIZES.radius,
            }}>
            <Text
              style={{
                color: COLORS.black,
                ...FONTS.h4,
                lineHeight: 20,
              }}>
              {item.body}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  function renderPostComments() {
    return (
      <FlatList
        data={postComments}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderPostContent}
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
      {/* Show All Comments */}
      {renderPostComments()}
    </View>
  );
};

export default DetailPost;
