import React, { Component } from 'react';
import { View, StatusBar, Text, Button, Image, ScrollView, ActivityIndicator, Linking } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import FormData from 'form-data';
import axios from 'axios';
import Modal from 'react-native-modal';

class NewUpload extends Component {

  state = {
    profilePicturePath: '',
    profilePictureMime: '',
    profileBackgroundPath: '',
    profileBackgroundMime: '',
    isUploading: false,
    isModalVisible: false,
    uploadedFiles: []
  };

  onSubmit = async () => {
    const { profilePicturePath, profilePictureMime, profileBackgroundPath, profileBackgroundMime } = this.state;

    let formData = new FormData();
    formData.append('image', {
      uri: profilePicturePath,
      name: `profilePicture.${profilePictureMime.split('/')[1]}`,
      type: profilePictureMime
    })
    formData.append('image', {
      uri: profileBackgroundPath,
      name: `profileBackground.${profileBackgroundMime.split('/')[1]}`,
      type: profileBackgroundMime
    })

    this.setState({ isUploading: true, isModalVisible: true, uploadedFiles: [] });
    try {
      const { data } = await axios({
        method: 'POST',
        url: 'http://localhost:3000/upload',
        data: formData
      })
      this.setState({
        isUploading: false,
        profilePicturePath: '',
        profilePictureMime: '',
        profileBackgroundPath: '',
        profileBackgroundMime: '',
        uploadedFiles: data.files
      });
    } catch (error) {
      this.setState({ isUploading: false, isModalVisible: false });
    }
  }

  renderModal = () => {
    const { isUploading, isModalVisible } = this.state;
    return (
      <Modal isVisible={isModalVisible}>
        <View style={{
          paddingVertical: 25,
          paddingHorizontal: 10,
          backgroundColor: 'white',
          elevation: 2,
          borderRadius: 8,
          alignItems: 'center'
        }}>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>{isUploading ? 'Uploading' : 'Successfuly uploaded your file!'}</Text>
          {isUploading ? (
            <ActivityIndicator
              size="small"
              color="#0000ff"
              style={{ marginLeft: 10 }}
            />
          ) : (
              <View style={{ width: '50%' }}>
                <Button title="OK" onPress={() => this.setState({ isModalVisible: false })} />
              </View>
            )}
        </View>
      </Modal>
    )
  }

  onPressProfilePicture = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 500,
        height: 500,
        cropping: true,
        multiple: true
      })

      this.setState({
        profilePicturePath: image.path,
        profilePictureMime: image.mime
      })
    } catch (error) {
      console.log(error);
    }
  };

  onPressProfileBackground = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 500,
        height: 500,
        cropping: true
      })

      this.setState({
        profileBackgroundPath: image.path,
        profileBackgroundMime: image.mime
      })
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { profilePicturePath, profileBackgroundPath, uploadedFiles } = this.state;
    return (
      <ScrollView>
        <StatusBar barStyle="dark-content" />
        <View>
          <Text style={{ textAlign: 'center', marginBottom: 40, fontSize: 40 }}>Multiple Upload example</Text>
          <View style={{ alignItems: 'center' }}>
            {profilePicturePath && profileBackgroundPath ? (
              <View style={{ marginBottom: 20, flexDirection: 'row' }}>
                <Button title="Submit" color="red" onPress={this.onSubmit} />
              </View>
            ) : null}
            {profilePicturePath ? <Image source={{ uri: this.state.profilePicturePath }} style={{ width: 200, height: 200, marginBottom: 20 }} /> : null}
            <View style={{ marginBottom: 20 }}>
              <Button title="Pick Profile Picture" onPress={this.onPressProfilePicture} />
            </View>
            {profileBackgroundPath ? <Image source={{ uri: this.state.profileBackgroundPath }} style={{ width: 200, height: 200, marginBottom: 20 }} /> : null}
            <View style={{ marginBottom: 20 }}>
              <Button title="Pick Profile Background" onPress={this.onPressProfileBackground} />
            </View>
          </View>
          {uploadedFiles.length ? (
            <View style={{ alignItems: 'center' }}>
              <Text style={{ marginBottom: 15 }}>Here is your uploaded file public URL:</Text>
              {uploadedFiles.map(file => {
                return (
                  <>
                    <Text>
                      {file.originalname.includes('profilePicture') ? 'Profile Picture Public Url' : 'Profile Background Public Url'}
                    </Text>
                    <Text style={{ color: 'skyblue', textAlign: 'center', marginBottom: 10 }} onPress={() => Linking.openURL(file.cloudStoragePublicUrl)}>{file.cloudStoragePublicUrl}</Text>
                  </>
                )
              })}
            </View>
          ) : null}
        </View>
        {this.renderModal()}
      </ScrollView>
    );
  }
}

export default NewUpload;