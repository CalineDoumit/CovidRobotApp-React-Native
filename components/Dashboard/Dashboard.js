import React, { Component } from 'react';
import {Text} from 'react-native';

class Dashboard extends Component{
    constructor(props){
        super(props);
    }

    static navigationOptions = {
        title: 'Dashboard',
        headerLeft:null,

    };

    render(){
        return(
            <Text>TEST </Text>
        )
    }
}

export default Dashboard;

