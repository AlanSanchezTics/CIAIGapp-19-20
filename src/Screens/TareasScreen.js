import React, { Component } from 'react'
import {createStackNavigator,createMaterialTopTabNavigator, createAppContainer, NavigationActions} from 'react-navigation';
import Espanol from './TareasContent/tareasEsp';
import Ingles from './TareasContent/TareasEn';
import Computacion  from './TareasContent/TareasCom';
import Musica from './TareasContent/TareasMus';
import Deportes from './TareasContent/TareasEF';
import Asignaturas from './TareasContent/TareasAsigs';

const AsigStack = createStackNavigator({
  Espanol:Asignaturas
});
AsigStack.navigationOptions ={
  tabBarLabel:"Asignaturas"
};


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
const tareasNavigator = createStackNavigator({
  Secundaria:{
    screen:AsigStack,
    navigationOptions: {
        header:null
    }
},
  Primaria:{
    screen:TareasStack,
    navigationOptions: {
        header:null
    }
},
Preescolar:{
  screen:TareasStack,
  navigationOptions: {
      header:null
  }
},
prekinder:{
  screen:TareasStack,
  navigationOptions: {
      header:null
  }
}
});
const NivelContainer = createAppContainer(tareasNavigator);
export default class TareasScreen extends Component {
  componentDidMount(){
    this.setNivel();
  }
  setNivel() {
    // call navigate for AppNavigator here:
    this.navigator &&
      this.navigator.dispatch(
        NavigationActions.navigate({ routeName: global.nivel})
      );
  }
  render(){
    return(
      <NivelContainer 
      ref={nav => {
          this.navigator = nav;
        }}
      />
    );  
  }
}