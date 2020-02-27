import React, {Component} from 'react';
import getDirections from 'react-native-google-maps-directions';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
// import getDirections from 'react-native-google-maps-directions';
import MapViewDirections from 'react-native-maps-directions';

import {getDistance} from 'geolib';
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// import CalendarPicker from 'react-native-calendar-picker';

export default class Maps extends Component {
  state = {
    latitude: -6.193667,
    longitude: 106.823024,
    latitude1: -6.218335,
    longitude1: 106.802216,
  };

  handleGetDirections = () => {
    // console.log(propsData, 'part');
    const newData = {
      //  source: {
      //   latitude: -7.797068,
      //   longitude: 110.370529
      // },
      destination: {
        latitude: this.state.latitude1,
        longitude: this.state.longitude1,
      },
      params: [
        {
          key: 'travelmode',
          value: 'driving',
        },
        {
          key: 'dir_action',
          value: 'navigate',
        },
      ],
    };

    getDirections(newData);
  };

  render() {
    const distance = getDistance(
      {latitude: this.state.latitude, longitude: this.state.longitude},
      {latitude: this.state.latitude1, longitude: this.state.longitude1},
    );
    const origin = {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    };

    const destination = {
      latitude: this.state.latitude1,
      longitude: this.state.longitude1,
    };
    const GOOGLE_MAPS_APIKEY = 'AIzaSyCKkP5V-xqzK8GmNnNAyN_cxSIYr3t29Fo';
    const speed = 30
    console.log(distance);
    const kilo = distance/1000
    const time = kilo/speed*60
    console.log(time,'time')
    return (
      <View>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          <Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}
            title="hello">
            <Callout style={{height: 120}}>
              {/* <Text>{part.location}</Text> */}

              {/* <Image
                      style={styles.imaps}
                      source={{uri: propsData.image_url}}
                    /> */}
            </Callout>
          </Marker>
          <Marker
            coordinate={{
              latitude: this.state.latitude1,
              longitude: this.state.longitude1,
            }}
            title="hello">
            <Callout style={{height: 120}}>
              {/* <Text>{part.location}</Text> */}

              {/* <Image
                      style={styles.imaps}
                      source={{uri: propsData.image_url}}
                    /> */}
            </Callout>
          </Marker>

          {/* <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
          /> */}
        </MapView>
        <View>
          <Text style={{textAlign: 'center', fontSize: 17}}>{Math.round(kilo)} KM </Text>
          <Text style={{textAlign: 'center', fontSize: 17}}>{Math.round(time)} Minutes </Text>
        </View>
        <TouchableOpacity
          style={{width: 200, justifyContent: 'center'}}
          onPress={this.handleGetDirections}>
          <Text> Telusuri Lokasi</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  map: {
    height: 400,
  },
  imaps: {
    height: 80,
    width: 80,
    marginTop: 10,
    left: 20,
  },
});
