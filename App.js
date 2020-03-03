import React,{Component} from 'react'
import {View,Text} from 'react-native'

import Cloudinary from './screen/cloudinary'
import ImageUpload from './screen/image'
import NewUpload from './screen/newUploads'
import News from './screen/news'
import Newss from './screen/newss'
import Calender from './screen/calender'
import CalenderExample from './screen/calenderpicker'
// import CalenderPicker from './screen/Calender-Picker'
import Maps from './screen/Maps'
import DateTime from './screen/DateTime'
import CalenderState from './screen/calenderstate'
import CalenderPicker from './screen/Calender-Picker'
import CustomDate from './screen/customDate'
export default class App extends Component{

  render() {
    
    return (
    <View>
      <CustomDate/>
    </View>
    )
  }
}