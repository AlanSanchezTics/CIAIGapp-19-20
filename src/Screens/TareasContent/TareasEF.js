import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, RefreshControl, Modal } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Text, List, Card, CardItem, Body } from 'native-base';
import Moment from 'moment';
import 'moment/locale/es';
import HTMLView from 'react-native-htmlview';
import ImageViewer from 'react-native-image-zoom-viewer';
import URL from '../../navigation/ServerURL';
import Svg,{Circle,Rect} from "react-native-svg";
import ContentLoader from 'rn-content-loader';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class TareasEF extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            refreshing: true,
            lostConnection: false,
            isEmpty: false,
            dataSource: [],
            modalVisible:false,
            image:[{
            url:""
            }]
        };
    }
    getDataApi = async () =>{
        let idGrupo = await AsyncStorage.getItem("idGrupo");
        fetch(`${URL}/App/GetTareas.php`, {
            method: "post",
            header: {
                "Accept": "application/json",
                "content-type": "application/json",
            },
            body: JSON.stringify({
                grupo: idGrupo,
                tipo: "ef"
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson != null) {
                this.setState({
                    refreshing: false,
                    dataSource: responseJson
                });
            } else if (responseJson == null) {
                this.setState({
                    refreshing: false,
                    isEmpty:true
                });
            }
        })
        .catch((err) =>{
            //console.error(err);
            this.setState({refreshing:false, lostConnection:true});
        })
    }
    componentDidMount(){
        this.getDataApi();
    }
    _onRefresh = () => {
        this.setState({refreshing: true, lostConnection:false, isEmpty:false});
        this.getDataApi();
      }
      showModal(url){
        this.setState({
          image:[{
            url:`${URL}/dPanel/Tareas/images/${url}`
          }],
          modalVisible:true
        });
      }
      render() {
        Moment.locale('es');
        if (!this.state.lostConnection && !this.state.isEmpty && !this.state.refreshing) {
            return (
                <View style={styles.container}>
                    <List
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                        dataArray={this.state.dataSource}
                        renderRow={(rowData) =>
                            <Card>
                                <CardItem>
                                    <Body>
                                        <Text style={{ fontSize: 24 }}>{rowData.titulo}</Text>
                                        <Text note>{Moment(rowData.fechaCreacion).format('LL')}</Text>
                                    </Body>
                                </CardItem>
                                <CardItem>
                                    <Body>
                                        <HTMLView 
                                            value={rowData.descripcion}
                                            stylesheet={{b:{color:"#000", fontWeight: "bold"}, u:{textDecorationLine: 'underline'}}}
                                        />
                                        {
                                            (rowData.imagen !=null && rowData.imagen !="") ?
                                            <TouchableOpacity onPress={() =>{this.showModal(rowData.imagen)}} style={{flexDirection:'row'}}>
                                            <Image 
                                            source={{uri:`${URL}/dPanel/Tareas/images/${rowData.imagen}`}} 
                                            style={{width:"100%",height:250,flex:1, resizeMode:'cover'}} 
                                            />
                                            </TouchableOpacity>
                                            :
                                            <Text></Text>
                                        }
                                    </Body>
                                </CardItem>
                                <CardItem footer>
                                    <Text note style={{ fontWeight: "bold" }}>para el {Moment(rowData.entrega).format('LL')}</Text>
                                </CardItem>
                            </Card>
                        }
                    />
                    <Modal
                        visible={this.state.modalVisible}
                        animationType="slide"
                        onRequestClose={() => this.setState({ modalVisible: false })}>
                        <View style={{flexDirection:'column', flex:1,backgroundColor:"#000"}}>
                        <TouchableOpacity style={{margin:10}} onPress={() => {this.setState({ modalVisible: false })}}><AntDesign name="close" size={25} color={"white"} /></TouchableOpacity>
                        <ImageViewer 
                            renderIndicator={() => null}
                            onSwipeDown={() => {
                            this.setState({ modalVisible: false })
                            }}
                            enableSwipeDown={true}
                            index={0}
                            imageUrls={this.state.image}
                            enablePreload={true}
                        />
                        </View>
                    </Modal>
                </View>
            );
        } else if (this.state.lostConnection) {
            return (
                <View style={styles.containerError}>
                    <Image source={require("../../resources/ic_lost_connection.png")} style={{ tintColor: "#aaa", width: 100, height: 100 }} />
                    <Text style={{ color: "#aaa", fontSize: 34 }}>Error de red :(</Text>
                    <TouchableOpacity  onPress={() => {this._onRefresh();}} style={{ borderWidth: 1, borderRadius: 5, borderColor: "#aaa", marginTop: 10 }}>
                        <Text style={{ margin: 10, color: "#aaa" }}>Reintentar</Text>
                    </TouchableOpacity>
                </View>
            );
        } else if (this.state.isEmpty) {
            return (
                <View style={styles.containerError}>
                    <Image source={require("../../resources/ic_empty.png")} style={{ tintColor: "#aaa", width: 100, height: 100 }} />
                    <Text style={{ color: "#aaa", fontSize: 34 }}>Sin publicaciones</Text>
                    <TouchableOpacity  onPress={() => {this._onRefresh();}} style={{ borderWidth: 1, borderRadius: 5, borderColor: "#aaa", marginTop: 10 }}>
                        <Text style={{ margin: 10, color: "#aaa" }}>Recargar</Text>
                    </TouchableOpacity>
                </View>
            );
        }else if(this.state.refreshing){
            return(
                <View style={styles.container}>
                    <Card>
                        <CardItem>
                            <ContentLoader
                                primaryColor="rgb(240,240,240)"
                                secondaryColor="rgb(220,220,220)"
                                height={200}
                            >
                                <Rect x="0" y="15" rx="4" ry="4" width="190" height="15" />
                                <Rect x="0" y="38.4" rx="3" ry="3" width="100" height="6.4" />
                                <Rect x="0" y="80" rx="3" ry="3" width="250" height="6.4" />
                                <Rect x="0" y="100" rx="3" ry="3" width="230" height="6.4" />
                                <Rect x="0" y="120" rx="3" ry="3" width="201" height="6.4" />
                                <Rect x="0" y="180" rx="3" ry="3" width="150" height="6.4" />
                            </ContentLoader>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <ContentLoader
                                primaryColor="rgb(240,240,240)"
                                secondaryColor="rgb(220,220,220)"
                                height={200}
                            >
                                <Rect x="0" y="15" rx="4" ry="4" width="190" height="15" />
                                <Rect x="0" y="38.4" rx="3" ry="3" width="100" height="6.4" />
                                <Rect x="0" y="80" rx="3" ry="3" width="250" height="6.4" />
                                <Rect x="0" y="100" rx="3" ry="3" width="230" height="6.4" />
                                <Rect x="0" y="120" rx="3" ry="3" width="201" height="6.4" />
                                <Rect x="0" y="180" rx="3" ry="3" width="150" height="6.4" />
                            </ContentLoader>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <ContentLoader
                                primaryColor="rgb(240,240,240)"
                                secondaryColor="rgb(220,220,220)"
                                height={200}
                            >
                                <Rect x="0" y="15" rx="4" ry="4" width="190" height="15" />
                                <Rect x="0" y="38.4" rx="3" ry="3" width="100" height="6.4" />
                                <Rect x="0" y="80" rx="3" ry="3" width="250" height="6.4" />
                                <Rect x="0" y="100" rx="3" ry="3" width="230" height="6.4" />
                                <Rect x="0" y="120" rx="3" ry="3" width="201" height="6.4" />
                                <Rect x="0" y="180" rx="3" ry="3" width="150" height="6.4" />
                            </ContentLoader>
                        </CardItem>
                    </Card>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(180,180,180,0.185)",
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