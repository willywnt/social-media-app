import axios from 'axios';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

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
  const [counter, setCounter] = useState(0);
  const [currentId, setCurrentId] = useState();
  const [contentHeight, setContentHeight] = useState(null);
  const headerHeight = useHeaderHeight();

  const onLayout = useCallback(event => {
    const { height } = event.nativeEvent.layout;
    setContentHeight(height);
  }, []);

  const onViewRef = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
    setCurrentId(viewableItems[0].item.id);
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const fetchPhotos = (source, id, page = 1, limit = 15) => {
    setLoading(true);
    let apiUrl = `https://jsonplaceholder.typicode.com/photos?_limit=${limit}&albumId=${id}&_page=${page}`;
    axios.get(apiUrl, { cancelToken: source.token })
      .then(response => {
        if (response.status === 200) {
          if (response.data.length > 0) {
            setPhotos(prevState => [
              ...prevState,
              ...response.data
            ])
          } else {
            albums[currentIndex].hasMoreToLoad = false;
          }
          setLoading(false);
        } else {
          console.log(response.data);
        }
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('successfully aborted fetch photos');
        } else {
          // handle error
          console.log(error);
        }
      });
  };

  if (lastId < currentId) {
    setLastId(currentId);
  }

  // handle initial fetching photos
  useEffect(() => {
    const source = axios.CancelToken.source();
    if (lastId) {
      fetchPhotos(source, lastId);
    }

    return () => {
      source.cancel();
    }
  }, [lastId]);

  // handle load more fetching photos
  useEffect(() => {
    const source = axios.CancelToken.source();
    if (albums.length) {
      let page = albums[currentIndex].page;
      fetchPhotos(source, currentId, page);
    }

    return () => {
      source.cancel();
    }
  }, [counter])

  useEffect(() => {
    const source = axios.CancelToken.source();
    let apiUrl = `https://jsonplaceholder.typicode.com/albums?userId=${currentUser.id}`;
    axios.get(apiUrl, { cancelToken: source.token })
      .then(response => {
        if (response.status === 200) {
          let res = response.data.map(album => ({ ...album, page: 1, hasMoreToLoad: true }));
          setAlbums(res);
          setLastId(response.data[0].id);
        } else {
          console.log(response.data);
        }
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('successfully aborted fetch albums');
        } else {
          // handle error
          console.log(error);
        }
      });


    return () => {
      source.cancel();
    }
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
      <View
        onLayout={onLayout}
      >
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

        {/* Album Indicator */}
        <Text
          style={{
            paddingHorizontal: SIZES.padding,
            color: COLORS.darkGray, ...FONTS.h2,
            fontSize: SIZES.h3,
            marginVertical: SIZES.radius
          }}>Albums ({currentIndex + 1}/{albums.length})</Text>
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
            aspectRatio: 1,
          }}
          source={{
            uri: item.thumbnailUrl,
          }}
        />
      </TouchableOpacity>
    );
  };

  const renderLoader = () => {
    return (
      loading ? <View
        style={{ width: SIZES.width, height: 80, justifyContent: 'center', alignItems: 'center' }}
      >
        <ActivityIndicator size="large" color={COLORS.darkGray} />
      </View> : null
    )
  }

  const handleLoadMore = () => {
    if (!albums[currentIndex].hasMoreToLoad || loading) {
      return null;
    }
    albums[currentIndex].page += 1;

    // trigger load more
    setCounter(counter + 1);
  }

  const renderAlbumsTitle = ({ item }) => {
    let filteredPhotos = photos.filter(a => a.albumId === item.id);
    return (
      <View style={{ width: SIZES.width }}>
        <View style={{
          paddingHorizontal: SIZES.padding,
          height: 65,
          justifyContent: 'center',
          backgroundColor: COLORS.lightGray
        }}>
          {/* Album Title */}
          <Text
            style={{ color: COLORS.darkGray, ...FONTS.h4, fontSize: 16 }}
          >{item.title}</Text>
        </View>
        <FlatList
          data={filteredPhotos}
          keyExtractor={item => `Photos-${item.id}`}
          numColumns={3}
          horizontal={false}
          renderItem={renderPhotos}
          ListFooterComponent={renderLoader}
          onEndReached={handleLoadMore}
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
        />
      </View>
    )
  }

  function renderListAlbums() {
    return (
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
    )
  }

  return (
    <ScrollView
      style={{
        backgroundColor: COLORS.white,
      }}
      contentContainerStyle={{
        height: SIZES.height > 800 ?
          SIZES.height + contentHeight - headerHeight :
          SIZES.height + contentHeight - headerHeight - StatusBar.currentHeight
      }}
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
    >
      {/* User Info */}
      {renderUserInfo()}

      {/* Albums */}
      {renderListAlbums()}
    </ScrollView>
  );
};

export default DetailUser;
