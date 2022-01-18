import React, { useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';

import { COLORS, FONTS, SIZES, icons } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { LineDivider, UserSection, IconLabelButton, IconButton } from '../../components';

const DetailPost = ({ route }) => {
  const { currentUser, post } = route.params;
  const [footerHeight, setFooterHeight] = useState(60);
  const inputRef = useRef();

  function renderPostContent() {
    return (
      <>
        <View
          style={{
            padding: SIZES.radius,
            paddingBottom: SIZES.base,
          }}>
          {/* User Section */}
          <UserSection currentUser={currentUser} />
          {/* Post Content */}
          <Text
            style={{
              color: COLORS.primary,
              ...FONTS.h3,
              fontSize: 20,
              marginTop: 5,
              fontWeight: 'bold',
            }}>
            {post.title}
          </Text>
          <Text
            style={{
              color: COLORS.black,
              ...FONTS.h4,
              lineHeight: 20,
              marginVertical: SIZES.base,
            }}>
            {post.body}
          </Text>
          <View style={{ flex: 1, flexDirection: 'row', marginBottom: SIZES.base }}>
            {/* Likes */}
            <View style={{ flex: 1 }}>
              <Text>10 Likes</Text>
            </View>
            {/* Count Comments */}
            {post.comments.length != 0 && <Text>{post.comments.length} comments</Text>}

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
              onPress={() => inputRef.current.focus()} />
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
        <LineDivider lineStyle={{ height: 8 }} />
      </>
    );
  }

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          padding: SIZES.radius,
        }}>
        <View style={{ flexDirection: 'row' }}>
          {/* Image Author */}
          <Icon
            name="person-circle"
            size={45}
            color={COLORS.primary}
            style={{ paddingRight: 10 }}
          />
          {/* Comment */}
          <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: COLORS.lightGray, padding: SIZES.radius, borderRadius: SIZES.base }}>
              <Text
                style={{
                  color: COLORS.darkBlue,
                  ...FONTS.h3,
                  fontWeight: 'bold',
                  flex: 1,
                }}>
                {item.name}
              </Text>
              <Text
                style={{
                  color: COLORS.black,
                  ...FONTS.h4,
                  lineHeight: 20,
                  marginTop: SIZES.base
                }}>
                {item.body}
              </Text>
            </View>

            {/* Like & Replay */}
            <View style={{ flex: 1, flexDirection: 'row', marginTop: SIZES.base }}>
              <TouchableOpacity>
                <Text style={{
                  color: COLORS.black,
                  ...FONTS.h4,
                  lineHeight: 20,
                }}>
                  Like
                </Text>
              </TouchableOpacity>
              <Text style={{
                color: COLORS.black,
                ...FONTS.h4,
                lineHeight: 20,
              }}>
                {'  |  '}
              </Text>
              <TouchableOpacity>
                <Text style={{
                  color: COLORS.black,
                  ...FONTS.h4,
                  lineHeight: 20,
                }}>
                  Replay
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };


  function renderPostComments() {
    return (
      <FlatList
        data={post.comments}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderPostContent}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 60 }}
      />
    );
  }

  function renderFooterTextInput() {
    return (
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: footerHeight
      }}>
        <LineDivider lineStyle={{ height: 3, backgroundColor: COLORS.lightGray }} />
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: COLORS.white,
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.radius,
          }}
        >
          {/* Text Input */}
          <TextInput
            style={{
              flex: 1,
              marginRight: SIZES.base,
              ...FONTS.body4
            }}
            ref={inputRef}
            multiline
            placeholder="Type Comment..."
            placeholderColor={COLORS.gray}
            onContentSizeChange={(event) => {
              const height = event.nativeEvent.contentSize.height;

              if (height <= 60) {
                setFooterHeight(60);
              } else if (height > 60 && height <= 100) {
                setFooterHeight(height);
              } else if (height > 100) {
                setFooterHeight(100);
              }
            }}
          />
          {/* Icon Send */}
          <IconButton icon={icons.sendMessage} iconStyle={{ tintColor: COLORS.primary }} />
        </View>
      </View>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {/* Show All Comments */}
      {renderPostComments()}

      {/* Footer */}
      {renderFooterTextInput()}
    </View>
  );
};

export default DetailPost;
