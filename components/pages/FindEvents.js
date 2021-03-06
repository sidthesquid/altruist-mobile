/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';

import EventCardList from '../../components/organisms/EventCardList'
import SearchEvents from '../molecules/SearchEvents';

type Props = {};
type State = {
  loading: boolean,
  events?: Array<Object>,
};

export default class FindEvents extends Component<Props, State> {
  
  state = {
    loading: true,
  }

  constructor() {
    super();
    // this.state = {
    //   loading: false,
    //   events: [
    //     {
    //       key: '1',
    //       eventID: '18935',
    //       title: "SF Marathon 1",
    //       description: "Join the SF marathon now! Join the SF marathon now! Join the SF marathon now! Join the SF marathon now! Join the SF marathon now!",
    //       registered: true,
    //       imageUrl: null,
    //       start: "12/31/19 12:30PM",
    //       end: "12/31/19 3:30PM",
    //       location: "San Francisco",
    //       lat: "-122.53354",
    //       long: "34.56986"
    //     },
    //     {
    //       key: '2',
    //       eventID: '325235',
    //       title: "SF Marathon 2",
    //       description: "Join the SF marathon now!",
    //       registered: false,
    //       imageUrl: null,
    //       start: "12/31/19 12:30PM",
    //       end: "12/31/19 3:30PM",
    //       location: "San Francisco",
    //       lat: "-122.53354",
    //       long: "34.56986"
    //     },
    //     {
    //       key: '3',
    //       title: "SF Marathon 3",
    //       eventID: '392058',
    //       description: "Join the SF marathon now!",
    //       registered: false,
    //       imageUrl: null,
    //       start: "12/31/19 12:30PM",
    //       end: "12/31/19 3:30PM",
    //       location: "San Francisco",
    //       lat: "-122.53354",
    //       long: "34.56986"
    //     }
    //   ]
    // }
  }

  componentDidMount() {
    console.disableYellowBox = true;
    return fetch('http://fakedomain/event/')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          loading: false,
          events: responseJson
        }, function(){

        });

      })
      .catch((error) =>{
        Alert.alert(error)
      });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.state.loading ?
          <View style={{ marginTop: 20 }}>
            <ActivityIndicator />
          </View> :
          <ScrollView>
            <SearchEvents />
            <EventCardList events={this.state.events} />
          </ScrollView>
        }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});