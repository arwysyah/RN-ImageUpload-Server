import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import DateTime from 'react-native-customize-selected-date';
import _ from 'lodash';

export default class CustomDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: '',
      data: [],
    };
  }

  onChangeDate(date) {
    alert(date);
    this.setState({
      data: [...this.state.data, date],
    });
    console.log(this.state.data, 'date');
  }

  renderChildDay(day) {
    //   if(this.state.data.filter(da,i=>da.id_product!=id))
    if (_.includes(this.state.data, day)) {
      return (
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/hungdev/react-native-customize-selected-date/master/Example/src/Images/ic_lock_green.png',
          }}
          style={styles.icLockRed}
        />
      );
    }
   
  }
  handleDelete = async e => {
    console.log('ggg');
    let array = [...this.state.data];
    let index = array.indexOf(e.target.value);

    array.splice(index, 1);
    this.setState({data: array});
  };
  render() {
    
    console.log(this.state.data, 'da');
    return (
      <View style={styles.container}>
        <DateTime
          date={this.state.time}
          changeDate={date => this.onChangeDate(date)}
          format="YYYY-MM-DD"
          renderChildDay={day => this.renderChildDay(day)}
        />

     
          {this.state.data.map((d, i) => {
            return (
              <View style={{height:20,flexDirection:"row"}}>
                <Text>{d}</Text>
                <TouchableOpacity onPress={(e)=>{this.handleDelete(e)}}><Text>Delete</Text></TouchableOpacity>
             </View>
            );
          })}
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icLockRed: {
    width: 13 / 2,
    height: 9,
    position: 'absolute',
    top: 2,
    left: 1,
  },
  warp: {
    backgroundColor: 'white',
  },
});
