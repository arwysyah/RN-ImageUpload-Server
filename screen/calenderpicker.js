import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
LocaleConfig.locales['fr'] = {
  monthNames: [
    'January',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'Novembet',
    'Desember',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Agu',
    'Sept',
    'Okt.',
    'Nov',
    'Des.',
  ],
  dayNames: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'fr';

export default class CalendarExample extends React.Component {
 

state = {
    selected: undefined
  };


onDayPress = (day) => {
  this.setState({selected: day.dateString});
}
//   onDayPress = day => {
//     if (this.state.isStartDatePicked == false) {
//       let markedDates = {};
//       markedDates[day.dateString] = {
//         startingDay: true,
//         color: '#00B0BF',
//         textColor: '#FFFFFF',
//       };
//       this.setState({
//         markedDates: markedDates,
//         isStartDatePicked: true,
//         isEndDatePicked: false,
//         startDate: day.dateString,
//       });
//     } else {
//       let markedDates = this.state.markedDates;
//       let startDate = moment(this.state.startDate);
//       let endDate = moment(day.dateString);
//       let range = endDate.diff(startDate, 'days');
//       if (range > 0) {
//         for (let i = 1; i <= range; i++) {
//           let tempDate = startDate.add(1, 'day');
//           tempDate = moment(tempDate).format('YYYY-MM-DD');
//           if (i < range) {
//             markedDates[tempDate] = {color: '#00B0BF', textColor: '#FFFFFF'};
//           } else {
//             markedDates[tempDate] = {
//               endingDay: true,
//               color: '#00B0BF',
//               textColor: '#FFFFFF',
//             };
//           }
//         }
//         this.setState({
//           markedDates: markedDates,
//           isStartDatePicked: false,
//           isEndDatePicked: true,
//           startDate: '',
//         });
//       } else {
//         alert('Select an upcomming date!');
//       }
//     }
//   };

  render() {
    let current = new Date();
    return (
      <View>
       <Calendar
  // Initially visible month. Default = Date()
  current={current}
  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
  minDate={current}
  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
  maxDate={'2022-05-30'}

  markingType={'multi-dot'}
  markedDates={{
    [this.state.selected]: {
      selected: true, 
      disableTouchEvent: true, 
      selectedDotColor: 'orange'
    }
  }}
  theme={{
    calendarBackground: '#333248',
    textSectionTitleColor: 'white',
    dayTextColor: 'red',
    todayTextColor: 'white',
    selectedDayTextColor: 'white',
    monthTextColor: 'white',
    indicatorColor: 'white',
    selectedDayBackgroundColor: '#333248',
    arrowColor: 'white',
    // textDisabledColor: 'red',
    'stylesheet.calendar.header': {
      week: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
      }
    }
  }}
  // Handler which gets executed on day press. Default = undefined
  onDayPress={(day) => {console.log('selected day', day)}}
  // Handler which gets executed on day long press. Default = undefined
  onDayLongPress={(day) => {console.log('selected day', day)}}
  // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
  monthFormat={'yyyy MM'}
  // Handler which gets executed when visible month changes in calendar. Default = undefined
  onMonthChange={(month) => {console.log('month changed', month)}}
  // Hide month navigation arrows. Default = false
//   hideArrows={true}
  // Replace default arrows with custom ones (direction can be 'left' or 'right')
//   renderArrow={(direction) => (<Arrow/>)}
  // Do not show days of other months in month page. Default = false
  hideExtraDays={true}
  // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
  // day from another month that is visible in calendar page. Default = false
//   disableMonthChange={true}
  // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
  firstDay={1}
  // Hide day names. Default = false
  hideDayNames={true}
  // Show week numbers to the left. Default = false
  showWeekNumbers={true}
  // Handler which gets executed when press arrow icon left. It receive a callback can go back month
  onPressArrowLeft={substractMonth => substractMonth()}
  // Handler which gets executed when press arrow icon right. It receive a callback can go next month
  onPressArrowRight={addMonth => addMonth()}
  // Disable left arrow. Default = false
  disableArrowLeft={true}
  // Disable right arrow. Default = false
  disableArrowRight={true}
  
/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 20,
    justifyContent: 'center',
  },
});
