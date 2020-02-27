import React from 'react';
import {View, Text} from 'react-native';
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from 'react-native-calendars';
import CalendarPicker from 'react-native-calendar-picker';


LocaleConfig.locales['fr'] = {
  monthNames: [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'October',
    'November',
    'Décember',
  ],
  monthNamesShort: [
    'Jan.',
    'Fb.',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul.',
    'Agus',
    'Sept',
    'Okt',
    'Nov',
    'Dec',
  ],
  dayNames: [
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu',
    'Minggu',
  ],
  dayNamesShort: ['Sen.', 'Sel.', 'Rab.', 'Kam.', 'Jum.', 'Sab.', 'Min.'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'fr';

export default class Calender extends React.Component {
    state = {
        selectedStartDate: null,
       
            currentDate: new Date(),
            minDate:new Date()

           
        }
      
      dateFormats = date_data => {
        let arrDate = String(date_data)
          .slice(0, 10)
          .split("/")
          .reverse();
    
        return arrDate;
      };
  render() {
    const {data, isLoading, selectedStartDate, selectedEndDate,currentDate,minDate} = this.state;
    const calendar={
        currentDate,minDate
        
    }
    console.log('calender',calendar)

    // const minDate = new Date(); // Today
    // const maxDate = new Date(2022, 6, 3);
    // console.log(this.state.Calendar)
    // // let startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
    // // let  endDate = selectedEndDate ? selectedEndDate.toString() : '';
    // const oneDay = 24 * 60 * 60 * 1000; 
    // let startDate  =  selectedStartDate ? selectedStartDate : '';
   
    // let  endDate = selectedEndDate ? selectedEndDate: '';
    // const diffDays = Math.round(Math.abs((Number(endDate)-Number(startDate)) / oneDay)+1)
    return (
      <View>
        <View>
        {/* <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          minDate={minDate}
          maxDate={maxDate}
          todayBackgroundColor="#f2e6ff"
          selectedDayColor="#7300e6"
          selectedDayTextColor="#FFFFFF"
          onDateChange={this.onDateChange}
        /> */}
        </View>
        <View>
        <Calendar
  // Collection of dates that have to be colored in a special way. Default = {}
  markedDates={
  this.dateFormats(this.state.calendar)}
  // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
  markingType={'period'}
/>
        </View>
      </View>
    );
  }
}
