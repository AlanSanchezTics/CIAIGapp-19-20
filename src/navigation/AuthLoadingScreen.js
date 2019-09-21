import React, { Component } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    View,
    Image,
    Text,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const idUsuario = await AsyncStorage.getItem("idUsuario");
        const idAlumno = await AsyncStorage.getItem("idAlumno");
        //Quitar en futuras versiones
        const update = await AsyncStorage.getItem("update");
        //Quitar en futuras versiones
        if(!update){
            Alert.alert(
                "Actualización",
                "Se ha cerrado la sesión en su dispositivo para reestablecer los datos de la App. Pero no se preocupe, a continuación le daremos su clave de acceso para entrar nuevamente."+
                "Recuerde que su usuario comienza con la serie 2018 o 2019."+
                " Clave: "+idAlumno,
                [{text: 'Entiendo', onPress: () => {AsyncStorage.clear();}}]
                );
            AsyncStorage.setItem("update","update");
            this.props.navigation.navigate('Auth');
        }else{
            this.props.navigation.navigate(idUsuario ? 'App' : 'Auth');
        }
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#002d62', }}>
                <View style={styles.logoContainer}>
                    <Image style={styles.Logo}
                        source={require('../resources/user.png')}
                    />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFF', marginTop: 10, }}>CIAIG</Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#FFF', marginTop: 5, paddingBottom: 10 }}>Control integral del Alumno</Text>
                    <ActivityIndicator size="large" color="#FFF" />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFF', marginTop: 10, }}>Espera un momento...</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
    },
    Logo: {
        width: 90,
        height: 90
    },
});
