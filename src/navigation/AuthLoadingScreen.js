import React, { Component } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const idUsuario = await AsyncStorage.getItem("idUsuario");
        this.props.navigation.navigate(idUsuario ? 'App' : 'Auth');
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
