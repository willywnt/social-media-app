import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { LineDivider } from '../../components';
import { COLORS, FONTS, SIZES } from '../../constants';

const DetailUser = ({ route, navigation }) => {
  const { currentUser } = route.params;
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [lastId, setLastId] = useState();
  const [currentId, setCurrentId] = useState();

  const onViewRef = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
    setCurrentId(viewableItems[0].item.id);
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const fetchPhotos = id => {
    setLoading(true);
    let apiUrl = `https://jsonplaceholder.typicode.com/photos?albumId=${id}`;
    axios.get(apiUrl)
      .then(response => {
        if (response.status === 200) {
          let newPhotos = [...photos, ...response.data]
          setPhotos(newPhotos);
          setLoading(false);
        } else {
          console.log(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  if (lastId < currentId) {
    setLastId(currentId);
  }

  useEffect(() => {
    fetchPhotos(lastId);
  }, [lastId]);

  useEffect(() => {
    let apiUrl = `https://jsonplaceholder.typicode.com/albums?userId=${currentUser.id}`;
    axios.get(apiUrl)
      .then(response => {
        if (response.status === 200) {
          setAlbums(response.data);
          setLastId(response.data[0].id);
          fetchPhotos(response.data[0].id);
        } else {
          console.log(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [currentUser.id]);

  const UserInfoSection = ({ label, data }) => {
    return (
      <View style={{ marginHorizontal: SIZES.padding, marginBottom: SIZES.radius }}>
        <Text style={{ color: COLORS.gray, ...FONTS.body5 }}>{label}</Text>
        <Text style={{ color: COLORS.darkGray, ...FONTS.h4 }}>{data}</Text>
        <LineDivider lineStyle={{ backgroundColor: COLORS.gray4 }} />
      </View>
    )
  }

  function renderUserInfo() {
    return (
      <View>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: SIZES.padding }}>
          {/* Photo */}
          <Icon
            name="person-circle"
            size={80}
            color={COLORS.primary}
          />
          {/* Name */}
          <Text
            style={{ color: COLORS.darkGray, ...FONTS.h3, fontSize: 18 }}
          >
            {currentUser.name}
          </Text>
        </View>
        {/* Email */}
        <UserInfoSection label="Email" data={currentUser.email} />
        {/* Address */}
        <UserInfoSection
          label="Address"
          data={`${currentUser.address.street}, ${currentUser.address.suite}, ${currentUser.address.city}, ${currentUser.address.zipcode}`} />
        {/* Company */}
        <UserInfoSection label="Company" data={currentUser.company.name} />
      </View>
    )
  }

  const renderPhotos = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ borderWidth: 1, borderColor: COLORS.white }}
        onPress={() => {
          navigation.navigate("DetailPhoto", { item });
        }}>
        {/* Thumbnail */}
        <Image
          style={{
            width: SIZES.width / 3,
            height: SIZES.width / 3,
          }}
          source={{
            uri: item.thumbnailUrl,
          }}
        />
      </TouchableOpacity>
    );
  };

  const renderAlbumsTitle = ({ item }) => {
    let filteredPhotos = photos.filter(a => a.albumId === item.id);
    return (
      <View style={{ width: SIZES.width }}>
        <View style={{
          paddingHorizontal: SIZES.padding,
          height: 65,
          justifyContent: 'center',
          marginTop: SIZES.base,
          backgroundColor: COLORS.lightGray
        }}>
          {/* Album Title */}
          <Text
            style={{ color: COLORS.darkGray, ...FONTS.h4, fontSize: 16 }}
          >{item.title}</Text>
        </View>
        {
          loading ? (
            <ActivityIndicator size="large" color={COLORS.darkGray} style={{ marginTop: SIZES.padding }} />
          ) : (
            <FlatList
              data={filteredPhotos}
              keyExtractor={item => `Photos-${item.id}`}
              numColumns={3}
              horizontal={false}
              renderItem={renderPhotos}
            />
          )
        }
      </View >
    )
  }

  function renderListAlbums() {
    return (
      <View>
        {/* Album Indicator */}
        <Text
          style={{
            paddingHorizontal: SIZES.padding,
            color: COLORS.darkGray, ...FONTS.h2,
            fontSize: SIZES.h3,
            marginTop: SIZES.padding
          }}>Albums ({currentIndex + 1}/{albums.length})</Text>

        <FlatList
          data={albums}
          keyExtractor={item => `AlbumsTitle-${item.id}`}
          renderItem={renderAlbumsTitle}
          horizontal
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          pagingEnabled
        />
      </View>
    )
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {/* User Info */}
      {renderUserInfo()}

      {/* Albums */}
      {renderListAlbums()}
    </ScrollView>
  );
};


export default DetailUser;
