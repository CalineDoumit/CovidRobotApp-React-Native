import React, { Component } from "react";
import { Avatar, Button, Input, CheckBox } from 'react-native-elements';
import { Auth } from "../../redux/auth";
import { loginUser } from '../../redux/ActionCreators';
import { connect } from "react-redux";
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Navigation from '../Navigation'
import { FontAwesome } from 'react-native-fontawesome'
// https://docs.expo.io/versions/latest/sdk/securestore/
import * as SecureStore from 'expo-secure-store';
// https://docs.expo.io/versions/v36.0.0/sdk/permissions/
import * as Permissions from 'expo-permissions';
// https://docs.expo.io/versions/latest/sdk/imagepicker/
import * as ImagePicker from 'expo-image-picker';



const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}

const mapDispatchToProps = dispatch => ({
    loginUser: (creds) => dispatch(loginUser(creds)),

})



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //redirect: false,
            uRole: '',
            username: '',
            password: '',
        };

        this.handleLogin = this.handleLogin.bind(this);
    };
    componentDidMount() {

    }

    handleLogin = () => {
        this.props.loginUser({ username: this.state.username, password: this.state.password })
            .then(() => {
                SecureStore.getItemAsync('userRole')
                    .then((RoleUser) => {
                        this.setState({ uRole: RoleUser })
                        console.log("MY USER ROLE: " + this.state.uRole)
                        if (this.state.uRole === 'nurse') {
                            this.props.navigation.navigate("NurseMenu")
                        }
                        else if (this.state.uRole === 'admin') {
                            console.log("I am a admin")
                            this.props.navigation.navigate("Dashboard")
                        }
                        else {
                            console.log("I am a patient")
                            this.props.navigation.navigate("PatientMenu", { username: this.state.username })
                        }
                    })
                    .catch((error) => console.log('ERROR', error));

            })

    }



    render() {
        return (
            <ScrollView>

                <View style={{ justifyContent: 'space-around', alignItems: 'center' }}>
                    <View style={{ marginTop: 40, marginBottom: 40 }}>
                        <Avatar
                            rounded
                            size="xlarge"
                            source={require('./avatar.png')}


                        />
                    </View>
                    <View style={{ width: '80%' }}>

                        <Input
                            placeholder="Username"
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            onChangeText={(user) => this.setState({ username: user })}
                            style={{ width: '80%' }}
                        />

                    </View>
                    <View style={{ width: '80%' }}>
                        <Input
                            placeholder="Password"
                            secureTextEntry={true}
                            leftIcon={{ type: 'font-awesome', name: 'key' }}
                            onChangeText={(password) => this.setState({ password: password })}
                        />
                    </View>


                    <View style={{ marginTop: 40, width: '80%' }}>
                        <Button title="LOGIN" onPress={
                            //console.log("fetna bl onPress")
                            this.handleLogin
                        }

                        />
                    </View>
                </View>


            </ScrollView >
        );
    }
}

//export default connect(mapStateToProps, mapDispatchToProps)(Login);
export default connect(mapStateToProps, mapDispatchToProps)(Login);


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    image: {
        margin: 10,
        width: 80,
        height: 60
    },
    formInput: {
        margin: 20
    },
    formCheckbox: {
        margin: 20,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }
});
