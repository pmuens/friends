/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var _ = require('lodash');
var DDPClient = require('ddp-client');

var FriendsReactNative = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => !_.isEqual(row1, row2),
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    var ddpClient = new DDPClient({url: 'ws://localhost:3000/websocket'});

    ddpClient.connect(() => ddpClient.subscribe('friends'));

    // observe the lists collection
    var observer = ddpClient.observe('friends');
    observer.added = () => this.updateRows(_.cloneDeep(_.values(ddpClient.collections.friends)));
    observer.changed = () => this.updateRows(_.cloneDeep(_.values(ddpClient.collections.friends)));
    observer.removed = () => this.updateRows(_.cloneDeep(_.values(ddpClient.collections.friends)));
  },

  updateRows: function(rows) {
    this.setState({
     dataSource: this.state.dataSource.cloneWithRows(rows),
     loaded: true,
   });
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderFriend}
        style={styles.listView}
      />
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading lists...
        </Text>
      </View>
    );
  },

  renderFriend: function(friend) {
    return (
      <View style={styles.container}>
        <Text style={styles.firstName}>{friend.firstName}</Text>
        <Text style={styles.lastName}>{friend.lastName}</Text>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
  },
  firstName: {
    flex: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastName: {
    flex: 5,
    fontSize: 18,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('FriendsReactNative', () => FriendsReactNative);
