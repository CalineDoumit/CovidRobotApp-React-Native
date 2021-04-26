import React, { Component } from 'react';
import { View,Text,TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/ActionCreators'

const mapStateToProps = state => {
    return {
        users: state.users,
    }
}

const mapDispatchToProps = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers()),
    logoutUser: () => dispatch(logoutUser()),

})



class PatientMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myself: null
        }
        this.handleLogout = this.handleLogout.bind(this);

    }

    componentDidMount() {
        this.props.users.users.map((user) => {
            if (user.username === this.props.navigation.getParam('username'))
                this.setState({ myself: user })
        })
    }
    handleLogout = () => {
        this.props.logoutUser();
        this.props.navigation.navigate('Login')
    }


    render() {
        return (
            <View>
                <Text>PATIENT INFORMATION</Text>
                <Text>{JSON.stringify(this.state.myself)}</Text>
                <TouchableOpacity style={{ margin: 5, borderRadius: 40, backgroundColor: '#4ea8cb', }}

                    onPress={() => {
                        this.handleLogout();
                    }} >

                    <Text>LOGOUT</Text>

                </TouchableOpacity>
            </View>
        )
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(PatientMenu);


