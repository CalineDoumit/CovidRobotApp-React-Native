import React, { Component } from 'react';
import NurseMenuScreen from './NurseMenuComponent';
import PatientDetailScreen from './PatientDetailComponent';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { connect } from 'react-redux';
import { fetchRobots } from '../redux/ActionCreators';


const mapStateToProps = state => {
  return {
    robots:state.robots
  }
}

const mapDispatchToProps = dispatch => ({
  fetchRobots: () => { dispatch(fetchRobots()) },
})


const navConfig = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: 'green',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  }
}

const NurseMenuNavigator = createStackNavigator(
  {
    //NurseMenu: NurseMenuScreen,
    PatientDetail: PatientDetailScreen,
  },
  {
    //initialRouteName: 'Menu',
    //...navConfig
  }
);

const MainContainer = createAppContainer(NurseMenuNavigator);

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
  }

  render() {
 
    return (
        <MainContainer />
    );
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);