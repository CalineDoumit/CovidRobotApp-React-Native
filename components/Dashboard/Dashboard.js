import React, { Component } from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-elements';
import DashNavbar from './DashNavbar';



class Dashboard extends Component{
    constructor(props){
        super(props);
    }

    static navigationOptions = {
        header:null,

    };

    render(){
        return(
            <View>
                <DashNavbar/>
            </View>
           
        )
    }
}

export default Dashboard;

