import React from 'react';
import { Text, View, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Modal, StatusBar, Linking } from 'react-native';
import { Body, Card, CardItem,ActionSheet } from 'native-base';
import ImageViewer from 'react-native-image-zoom-viewer';
import AntDesign from 'react-native-vector-icons/AntDesign';
var BUTTONS = [
  { text: "Prekinder",icon: "ios-contacts",iconColor: "#002d62",url:"https://www.ciaigandhi.com/REGLAMENTO-BASICO.pdf",index:0 },
  { text: "Preescolar",icon: "ios-contacts",iconColor: "#FFD417",url:"https://www.ciaigandhi.com/REGLAMENTO-BASICO.pdf", index:1 },
  { text: "Primaria",icon: "ios-contacts",iconColor: "##002d62",url:"https://www.ciaigandhi.com/REGLAMENTO-BASICO.pdf", index:2 },
  { text: "Secundaria",icon: "ios-contacts",iconColor: "#FFD417",url:"https://www.ciaigandhi.com/REGLAMENTO-SECUNDARIA.pdf", index:3 },
  { text: "Cancel", index:4}
];
var CANCEL_INDEX = 4;
export default class PagosScreen extends React.Component {
  static navigationOptions = {
    title: "Información Adicional",
    headerLeft: <Image source={require("../resources/toolbarlogo.png")} style={{ marginLeft: 10 }} />,
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: "#002d62",
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      modalDatosVisible: false,
      modalInstruccionesVisible: false,
      statusBarVisible: false,
      modalImage: false,
      image: [{
        props:{
          source: require("../resources/calendario.png")
        }
      }]
    }
  }

  setModalDatosVisible(visible) {
    this.setState({ modalDatosVisible: visible, statusBarVisible: visible });
  }
  setModalInsVisible(visible) {
    this.setState({ modalInstruccionesVisible: visible, statusBarVisible: visible });
  }
  setStatusBar(visible) {
    this.setState({ statusBarVisible: visible });
  }
  render() {
    return (
      <View style={styles.container}>
        <Modal
          visible={this.state.modalImage}
          animationType="slide"
          onRequestClose={() => this.setState({ modalImage: false })}>
          <View style={{ flexDirection: 'column', flex: 1, backgroundColor: "#000" }}>
            <TouchableOpacity style={{ margin: 10 }} onPress={() => { this.setState({ modalImage: false }) }}><AntDesign name="close" size={25} color={"white"} /></TouchableOpacity>
            <ImageViewer
              renderIndicator={() => null}
              onSwipeDown={() => {
                this.setState({ modalImage: false })
              }}
              enableSwipeDown={true}
              index={0}
              imageUrls={this.state.image}
              enablePreload={true}
            />
          </View>
        </Modal>
        <Modal
          animationType={"slide"}
          presentationStyle={"overFullScreen"}
          transparent={false}
          visible={this.state.modalDatosVisible}
        >
          <View style={[styles.modal, styles.modal4]} onTouchEndCapture={() => { this.setStatusBar(!this.state.statusBarVisible) }}>
            <StatusBar
              barStyle="light-content"
              animated={true}
              showHideTransition={"fade"}
              hidden={this.state.statusBarVisible} />
            <TouchableOpacity onPress={() => { this.setModalDatosVisible(false) }} style={[styles.btn, styles.btnModal]}><AntDesign name="close" size={25} color={"white"} /></TouchableOpacity>
            <Card style={{ justifyContent: "center", alignItems: "center", paddingHorizontal: 20 }}>
              <Image
                style={{ resizeMode: "stretch", width: 200, height: 87 }}
                source={require("../resources/banco.png")}
              />
              <Text style={{ textAlign: "center", color: "#000", fontWeight: "bold" }}>KINDER MADAM CURIE DE PUERTO VALLARTA AC</Text>
              <Text style={{ color: "#000" }}>Sucursal <Text style={{ fontWeight: "bold" }}>442</Text></Text>
              <Text style={{ color: "#000" }}>N° de cuenta <Text style={{ fontWeight: "bold" }}>92-00188714-7</Text></Text>
              <Text style={{ color: "#000" }}>CLABE <Text style={{ fontWeight: "bold" }}>014375920018871475</Text></Text>
            </Card>
          </View>
        </Modal>
        <Modal
          animationType={"slide"}
          presentationStyle={"overFullScreen"}
          transparent={false}
          visible={this.state.modalInstruccionesVisible}>
          <View style={{ marginTop: 20, marginHorizontal: 10, flex: 1, flexDirection: "column" }}>
            <StatusBar
              barStyle="dark-content" />
            <ScrollView>
              <View>
                <Text style={{ fontSize: 34 }}>Instrucciones de Pago</Text>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Plantel</Text>
                <Text style={{ textAlign: "justify" }}>En la administración, presente este tarjetón para hacer su pago en efectivo en horario de 7:30 a.m. – 2:30 p.m. / El pago con tarjeta de crédito/débito será más comisión.</Text>
                <View style={{ alignItems: "center", flexGrow: 1 }}>
                  <Image source={require("../resources/metodos_pago.png")} style={{ height: 50, width: 150, resizeMode: "stretch" }} />
                </View>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Banco</Text>
                <Text style={{ textAlign: "justify" }}>Presente su tarjeton en cualquier sucursal Santander indicándole al cajero la cantidad tomando en cuenta la fecha de su pago. Conserve su ficha y presente en la oficina del colegio para la emisión de su factura.</Text>
                <View style={{ alignItems: "center", flexGrow: 1 }}>
                  <Image source={require("../resources/deposito_cuenta.png")} style={{ height: 80, width: 80, resizeMode: "stretch" }} />
                </View>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Transferencia</Text>
                <Text style={{ textAlign: "justify" }}>Indispensable agregar la referencia y envíe el comprobantepara aplicar su pago en tiempo y emitir su factura al correo:</Text>
                <Text style={{ color: "blue" }}>colegioindiragandhiprimaria@gmail.com</Text>
                <View style={{ alignItems: "center", flexGrow: 1 }}>
                  <Image source={require("../resources/ejemplo.png")} style={{ height: 60, resizeMode: "contain" }} />
                </View>
              </View>
            </ScrollView>
            <View style={{ alignItems: "center", flexGrow: 1 }}>
              <TouchableOpacity onPress={() => { this.setModalInsVisible(!this.state.modalInstruccionesVisible); }} style={{ borderWidth: 2, borderColor: "#3A79F7", paddingVertical: 15, paddingHorizontal: 30, borderRadius: 10 }}>
                <Text>Entendido</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center", color: "#000" }}>Colegio Indira Gandhi</Text>
            <Text style={{ textAlign: "center", color: "#000", fontStyle: "italic" }}>"Un buen principio para un futuro brillante"</Text>
            <Text style={{ textAlign: "center", fontSize: 9, color: "#000" }}>PREKINDER, PREESCOLAR, PRIMARIA Y SECUNDARIA</Text>
            <Text style={{ textAlign: "center", fontSize: 9, color: "#000" }}>RFC: KMC040813KC1</Text>
            <Text style={{ textAlign: "center", fontSize: 9, color: "#000" }}>JAMAICA 1505 / GUAYAQUIL 505, COL. LAZARO CARDENAS</Text>
            <Text style={{ textAlign: "center", fontSize: 9, color: "#000" }}>TELS. 222-35-48 Y 222-01-96</Text>
            <Text style={{ textAlign: "center", fontSize: 9, color: "#000" }}>PUERTO VALLARTA JAL. C.P 48330</Text>
            <Text style={{ textAlign: "center", color: "#000", fontWeight: "bold", fontSize: 18 }}>calendario de Pagos</Text>
            <TouchableOpacity onPress={() => this.setState({ modalImage: true })}>
              <Image
                style={{ resizeMode: "contain", width: Dimensions.get('window').width, height: 500 }}
                source={require("../resources//calendario.png")} />
            </TouchableOpacity>
            <View style={{ flexDirection: "row" }}>
              <Card style={{ alignItems: "center" }}>
                <CardItem cardBody style={{ flexDirection: "column" }} button onPress={() => { this.setModalDatosVisible(!this.state.modalDatosVisible); }}>
                  <Image source={require("../resources/ic_pay.png")} style={{ width: 30, height: 30, resizeMode: "stretch", marginHorizontal: 30, marginTop: 15 }} />
                  <Text style={{ fontWeight: "bold", marginBottom: 15 }}>Datos de Pago</Text>
                </CardItem>
              </Card>
              <Card style={{ alignItems: "center" }}>
                <CardItem cardBody style={{ flexDirection: "column" }} button onPress={() => { this.setModalInsVisible(!this.state.modalInstruccionesVisible); }}>
                  <Image source={require("../resources/ic_instruction.png")} style={{ width: 30, height: 30, resizeMode: "stretch", marginHorizontal: 30, marginTop: 15 }} />
                  <Text style={{ fontWeight: "bold", marginBottom: 15 }}>Instrucciones</Text>
                </CardItem>
              </Card>
              <Card style={{ alignItems: "center" }}>
              <CardItem cardBody  style={{ flexDirection: "column" }} button 
                onPress={() =>
                ActionSheet.show(
                  {
                    options: BUTTONS,
                    title: "Elija un reglamento",
                    destructiveButtonIndex: CANCEL_INDEX,
                    cancelButtonIndex: CANCEL_INDEX,
                  },
                  buttonIndex => {
                    if(BUTTONS[buttonIndex].index<4){
                      Linking.openURL(BUTTONS[buttonIndex].url).catch(err => console.error(err));
                    }
                  }
                )}>
                  <Image source={require("../resources/ic_reglamento.png")} style={{ width: 30, height: 30, resizeMode: "stretch", tintColor: "#000",marginHorizontal: 30, marginTop: 15 }} />
                  <Text style={{ fontWeight: "bold",marginBottom: 15 }}>Reglamento</Text>
              </CardItem>
            </Card>
            </View>
            <Text style={{ fontSize: 9, color: "#aaa" }}>Versión 2.0.1.7 Colegio Indira Gandhi® derechos Reservados©</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  modal: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#000"
  },
  modal4: {
    height: 300
  },
  modalIns: {
    backgroundColor: "#aaa",
  }
});