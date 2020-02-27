import React, {Component} from 'react';
import {View, Text} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
export default class CalenderPicker extends Component {
  constructor() {
    super();
    this.state = {selectedStartDate: null, selectedEndDate: null};
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date, type) {
    if (type === 'END_DATE') {
      this.setState({
        selectedEndDate: date,
      });
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null,
      });
    }
  }
  dateFormats = date_data => {
    let arrDate = String(date_data)
      .slice(0, 10)
      .split("/")
      .reverse();

    return arrDate;
  };
 getDates = (startDate, endDate)=> {
    var dates = [],
        currentDate = startDate,
        addDays = function(days) {
          var date = new Date(this.valueOf());
          date.setDate(date.getDate() + days);
          return date;
        };
    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  };
  
  // Usage
 
  render() {
    const { selectedStartDate, selectedEndDate } = this.state;
    const minDate = new Date(); // Today
    const maxDate = new Date(2022, 6, 3);
    const startDate  =  selectedStartDate ? selectedStartDate : '';
    const endDate = selectedEndDate ? selectedEndDate : '';
    // console.log(startDate,endDate)
    // var dates = this.getDates(new Date(2013,10,22), new Date(2013,11,25));         
    var dates = this.getDates(startDate, endDate);                                                                                                    
    dates.forEach(function(date) {
      console.log(date);
    });
    return (
      <View>
          <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          minDate={minDate}
          maxDate={maxDate}
          todayBackgroundColor="#f2e6ff"
          selectedDayColor="#7300e6"
          selectedDayTextColor="#FFFFFF"
          onDateChange={this.onDateChange}
        />
 
        <View style={{alignItems:'center',paddingHorizontal:20}}>
              <Text> Start Date:  {this.dateFormats(startDate)}</Text>
               <Text>  End Date : {this.dateFormats(endDate)}</Text>
               {/* <Text>  Total Price : Rp. {this.formatNumber(totalPrice)}</Text> */}
        </View>
      </View>
    );
  }
}
