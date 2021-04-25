import React from 'react';
import NurseMenuScreen from './NurseMenuComponent';
import PatientDetailScreen from './PatientDetailComponent';
import DashboardScreen from './Dashboard/Dashboard';
import LoginScreen from './Login/LoginComponent';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const myStackNavigator = createStackNavigator({
    NurseMenu:{
        screen:NurseMenuScreen
    }, 
    Login:{
        screen:LoginScreen
    },

    Dashboard:{
        screen:DashboardScreen
    },



   
    PatientDetail:{
        screen:PatientDetailScreen
    },

})

const appContainer = createAppContainer(myStackNavigator);
export default appContainer;