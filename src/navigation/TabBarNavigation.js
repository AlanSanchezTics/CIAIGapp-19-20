import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PerfilScreen from '../Screens/PerfilScreen.js';
import TareasScreen from '../Screens/TareasScreen.js';
import AvisosScreen from '../Screens/AvisosScreen.js';
import PagosScreen from '../Screens/PagosScreen.js';
import LoginScreen from '../Auth/LoginScreen.js';
import AuthLoadingScreen from './AuthLoadingScreen.js';

const PerfilStack = createStackNavigator({
    Perfil: PerfilScreen,
});
PerfilStack.navigationOptions = {
    tabBarLabel: 'Mi perfil',
    tabBarIcon: ({ tintColor }) => (
        <Ionicons name='ios-contact' size={25} color={tintColor} />
    ),
};

const AvisosStack = createStackNavigator({
    Avisos: {
        screen: AvisosScreen,
        navigationOptions: {
            title: 'Mis Avisos',
            headerLeft: <Image source={require("../resources/toolbarlogo.png")} style={{ marginLeft: 10 }} />,
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: "#002d62",
            }       
        }
        },
    });
AvisosStack.navigationOptions = {
    tabBarLabel: "Avisos",
    tabBarIcon: ({ tintColor }) => (
        <Ionicons name='ios-notifications' size={25} color={tintColor} />
    )
};

const TareasStack = createStackNavigator({
    tareas:{
        screen: TareasScreen,
        navigationOptions: {
            title: 'Mis Tareas',
            headerLeft: <Image source={require("../resources/toolbarlogo.png")} style={{ marginLeft: 10 }} />,
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: "#002d62",
            }       
        }
    }
});
TareasStack.navigationOptions = {
    tabBarLabel: "Mis Tareas",
    tabBarIcon: ({ tintColor }) => (
        <Ionicons name='ios-bookmarks' size={25} color={tintColor} />
    ),
};

const PagosStack = createStackNavigator({
    Pagos: PagosScreen
});
PagosStack.navigationOptions = {
    tabBarLabel: "Mis Pagos",
    tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-calendar" size={25} color={tintColor} />
    )
};

const AppStack = createBottomTabNavigator({
    PerfilStack,
    AvisosStack,
    TareasStack,
    PagosStack
});

const App = createStackNavigator({
    App:{
        screen:AppStack,
        navigationOptions: {
            header:null
        }
    }
});

const AuthStack = createStackNavigator({
    Login:LoginScreen
});

const switchApp = createSwitchNavigator({
    Auth: AuthStack,
    App:App,
    AuthLoading: AuthLoadingScreen
},{
    initialRouteName:"AuthLoading"
});

export default createAppContainer(switchApp);