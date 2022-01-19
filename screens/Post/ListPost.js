import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getAllUser, getAllPost } from '../../stores/post/postActions';
import { useFocusEffect } from '@react-navigation/native';

import { COLORS, FONTS, SIZES, icons } from '../../constants';
import { UserSection, LineDivider, IconLabelButton } from '../../components';
import axios from 'axios';

const ListPost = ({ getAllPost, getAllUser, posts, users, navigation }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/comments`)
      .then(response => setComments(response.data))
      .catch(error => console.log(error));
  }, [])

  useFocusEffect(
    useCallback(() => {
      getAllPost(comments);
      getAllUser();
    }, [comments]),
  );


  const renderItem = ({ item }) => {
    const currentUser = users.find(user => user.id === item.userId);
    return (
      <View
        style={{
          padding: SIZES.radius,
          paddingBottom: SIZES.base,
        }}>
        {/* User Section */}
        <UserSection currentUser={currentUser} />

        {/* Post Content */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('DetailPost', {
              currentUser,
              post: item,
            })
          }>
          <Text
            style={{
              color: COLORS.primary,
              ...FONTS.h3,
              fontSize: 18,
            }}>
            {item.title}
          </Text>
          <Text
            style={{
              color: COLORS.black,
              ...FONTS.body4,
              marginVertical: SIZES.radius,
            }}>
            {item.body}
          </Text>
        </TouchableOpacity>
        <View style={{ flex: 1, flexDirection: 'row', marginBottom: SIZES.base }}>
          {/* Likes */}
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: COLORS.gray,
                ...FONTS.body4,
              }}>10 Likes</Text>
          </View>
          {/* Count Comments */}
          {item.comments.length != 0 && <Text
            style={{
              color: COLORS.gray,
              ...FONTS.body4,
            }}>{item.comments.length} {item.comments.length > 1 ? "comments" : "comment"}</Text>}
        </View>
        <LineDivider lineStyle={{ height: 1 }} />
        {/* Button Action */}
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: SIZES.radius }}>
          <IconLabelButton
            label="Like"
            icon={icons.like}
            containerStyle={{ width: SIZES.width / 4 }} />
          <IconLabelButton
            label="Comment"
            icon={icons.comment}
            containerStyle={{ width: SIZES.width / 4 }}
            onPress={() => navigation.navigate('DetailPost', {
              currentUser,
              post: item,
            })} />
          <IconLabelButton
            label="Share"
            icon={icons.share}
            containerStyle={{ width: SIZES.width / 4 }} />
          <IconLabelButton
            label="Send"
            icon={icons.send}
            containerStyle={{ width: SIZES.width / 4 }} />
        </View>
      </View>
    );
  };

  function renderPostSection() {
    return (
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <LineDivider lineStyle={{ height: 8 }} />}
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
    getAllPost: (comments) => {
      return dispatch(getAllPost(comments));
    },
    getAllUser: () => {
      return dispatch(getAllUser());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPost);
