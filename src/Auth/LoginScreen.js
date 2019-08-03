import React, { Component } from 'react';
import {Alert,View, Text, StyleSheet, Image, KeyboardAvoidingView,TextInput, TouchableOpacity,ActivityIndicator, Keyboard, TouchableWithoutFeedback} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ServerURL from "../navigation/ServerURL.js";
class LoginScreen extends Component {
  static navigationOptions ={
    header:null
  }
    constructor(props){
        super(props)
        this.state={
          user:'',
          pass:'',
          isLoading: false
        }
      }

      logeo = async () =>{
        Keyboard.dismiss;
        this.setState({
          isLoading:true
        })
        const {user}=this.state;
        const {pass} = this.state;
        fetch(`${ServerURL}/App/LoginApp.php`,{
          method:"post",
          header:{
            "Accept": "application/json",
            "content-type": "application/json",
    
          },body: JSON.stringify({
            usuario: user,
            clave: pass,
            token: global.token
          })
        })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            isLoading:false
          })
          if(responseJson=="" || responseJson=="empty" || responseJson==null){
            Alert.alert("Datos erroneos","verifica los datos");
          }else{
            AsyncStorage.setItem('idAlumno', responseJson.idAlumno);
            AsyncStorage.setItem('idGrupo', responseJson.idGrupo);
            AsyncStorage.setItem('idUsuario',responseJson.idUsuario);
            AsyncStorage.setItem('nGrupo', responseJson.grupo);
            this.props.navigation.navigate('App');
          }
        })
        .catch((error) =>{
          Alert.alert("Error de conexion","ocurrio un problema con tu conexion a internet. Intenta mas tarde");
          console.error(error);
          this.setState({
            isLoading:false
          })
        });
      }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex:1,backgroundColor: '#002d62',}}>
        <View style={styles.logoContainer}>
          <Image style={styles.Logo}
            source={require('../resources/user.png')}
          />
          <Text style={{fontSize: 20,fontWeight: 'bold',color:'#FFF', marginTop: 10,}}>CIAIG</Text>
          <Text style={{fontSize: 15,fontWeight: 'bold',color:'#FFF', marginTop: 5, paddingBottom:10}}>Control integral del Alumno</Text>
          <ActivityIndicator size="large" color="#FFF"/>
          <Text style={{fontSize: 20,fontWeight: 'bold',color:'#FFF', marginTop: 10,}}>Espera un momento...</Text>
        </View>
        </View>
      );
    }
    return (
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View onTouchEndCapture={Keyboard.dismiss} style={styles.logoContainer}>
              <Image style={styles.Logo}
            source={require('../resources/user.png')} />
              <Text style={{fontSize: 20,fontWeight: 'bold',color:'#FFF', marginTop: 10,}}>CIAIG</Text>
              <Text style={{fontSize: 15,fontWeight: 'bold',color:'#FFF', marginTop: 5,}}>Control integral del Alumno</Text>
            </View>
            <View style={styles.formContainer}> 
              <TextInput 
                  onSubmitEditing={() =>this.passwordInput.focus()} 
                  placeholder="Usuario o No. de Control"
                  keyboardType="numeric" 
                  returnKeyType="next"
                  returnKeyLabel="Siguiente"
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={user =>this.setState({user})}
                  placeholderTextColor="#bfbfbf"
                  backgroundColor="rgba(255,255,255,0.3)" 
                  style={styles.Inputs}/>
              <TextInput 
                  ref={(input) => this.passwordInput = input} 
                  keyboardType="numeric"
                  placeholder="Contraseña" 
                  autoCorrect={false}
                  autoCapitalize="none"
                  secureTextEntry 
                  onChangeText ={pass => this.setState({pass})}
                  returnKeyType="join"
                  returnKeyLabel="Listo" 
                  placeholderTextColor="#bfbfbf"
                  backgroundColor="rgba(255,255,255,0.3)" 
                  style={styles.Inputs}/>
              <TouchableOpacity style={{backgroundColor: '#4C85F7',paddingVertical:15, borderRadius:10, alignItems: 'center'}} onPress={this.logeo}>
                  <Text style={{color:"#fff",fontSize:15,fontWeight:'bold'}}>Ingresar</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
      flex:1,
      backgroundColor: '#002d62',
  },
  logoContainer:{
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  Logo:{
    width: 90,
    height:90
  },
  formContainer:{
    padding:20
  },
  Inputs:{
    height: 50,
    fontSize: 20,
    marginBottom: 10,
    color:'#FFF',
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 0.5,
}
});
export default LoginScreen