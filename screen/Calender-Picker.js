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
      currentDate = addDays.call(currentDate,1);
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
    let data= []                                                                                                  
    dates.forEach(function(date) {
      console.log(date,'date');
    
      data.push(date)
      
    });
    console.log(data,'awal')
    const array=[]
    for (let i = 0;i<data.length;i++){
    
     if(i %2===0){
    array.push(data[i])

     } 
    }
     console.log(array,'array')
    // data.shift()
    // console.log(data,'data')
    // console.log(data[0],'daa')
  
    // console.log('object',typeof(data))
    
    return (
      <View>
          <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          minRangeDuration={7}

          minDate={minDate}
          maxDate={maxDate}
          todayBackgroundColor="#f2e6ff"
          selectedDayColor="red"
          selectedDayTextColor="#FFFFFF"
          onDateChange={this.onDateChange}
          
        />
 
        <View style={{alignItems:'center',paddingHorizontal:20}}>
              <Text> Start Date:  {this.dateFormats(startDate)}</Text>
               <Text>  End Date : {this.dateFormats(endDate)}</Text>

               <View>
                 {array.map((d,i)=>(
                   <Text>{this.dateFormats(d)}</Text>
                 ))}
               </View>
               {/* <Text>  Total Price : Rp. {this.formatNumber(totalPrice)}</Text> */}
        </View>
      </View>
    );
  }
}
