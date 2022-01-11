import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

import {LineDevider} from '../../components';
import {COLORS, FONTS, SIZES} from '../../constants';

const DetailUser = ({route}) => {
  const {currentUser} = route.params;
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageSource, setImageSource] = useState(null);
  const [imageTitle, setImageTitle] = useState(null);
  const [loading, setLoading] = useState(true);

  const slideInfo = [
    {...currentUser.address, id: '1'},
    {...currentUser.company, id: '2'},
  ];

  const fetchPhotos = ids => {
    let apiUrl = `https://jsonplaceholder.typicode.com/photos?albumId=${ids}`;
    axios({
      url: apiUrl,
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then(response => {
        if (response.status === 200) {
          setPhotos(response.data);
          setLoading(false);
        } else {
          console.log(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    let apiUrl = `https://jsonplaceholder.typicode.com/albums?userId=${currentUser.id}`;
    axios({
      url: apiUrl,
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then(response => {
        if (response.status === 200) {
          setAlbums(response.data);
          return response.data;
        } else {
          console.log(response.data);
        }
      })
      .then(res => {
        let ids = res
          .map(item => {
            return item.id;
          })
          .join('&albumId=');

        fetchPhotos(ids);
      })
      .catch(error => {
        console.log(error);
      });
  }, [currentUser.id]);

  const renderUserInfoSlide = ({item}) => {
    return item.id === '1' ? (
      <View
        style={[
          styles.card,
          {marginRight: SIZES.radius, marginLeft: SIZES.padding},
        ]}>
        <MaterialCommunityIcons
          name="map-marker-radius"
          size={40}
          color={COLORS.darkBlue}
        />
        <Text style={styles.font}>
          {item.street}, {item.suite}, {item.city}, {item.zipcode}
        </Text>
      </View>
    ) : (
      <View style={[styles.card, {marginRight: SIZES.padding}]}>
        <MaterialCommunityIcons
          name="office-building"
          size={40}
          color={COLORS.darkBlue}
        />
        <Text style={styles.font}>
          {item.name}
          {'\n'}
          {item.catchPhrase}
          {'\n'}
          {item.bs}
        </Text>
      </View>
    );
  };

  function renderAddressAndCompany() {
    return (
      <FlatList
        data={slideInfo}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        keyExtractor={item => item.id}
        renderItem={renderUserInfoSlide}
      />
    );
  }

  function renderUserInfo() {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: SIZES.padding,
        }}>
        <Ionicons name="person-circle" size={120} color={COLORS.primary} />
        <Text style={[styles.font, {fontSize: 24, lineHeight: 24}]}>
          {currentUser.name}
        </Text>
        <Text
          style={[
            styles.font,
            {fontSize: 18, lineHeight: 18, marginTop: SIZES.base},
          ]}>
          {currentUser.email}
        </Text>

        {/* Address & Company Slider */}
        {renderAddressAndCompany()}
        <LineDevider lineStyles={{marginTop: 20}} />
      </View>
    );
  }

  const renderPhotos = ({item}) => {
    return (
      <TouchableOpacity
        style={{borderWidth: 1, borderColor: COLORS.white}}
        onPress={() => {
          setModalVisible(!modalVisible);
          setImageSource(item.url);
          setImageTitle(item.title);
        }}>
        <Image
          style={styles.imageThumbnail}
          source={{
            uri: item.thumbnailUrl,
          }}
        />
      </TouchableOpacity>
    );
  };
  const renderAlbums = ({item}) => {
    let filteredPhotos = photos.filter(a => a.albumId === item.id);
    return (
      <View>
        <Text
          style={[
            styles.font,
            {
              fontSize: 18,
              lineHeight: 18,
              textAlign: 'left',
              marginVertical: 20,
              marginHorizontal: SIZES.radius,
            },
          ]}>
          {item.title}
        </Text>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.darkGray} />
        ) : (
          <FlatList
            data={filteredPhotos}
            keyExtractor={item => item.id}
            numColumns={3}
            horizontal={false}
            renderItem={renderPhotos}
          />
        )}
      </View>
    );
  };
  function renderUserInfoAndListAlbums() {
    return (
      <FlatList
        data={albums}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderUserInfo}
        renderItem={renderAlbums}
      />
    );
  }

  function renderModalImageView() {
    return (
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setImageSource(null);
          setImageTitle(null);
        }}>
        <View style={styles.centeredView}>
          <Pressable
            style={{
              width: 40,
              height: 40,
              position: 'absolute',
              right: 10,
              top: 10,
              zIndex: 100,
            }}
            onPress={() => {
              setModalVisible(!modalVisible);
              setImageSource(null);
              setImageTitle(null);
            }}>
            <MaterialCommunityIcons
              name="close-circle"
              size={40}
              color={COLORS.white}
            />
          </Pressable>
          <ReactNativeZoomableView
            zoomEnabled={true}
            maxZoom={1.5}
            minZoom={1}
            zoomStep={0.5}
            initialZoom={1}
            bindToBorders={true}
            captureEvent={true}
            doubleTapZoomToCenter={true}
            style={styles.zoomableView}>
            <Image style={styles.imageLarge} source={{uri: imageSource}} />
          </ReactNativeZoomableView>
          <Text style={styles.imageTitle}>{imageTitle}</Text>
        </View>
      </Modal>
    );
  }

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
      }}>
      {/* User Info & List of Albums */}
      {renderUserInfoAndListAlbums()}

      {/* Modal Pop Up Image View */}
      {renderModalImageView()}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZES.padding,
    width: SIZES.width - SIZES.padding * 2,
    backgroundColor: COLORS.ocean,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
  },
  font: {
    flex: 1,
    textAlign: 'center',
    color: COLORS.black,
    ...FONTS.h4,
    lineHeight: 18,
  },
  imageThumbnail: {
    width: SIZES.width / 3,
    height: SIZES.width / 3,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SIZES.width,
    height: SIZES.height,
    backgroundColor: COLORS.black,
  },
  imageLarge: {
    width: SIZES.width,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  imageTitle: {
    color: COLORS.white,
    ...FONTS.h2,
    position: 'absolute',
    bottom: 40,
  },
  zoomableView: {
    position: 'absolute',
  },
});

export default DetailUser;
