import React from 'react';
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import axios from 'axios';

export default class ImageUpload extends React.Component {
  state = {
    photo: null,
    name: 'name',
    data: [],
  };

  componentDidMount() {
    this.getData();
  }
  getData = () => {
    axios.get('http://192.168.1.32:5050/product').then(res => {
      this.setState({
        data: res.data.response,
      });
    });
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({photo: response});
      }
    });
  };
  createFormData = (photo, body) => {
    const data = new FormData();

    data.append('image_name', {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === 'android'
          ? photo.uri
          : photo.uri.replace('file://', ''),
    });

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    return data;
  };
  handleUploadPhoto = () => {
    axios
      .post(
        `http://192.168.1.32:5050/product`,
        this.createFormData(this.state.photo, {name: this.state.name}),
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then(res => {
        console.log(res);
        // navigation.navigate('HeaderTabs')
      })
      .catch(err => {
        console.log(err);
      });
  };

  //     let data = {
  //       "file": this.state.photo,
  //       "upload_preset": "kenzoymc",
  //     }

  //     fetch("http://localhost:5080/upload", {
  //       body: JSON.stringify(data),
  //       headers: {
  //         'content-type': 'application/json'
  //       },
  //       method: 'POST',
  //     }).then(async r => {
  //       let data = await r.json()
  // console.log(data)

  //     }).catch(err => console.log(err))

  //   };

  render() {
    console.log(this.state.data, 'data');
    const api = 'http://192.168.1.32:5050/';
    const {photo} = this.state;
    console.log(photo);
    return (
      <ScrollView>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          {photo && (
            <Image
              source={{uri: photo.uri}}
              style={{width: 300, height: 300}}
            />
          )}
          <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
          <View style={{height: 40, top: -120}}></View>
          <View>
            <TouchableOpacity onPress={this.handleUploadPhoto}>
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
          {this.state.data.map((d, i) => (
            <View key={i} style={{height: 400, width: 600, top: 100}}>
              <Image
                source={{uri: api + d.image_name}}
                style={{width: 300, height: 300}}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
}
