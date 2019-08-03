import React from 'react';
import {createStackNavigator,createMaterialTopTabNavigator} from 'react-navigation';
import Espanol from './TareasContent/tareasEsp';
import Ingles from './TareasContent/TareasEn';
import Computacion  from './TareasContent/TareasCom';
import Musica from './TareasContent/TareasMus';
import Deportes from './TareasContent/TareasEF';

const espStack = createStackNavigator({
  Espanol:Espanol
});
espStack.navigationOptions ={
  tabBarLabel:"Español"
};

const enStack = createStackNavigator({
  Ingles:Ingles
});
enStack.navigationOptions ={
  tabBarLabel:"Ingles"
};

const comStack = createStackNavigator({
  Computacion:Computacion
});
comStack.navigationOptions ={
  tabBarLabel:"computación"
};

const musStack = createStackNavigator({
  Musica:Musica
});
musStack.navigationOptions ={
  tabBarLabel:"Música"
};

const efStack = createStackNavigator({
  Deportes:Deportes
});
efStack.navigationOptions ={
  tabBarLabel:"Deportes"
};

const TareasStack = createMaterialTopTabNavigator({
  espStack,
  enStack,
  comStack,
  musStack,
  efStack
},{
  lazy:true,
  optimizationsEnabled: true,
  tabBarOptions:{
    upperCaseLabel: false,
    indicatorStyle:{
      backgroundColor:"#FFD417"
    },
    style:{
      backgroundColor:"#002d62",
    },
    labelStyle: {
      fontWeight:"bold"
    },
    scrollEnabled: true,
    tabStyle: {
      width:120
    }
  },
});

export default TareasStack;