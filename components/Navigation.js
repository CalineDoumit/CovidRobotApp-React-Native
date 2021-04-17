import React from 'react';

import NurseMenuScreen from './NurseMenuComponent';
import PatientDetailScreen from './PatientDetailComponent';
import LoginScreen from './Login/LoginComponent';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const myStackNavigator = createStackNavigator({
    Login:{
        screen:LoginScreen
    },
    NurseMenu:{
        screen:NurseMenuScreen
    },
    PatientDetail:{
        screen:PatientDetailScreen
    }
})

const appContainer = createAppContainer(myStackNavigator);
export default appContainer;