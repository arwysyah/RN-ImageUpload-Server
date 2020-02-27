import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image,Bu} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'rn-fetch-blob';

// Add your Cloudinary name here
const YOUR_CLOUDINARY_NAME = "kenzo"

// If you dont't hacve a preset id, head over to cloudinary and create a preset, and add the id below
const YOUR_CLOUDINARY_PRESET = "your_cloudinary_preset"

export default class  Cloudinary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            avatarSource: null,
            uploadingImage: false
        }
        this.submit = this.submit.bind(this)
    }

    submit () {
        var options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.showImagePicker(options, (response) => {


            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                this.setState({
                    uploadingImg: true
                });
                uploadFile(response)
                    .then(response => response.json())
                    .then(result => {
                        this.setState({
                            avatarSource: { uri: result.secure_url },
                            uploadingImg: false
                        });
                    })

            }
        });
    }

uploadFile=(file)=> {
    return RNFetchBlob.fetch('POST', 'https://api.cloudinary.com/v1_1/' + YOUR_CLOUDINARY_NAME + 'CLOUDINARY_URL=cloudinary://626316683862862:JTDDl3ibdNwhlrRmdJnplA3TbRo@kenzo', {
        'Content-Type': 'multipart/form-data'
    }, [
            { name: 'file', filename: file.fileName, data: RNFetchBlob.wrap(file.origURL) }
        ])
}

    render() {
        return (
            <View>
                <View style={{height:380}}></View>
            <View style={style.container}>
                <Text style={style.header}>React Native Image Upload with Cloudinary!</Text>
                {
                    this.state.uploadingImg ?
                    <Text>Uploading...</Text> :
                    <TouchableOpacity onPress={this.submit} style={style.imgBtn}>
                        {
                            this.state.avatarSource ?
                                <Image source={this.state.avatarSource} style={style.image} /> :
                                null
                        }
                    </TouchableOpacity>
                }
            </View>
            </View>
        )
    }
}


const style = StyleSheet.create({
    header: {
       
        top: -70,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA",
        alignItems: 'center',
        justifyContent: "center"
    },
    imgBtn: {
        height: 80,
        width: 80,
        borderRadius: 40,
        backgroundColor: "#333",
        marginBottom: 20
    },
    image: {
        height: 0,
        width: 80,
        borderRadius: 40
    }
})