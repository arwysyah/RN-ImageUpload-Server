
import React, { Component } from 'react'
import DatePicker from 'react-native-custom-datetimepicker'
 
export default class MyDatePicker extends Component {
  constructor(props){
    super(props)
    this.state = {date:"2016-05-15"}
  }
 
  render(){
      console.log(this.state.date)
    return (
      <DatePicker
        style={{width: 200}}
        date={this.state.date}
       mode= {'datetime'}
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2020-02-01"
        maxDate="2040-06-01"
        locale='en'
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
    )
  }
}