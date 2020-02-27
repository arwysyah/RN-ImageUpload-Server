import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

export default class CalendarExample extends React.Component {
    state = {
        markedDates: {},
        isStartDatePicked: false,
        isEndDatePicked: false,
        startDate: ''
    }

    onDayPress = (day) => {
        if (this.state.isStartDatePicked == false) {
            let markedDates = {}
            markedDates[day.dateString] = { startingDay: true, color: '#00B0BF', textColor: '#FFFFFF' };
            this.setState({
                markedDates: markedDates,
                isStartDatePicked: true,
                isEndDatePicked: false,
                startDate: day.dateString,
            });
        } else {
            let markedDates = this.state.markedDates
            let startDate = moment(this.state.startDate);
            let endDate = moment(day.dateString);
            let range = endDate.diff(startDate, 'days')
            if (range > 0) {
                for (let i = 1; i <= range; i++) {
                    let tempDate = startDate.add(1, 'day');
                    tempDate = moment(tempDate).format('YYYY-MM-DD')
                    if (i < range) {
                        markedDates[tempDate] = { color: '#00B0BF', textColor: '#FFFFFF' };
                    } else {
                        markedDates[tempDate] = { endingDay: true, color: '#00B0BF', textColor: '#FFFFFF' };
                    }
                }
                this.setState({
                    markedDates: markedDates,
                    isStartDatePicked: false,
                    isEndDatePicked: true,
                    startDate: ''
                });
            } else {
                alert('Select an upcomming date!');
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Calendar
                    minDate={Date()}
                    monthFormat={"MMMM yyyy"}
                    markedDates={this.state.markedDates}
                    markingType="period"
                    hideExtraDays={true}
                    hideDayNames={true}
                    onDayPress={this.onDayPress}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        padding: 20,
        justifyContent: 'center'
    }
});