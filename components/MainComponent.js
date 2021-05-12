import React, { Component } from 'react';
import Navigation from './Navigation'
import NurseMenuScreen from './NurseMenuComponent';
import PatientDetailScreen from './PatientDetailComponent';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { connect } from 'react-redux';
import { fetchRobots,fetchPatients } from '../redux/ActionCreators';


const mapStateToProps = state => {
  return {
    robots:state.robots,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchRobots: () => { dispatch(fetchRobots()) },

})


class Main extends Component {
  componentDidMount() {
    this.props.fetchRobots();

  }

  render() {
 
    return (
        <Navigation />
    );
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);