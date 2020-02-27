import React, { Component } from 'react';
import { View, Text, Image, Button, Platform, ScrollView } from 'react-native';
import ImagePicker from "react-native-image-picker";

const createFromData = (photos, body) => {
  const data = new FormData();

  photos.forEach(photo => {
    data.append("photo", {
      name: photo.fileName,
      type: photo.type,
      uri: Platform.OS === 'android' ? photo.uri: photo.uri.replace("file://", "")
    });
  })

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};

const uploadFileWithProgress = (url, opts = {}, onProgress) => new Promise((res, rej) => {
  const xhr = new XMLHttpRequest();
  xhr.open(opts.method || 'get', url);

  Object.keys(opts.headers || {}).forEach(value => {
    xhr.setRequestHeader(value, opts.headers[value]);
  });

  if (xhr.upload && onProgress) {
    xhr.upload.onprogress = onProgress;
  }

  xhr.timeout = 10000;
  xhr.ontimeout = rej;

  xhr.onload = e => {
    res(e.target.response);
  }

  xhr.onerror = rej;

  xhr.send(opts.body);
});

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // photo: null,
      photos: [],
      progress: 0
    };
  }

  handleUploadPhoto = () => {
    // fetch("http://localhost:3000/api/upload", {
    //   method: 'POST',
    //   body: createFromData(this.state.photo, { userId: '23' })
    // })
    // .then(response => response.json())
    // .then(response => {
    //   console.log("upload success ", response);
    //   alert("upload success");
    //   this.setState({ photo: null });
    // })
    // .catch(error => {
    //   console.log('upload error', error);
    //   alert('Upload failed!');
    // })
    // uploadFileWithProgress("http://192.168.1.41:3000/api/upload", {
    uploadFileWithProgress("http://192.168.1.41:3000/api/upload", {
      method: 'POST',
      body: createFromData(this.state.photos, { userId: '23' })
    },
    event => {
      const progress = Math.floor((event.loaded / event.total) * 100);
      console.log("progress ", progress);
      this.setState({ progress });      
    })
    .then(response => {
      console.log("upload success ", response);
      alert("upload success");
      this.setState({ 
        // photo: null, 
        photos: [],
        progress: 0 
      });
    })
    .catch(error => {
      console.log('upload error', error);
      alert('Upload failed!');
    })
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
      maxWidth: 500
    };
    ImagePicker.launchImageLibrary(options, response => {
      // console.log("response", response);
      if (response.uri) {
        // this.setState({ photo: response })
        this.setState( state => {
          return {
            photos: [...state.photos, response]
          }
        })
      }
    });
  }

  render() {
    // const { photo, progress } = this.state;
    const { photos, progress } = this.state;
    return (
        <ScrollView>
      <View style={{
      alignItems: 'center', justifyContent: 'center',
      }}>
        {photos.map(photo => (
            <Image key={photo.uri}
              source={{uri: photo.uri}}
              style={{ width: 300, height: 300 }}
              resizeMode="cover"
            />
        ))}
        {photos.length > 0 && (
          <React.Fragment>
            <Text>Progress: {progress}%</Text>
            <Button title="Upload photo" onPress={this.handleUploadPhoto} />
          </React.Fragment>
        )}
        <Button 
          title="Choose Photo"
          onPress={this.handleChoosePhoto}
        />
      </View>
      </ScrollView>
    );
  }
}