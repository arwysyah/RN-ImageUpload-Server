import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
export default class CalenderPicker extends Component {
  constructor() {
    super();
    this.state = {selectedStartDate: null, selectedEndDate: []};
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date, type) {

    this.setState ({
        selectedStartDate:date,
       
      })

      if(this.state.selectedStartDate){
        this.state.selectedEndDate.push(this.dateFormats(this.state.selectedStartDate))

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
 onsubmit=()=>{
     var dat= this.dateFormats(this.state.selectedEndDate)
     console.log(dat,'da')

 }
  render() {
    // this.state.selectedEndDate.push(this.state.selectedStartDate)

    console.log('object',this.state.selectedEndDate)
    const { selectedStartDate, selectedEndDate } = this.state;
    const minDate = new Date(); // Today
    const maxDate = new Date(2022, 6, 3);
    const startDate  =  selectedStartDate ? selectedStartDate : '';
    
    const endDate = selectedEndDate ? selectedEndDate : '';
    // console.log(startDate,endDate)
    // var dates = this.getDates(new Date(2013,10,22), new Date(2013,11,25));         
    var dates = this.getDates(startDate, endDate); 
    console.log(startDate,'d') 
    let data= []                                                                                                  
    dates.forEach(function(date) {
    //   console.log(date,'date');
    
      data.push(date)
      
    });
    // console.log(data,'awal')
    data.shift()
    // console.log(data,'data')
    // console.log('object',typeof(data))
    // console.log(Object)
    console.log(startDate,'saa')
    return (
      <View>
          <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={false}
          minDate={minDate}
          maxDate={maxDate}
          todayBackgroundColor="#f2e6ff"
          selectedDayColor="#7300e6"
          selectedDayTextColor="#FFFFFF"
          onDateChange={this.onDateChange}
        />
       
        <View style={{alignItems:'center',paddingHorizontal:20}}>
              <Text> Start Date:  {this.dateFormats(startDate)}</Text>
               {/* <Text>  End Date : {this.dateFormats(endDate)}</Text> */}
               {/* <Text>  Total Price : Rp. {this.formatNumber(totalPrice)}</Text> */}
               <Text >Tanggal Yang Dipilih </Text>
               {selectedEndDate.map((d,i)=>{
            return(
        <View key={i}> 
            <Text>{d}</Text>
        </View>
 )
})}
        </View>
        <TouchableOpacity onPress={()=>{this.onsubmit()}}><Text>
            hello</Text></TouchableOpacity>
      </View>
    );
  }
}
