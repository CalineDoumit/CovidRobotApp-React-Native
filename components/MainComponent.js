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
    patients:state.patients
  }
}

const mapDispatchToProps = dispatch => ({
  fetchRobots: () => { dispatch(fetchRobots()) },
  fetchPatients: () => { dispatch(fetchPatients()) },

})



// Drawer navigator can be replaced by TabNavigator
/*const MainNavigator = createDrawerNavigator({
  Home: {
    screen: HomeNavigator,
  },
  Menu: {
    screen: MenuNavigator,
  },
  Contact : {
    screen : ContactNavigator
  },
  About : {
    screen : AboutNavigator
  },
  Reservation: {
    screen : ReservationNavigator
  }
});
*/
//const MainContainer = createAppContainer(MainNavigator);

class Main extends Component {
  componentDidMount() {
    this.props.fetchRobots();
    this.props.fetchPatients();

  }

  render() {
 
    return (
        <Navigation />
    );
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);