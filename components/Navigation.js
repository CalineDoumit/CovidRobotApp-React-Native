import React from 'react';
import NurseMenuScreen from './NurseMenuComponent';
import PatientDetailScreen from './PatientDetailComponent';
import DashboardScreen from './Dashboard/Dashboard';
import LoginScreen from './Login/LoginComponent';
import PatientMenuScreen from './PatientMenuComponent';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const myStackNavigator = createStackNavigator({
    Login:{
        screen:LoginScreen
    },
    Dashboard:{
        screen:DashboardScreen
    },
    NurseMenu:{
        screen:NurseMenuScreen
    }, 
    
    PatientDetail:{
        screen:PatientDetailScreen
    },

    PatientMenu:{
        screen:PatientMenuScreen
    },

})

const appContainer = createAppContainer(myStackNavigator);
export default appContainer;