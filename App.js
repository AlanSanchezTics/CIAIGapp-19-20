import React, { Component } from "react";
import { StyleSheet, View, StatusBar, Modal, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AppNavigator from './src/navigation/TabBarNavigation.js';
import Moment from 'moment';
import 'moment/locale/es';
import HTMLView from 'react-native-htmlview';
import { Card, CardItem, Body, Text, Root, Left, Thumbnail } from 'native-base';
import URL from './src/navigation/ServerURL.js';
import OneSignal from "react-native-onesignal"; // Import package from node modules
global.token = "";
function renderNode(node, index, siblings, parent, defaultRenderer) {
  if (node.name == 'p') {
      return (
          <Text key={index} style={{fontSize:13, paddingVertical:5, lineHeight:17}}>
              {defaultRenderer(node.children, parent)}
          </Text>
      )
  }
}
export default class App extends Component {
  state = {
    modalNotificationVisible: false,
    rowData: [],
    image: [{
      url: ""
    }]
  };
  constructor(props) {
    super(props);
    OneSignal.init("ONE_SIGNAL_API");
    OneSignal.inFocusDisplaying(2);
  }
  componentWillMount() {
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }
  componentWillUnmount() {
    OneSignal.removeEventListener("opened", this.onOpened);
    OneSignal.removeEventListener("ids", this.onIds);
  }
  onOpened = ({ notification }) => {
    this._onOpened(true);
    this.setState({
      rowData: notification.payload.additionalData
    });
  }

  onIds(device) {
    global.token = device.userId;
    AsyncStorage.setItem("TokenID", global.token);
    
  }

  _onOpened(visible) {
    this.setState({ modalNotificationVisible: visible });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Modal
          animationType={"slide"}
          presentationStyle={"overFullScreen"}
          transparent={false}
          onRequestClose={() => { this.setState({ rowData: [] }); }}
          visible={this.state.modalNotificationVisible}>
          <View style={{ flex: 1, flexDirection: "column", backgroundColor: "#3A79F7", padding: 5, paddingBottom: 0 }}>
            <ScrollView>
              <Card style={{marginTop:30}}>
                <CardItem>
                  <Left>
                    <Thumbnail source={require("./src/resources/default.png")}/>
                    <Body>
                      <Text style={{ fontSize: 18 }}>{this.state.rowData.Title}</Text>
                      <Text note>{Moment(this.state.rowData.FechaI).format('LL')}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem>
                  <Body>
                    <HTMLView
                      value={this.state.rowData.body}
                      renderNode={renderNode}
                      stylesheet={{b:{color:"#000", fontWeight: "bold"}, u:{textDecorationLine: 'underline'}}}
                    />
                    {
                      (this.state.rowData.imagen != null && this.state.rowData.imagen != "") ?
                        <TouchableOpacity  style={{ flexDirection: 'row' }}>
                          <Image
                            source={{ uri: `${URL}/${this.state.rowData.imagen}` }}
                            style={{ width: "100%", height: 250, flex: 1, resizeMode: 'cover' }}
                          />
                        </TouchableOpacity>
                        :
                        <View></View>
                    }
                  </Body>
                </CardItem>
                <CardItem footer>
                  <Text note style={{ fontWeight: "bold" }}>para el {Moment(this.state.rowData.FechaF).format('LL')}</Text>
                </CardItem>
              </Card>
            </ScrollView>
            <View style={{ alignItems: "center", flexGrow: 1, marginTop: 5 }}>
              <TouchableOpacity onPress={() => { this._onOpened(false); }} style={{ backgroundColor: "#3A79F7", paddingVertical: 5, width: Dimensions.get("screen").width, alignItems: "center" }}>
                <Text style={{ color: "#FFFFFF" }}>Entendido</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Root>
          <AppNavigator />
        </Root>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modal: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  modal4: {
    height: 900
  },
  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },
  btnModal: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "transparent"
  }
});
