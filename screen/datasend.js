import React, {Component} from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';

export default class DataSend extends Component {
  state = {
    data: [],
    id_item:[]
  };

  componentDidMount() {
    this.getData();
  }
  getData = () => {
    axios
      .get('http://192.168.1.3:8000/vendoritem')
      .then(res => {
        this.setState({
          data: res.data.response,
        });
      })
      .then(reso => {
        const {data,id_item} = this.state;
   data.map((d,i)=>{
       
       return(
           this.setState({
               id_item:d.id_item
           })
       )
   })
//    skkdka
     console.log('object',this.state.id_item)

      axios.get(`http://192.168.1.3:8000/vendoritem/data/${this.state.id_item}`).then((res)=>{
          console.log(res)
      })

           console.log('res',this.state.data.id_item)
      });
  };
  render() {
    // console.log(this.state.data);
    return (
      <View>
        <Text>Hello</Text>
      </View>
    );
  }
}
