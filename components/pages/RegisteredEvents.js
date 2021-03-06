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

export default class RegisteredEvents extends Component<Props, State> {

  state = {
    loading: true,
  }

  componentDidMount() {
    return fetch('http://fakedomain/volunteer_event/1')
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
