import React from 'react';
import {createStackNavigator,createMaterialTopTabNavigator} from 'react-navigation';
import General from './AvisosContent/AvisosGenerales';
import Nivel from './AvisosContent/AvisosNivel';
import Grupo from './AvisosContent/AvisosGrupales';
import Personal from './AvisosContent/AvisosPersonales';

const GeneralStatck = createStackNavigator({
  Generales: General
});
GeneralStatck.navigationOptions= {
  tabBarLabel: "Generales"
};

const NivelStack = createStackNavigator({
  Nivel: Nivel
});
NivelStack.navigationOptions = {
  tabBarLabel: "Nivel"
};

const GrupoStack = createStackNavigator({
  Grupales: Grupo
});
GrupoStack.navigationOptions = {
  tabBarLabel: "Grupo"
};

const PersonalStack = createStackNavigator({
  Personales: Personal
});
PersonalStack.navigationOptions = {
  tabBarLabel: "Personal"
};

const AvisosStack = createMaterialTopTabNavigator({
  GeneralStatck,
  NivelStack,
  GrupoStack,
  PersonalStack
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
      width:100
    }
  },
});

export default AvisosStack;
