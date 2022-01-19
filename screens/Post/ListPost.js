import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { getAllUser, getAllPost } from '../../stores/post/postActions';

import { COLORS, FONTS, SIZES, icons } from '../../constants';
import { UserSection, LineDivider, IconLabelButton } from '../../components';
import axios from 'axios';

const ListPost = ({ getAllPost, getAllUser, posts, users, loading, navigation }) => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/comments`)
      .then(response => setComments(response.data))
      .catch(error => console.log(error));
  }, [])

  useEffect(() => {
    getPost(1);
    getAllUser();
  }, [comments])

  const getPost = (page, currentPosts = posts || []) => {
    getAllPost(comments, page, currentPosts);
  }

  useEffect(() => {
    getPost(currentPage);
  }, [currentPage]);

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

  const renderLoader = () => {
    return (
      loading ? <View
        style={{ width: SIZES.width, height: 80, justifyContent: 'center', alignItems: 'center' }}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View> : null
    )

  }

  const handleLoadMore = () => {
    if (!hasScrolled) { return null; }
    setCurrentPage(currentPage + 1);
  }


  function renderPostSection() {
    return (
      <FlatList
        data={posts}
        keyExtractor={item => `Post-${item.id}`}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <LineDivider lineStyle={{ height: 8 }} />}
        ListFooterComponent={renderLoader}
        onEndReached={handleLoadMore}
        // onEndReachedThreshold={0}
        onScroll={() => setHasScrolled(true)}

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
    loading: state.postReducer.loading,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    getAllPost: (comments, page, currentPosts) => {
      return dispatch(getAllPost(comments, page, currentPosts));
    },
    getAllUser: () => {
      return dispatch(getAllUser());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPost);
