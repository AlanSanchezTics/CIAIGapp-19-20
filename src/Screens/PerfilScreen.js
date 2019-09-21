import React from 'react';
import { StyleSheet, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Card, CardItem, Body, Text, Toast } from 'native-base';
import URL from '../navigation/ServerURL.js';
import Svg,{Circle,Rect} from "react-native-svg";
import ContentLoader from 'rn-content-loader';

var nGrupo = "";
var idAlumno = "";
export default class PerfilScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Mi perfil",
      headerLeft: <Image source={require("../resources/toolbarlogo.png")} style={{ marginLeft: 10 }} />,
      headerRight: <TouchableOpacity onPress={navigation.getParam('logOut')}><Text style={{ color: "#fff", margin: 10 }}>Salir</Text></TouchableOpacity>,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: "#002d62",
      }
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      refreshing: true,
      lostConnection: false,
    }
  }
  getDataApi = async () => {
    let id = await AsyncStorage.getItem("idAlumno");
    nGrupo = await AsyncStorage.getItem("nGrupo");
    global.token = await AsyncStorage.getItem("TokenID");
    
    fetch(`${URL}/App/getDatosApp.php`, {
      method: 'post',
      header: {
        "Accept": "application/json",
        "content-type": "application/json",
      }, body: JSON.stringify({
        idAlumno: id
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          refreshing: false,
          idAlumno: id,
          dataSource: responseJson
        });
        global.nivel = responseJson.nivel;
      })
      .catch((err) => {
        this.setState({ refreshing: false, lostConnection: true })
      });
  }
  componentDidMount() {
    this.getDataApi();
    this.props.navigation.setParams({ logOut: this.logOut });
  }
  _onRefresh() {
    this.setState({ refreshing: true, lostConnection: false });
    this.getDataApi();
  }
  logOut = async () => {
    let idUsuario = await AsyncStorage.getItem("idUsuario");
    global.token = await AsyncStorage.getItem("TokenID");
    await AsyncStorage.removeItem("idUsuario");
    fetch(`${URL}/App/logoutApp.php`, {
      method: "post",
      header: {
        "Accept": "application/json",
        "content-type": "application/json",

      },
      body: JSON.stringify({
        idUsuario: idUsuario
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson === true) {
          AsyncStorage.clear();
          //AsyncStorage.setItem("update","update");
          AsyncStorage.setItem("TokenID", global.token);
          this.props.navigation.navigate('AuthLoading');
        }
      })
      .catch((err) => {
        AsyncStorage.setItem("idUsuario", idUsuario);
      });
  }
  render() {
    if (!this.state.refreshing && !this.state.lostConnection) {
      return (
        <View style={styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.welcomeContainer} >
              <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center", color: "#000" }}>Datos del Alumno</Text>
              <Text style={{ color: "#000", textAlign: "center" }}>Ciclo escolar 2019-2020</Text>
              <View style={{ alignItems: "center" }}>
                <Image borderRadius={50} source={{uri: this.state.dataSource.foto}} style={{ marginVertical: 10, width: 100, height: 100 }} />
                <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center", color: "#000" }}>{this.state.dataSource.name} {this.state.dataSource.A_paterno} {this.state.dataSource.A_materno}</Text>
              </View>
              <Card style={{ alignItems: "center" }}>
                <CardItem header>
                  <Text style={{ fontWeight: "bold" }}>ID</Text>
                </CardItem>
                <CardItem>
                  <Body style={{ alignItems: "center" }}>
                    <Text onPress={
                      () =>{
                        Toast.show({
                          text:"Tambien usuario de acceso",
                          buttonText:"Entendido",
                          position:"bottom",
                          type: "success"
                        })
                      }
                    }>{this.state.idAlumno}</Text>
                  </Body>
                </CardItem>
              </Card>
              <Card style={{ alignItems: "center" }}>
                <CardItem header>
                  <Text style={{ fontWeight: "bold" }}>Grupo</Text>
                </CardItem>
                <CardItem>
                  <Body style={{ alignItems: "center" }}>
                    <Text>{this.state.dataSource.grado}°{nGrupo}</Text>
                  </Body>
                </CardItem>
              </Card>
              <Card style={{ alignItems: "center" }}>
                <CardItem header>
                  <Text style={{ fontWeight: "bold" }}>Nivel de estudio</Text>
                </CardItem>
                <CardItem>
                  <Body style={{ alignItems: "center" }}>
                    <Text>{this.state.dataSource.nivel}</Text>
                  </Body>
                </CardItem>
              </Card>
              <Card style={{ alignItems: "center" }}>
                <CardItem header>
                  <Text style={{ fontWeight: "bold" }}>Telefono</Text>
                </CardItem>
                <CardItem>
                  <Body style={{ alignItems: "center" }}>
                    <Text>{this.state.dataSource.telefono}</Text>
                  </Body>
                </CardItem>
              </Card>
              <Card style={{ alignItems: "center" }}>
                <CardItem header>
                  <Text style={{ fontWeight: "bold" }}>Correo</Text>
                </CardItem>
                <CardItem>
                  <Body style={{ alignItems: "center" }}>
                    <Text>{this.state.dataSource.correo}</Text>
                  </Body>
                </CardItem>
              </Card>
            </View>
          </ScrollView>
        </View>
      );
    } else if (this.state.refreshing) {
      return (
        <View style={styles.container}>
          <View style={styles.welcomeContainer} >
            <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center", color: "#000" }}>Control Integral del Alumno</Text>
            <Text style={{ textAlign: "center", color: "#000", fontStyle: "italic" }}>Obteniendo datos...</Text>
            <View style={{ alignItems: "center" }}>
              <ContentLoader
                height={130}
                width={200}
              >
                <Circle cx="100" cy="55" r="50" />
                <Rect x="0" y="110" rx="4" ry="4" width="200" height="10" />
              </ContentLoader>
            </View>
            <Card style={{ alignItems: "center" }}>
              <CardItem header>
                <ContentLoader
                  height={20}
                  width={100}
                >
                  <Rect x="0" y="0" rx="4" ry="4" width="100" height="10" />
                </ContentLoader>
              </CardItem>
              <CardItem>
                <Body style={{ alignItems: "center" }}>
                  <ContentLoader
                    width={200}
                    height={20}
                  >
                    <Rect x="0" y="0" rx="4" ry="4" width="200" height="10" />
                  </ContentLoader>
                </Body>
              </CardItem>
            </Card>
            <Card style={{ alignItems: "center" }}>
              <CardItem header>
                <ContentLoader
                  height={20}
                  width={100}
                >
                  <Rect x="0" y="0" rx="4" ry="4" width="100" height="10" />
                </ContentLoader>
              </CardItem>
              <CardItem>
                <Body style={{ alignItems: "center" }}>
                  <ContentLoader
                    width={200}
                    height={20}
                  >
                    <Rect x="0" y="0" rx="4" ry="4" width="200" height="10" />
                  </ContentLoader>
                </Body>
              </CardItem>
            </Card>
            <Card style={{ alignItems: "center" }}>
              <CardItem header>
                <ContentLoader
                  height={20}
                  width={100}
                >
                  <Rect x="0" y="0" rx="4" ry="4" width="100" height="10" />
                </ContentLoader>
              </CardItem>
              <CardItem>
                <Body style={{ alignItems: "center" }}>
                  <ContentLoader
                    width={200}
                    height={20}
                  >
                    <Rect x="0" y="0" rx="4" ry="4" width="200" height="10" />
                  </ContentLoader>
                </Body>
              </CardItem>
            </Card>
            <Card style={{ alignItems: "center" }}>
              <CardItem header>
                <ContentLoader
                  height={20}
                  width={100}
                >
                  <Rect x="0" y="0" rx="4" ry="4" width="100" height="10" />
                </ContentLoader>
              </CardItem>
              <CardItem>
                <Body style={{ alignItems: "center" }}>
                  <ContentLoader
                    width={200}
                    height={20}
                  >
                    <Rect x="0" y="0" rx="4" ry="4" width="200" height="10" />
                  </ContentLoader>
                </Body>
              </CardItem>
            </Card>
          </View>
        </View>
      );
    } else if (this.state.lostConnection) {
      return (
        <View style={styles.containerError}>
          <Image source={require("../resources/ic_lost_connection.png")} style={{ tintColor: "#aaa", width: 100, height: 100 }} />
          <Text style={{ color: "#aaa", fontSize: 34 }}>Error de red :(</Text>
          <TouchableOpacity onPress={() => { this._onRefresh(); }} style={{ borderWidth: 1, borderRadius: 5, borderColor: "#aaa", marginTop: 10 }}>
            <Text style={{ margin: 10, color: "#aaa" }}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(240, 240, 240, 0.185)",
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,

  },
  containerError: {
    flex: 1,
    backgroundColor: "rgba(180,180,180,0.185)",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'stretch',
  }
});
