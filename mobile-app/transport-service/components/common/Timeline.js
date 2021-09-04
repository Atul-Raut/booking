import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
  Dimensions
} from "react-native";
import AppBaseComponent, {
  getServiceID,
  getUserId,
  baseUrl,
} from "../common/AppBaseComponent";
import { callApi } from "../common/AppService";
import { translateMsg } from "../common/Translation";
import { globalStyles } from "../common/GlobalStyles";
import EventCalendar from './event-calender/EventCalendar';

export default class Timeline extends AppBaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  componentDidUpdate() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = async () => {
  };

  scrollViewRef = (ref) => {
    this.timetableRef = ref;
  };

  render() {
    const { requests } = this.state;
    const events = [
      {
        start: '2021-09-11 01:00:00',
        end: '2021-09-11 02:00:00',
        title: 'Plant shifting',
        summary: 'Narhe to Akurdi',
      },
      {
        start: '2021-09-11 02:30:00',
        end: '2021-09-11 03:30:00',
        title: 'Still shifting',
        summary: 'Akurdi to Shivajinagar',
      },
      {
        start: '2021-09-11 05:00:00',
        end: '2021-09-11 07:00:00',
        title: 'Shifting',
        summary: 'Hadpsar to Shivajinagar',
      },
      {
        start: '2021-09-12 00:30:00',
        end: '2021-09-12 01:30:00',
        title: 'Parag Birthday Party',
        summary: 'Call him',
      },
      {
        start: '2021-09-13 01:30:00',
        end: '2021-09-13 02:20:00',
        title: 'My Birthday Party',
        summary: 'Lets Enjoy',
      },
      {
        start: '2021-09-14 04:10:00',
        end: '2021-09-14 04:40:00',
        title: 'Engg Expo 2020',
        summary: 'Expoo Vanue not confirm',
      },
    ];

    const eventClicked = (event) => {
      //On Click of event showing alert from here
      alert(JSON.stringify(event));
    };
  
    return (
      <View style={globalStyles.globalContainer}>
         <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <EventCalendar
              eventTapped={eventClicked}
              // Function on event press
              events={events}
              // Passing the Array of event
              width={width}
              // Container width
              size={60}
              // number of date will render before and after initDate
              // (default is 30 will render 30 day before initDate
              // and 29 day after initDate)
              initDate={'2021-09-11'}
              // Show initial date (default is today)
              scrollToFirst
              // Scroll to first event of the day (default true)
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
let {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});