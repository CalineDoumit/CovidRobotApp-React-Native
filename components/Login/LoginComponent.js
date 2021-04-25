import React, { Component } from "react";
import { Avatar, Button, Input, CheckBox } from 'react-native-elements';
import { Auth } from "../../redux/auth";
import { loginUser } from '../../redux/ActionCreators';
import { connect } from "react-redux";
import { View,StyleSheet } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Navigation from '../Navigation'
// https://docs.expo.io/versions/latest/sdk/securestore/
import * as SecureStore from 'expo-secure-store';
// https://docs.expo.io/versions/v36.0.0/sdk/permissions/
import * as Permissions from 'expo-permissions';
// https://docs.expo.io/versions/latest/sdk/imagepicker/
import * as ImagePicker from 'expo-image-picker';



/*
const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}*/

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
            remember: false
        };

        this.handleLogin = this.handleLogin.bind(this);
    };
    componentDidMount() {
        SecureStore.getItemAsync('userinfo')
            .then((userdata) => {
                let userinfo = JSON.parse(userdata);
                if (userinfo) {
                    this.setState({ username: userinfo.username });
                    this.setState({ password: userinfo.password });
                    this.setState({ uRole: userinfo.uRole });
                    this.setState({ remember: true })
                }
            })
    }


    handleLogin() {
        console.log("fetna bl login")

        if (this.state.remember)
            SecureStore.setItemAsync('userinfo', JSON.stringify({ username: this.state.username, password: this.state.password ,uRole:this.state.uRole}))
            .then(()=>{
                this.props.loginUser({ username: this.state.username, password: this.state.password })
                if (this.state.uRole === "nurse") {
                    this.props.navigation.navigate("NurseMenu")
                }
                if (this.state.uRole === "admin") {
                    this.props.navigation.navigate("Dashboard")
                }

            })
                .catch((error) => console.log('Could not save user info', error));
        else
            SecureStore.deleteItemAsync('userinfo')
            .then(()=>{
                this.props.loginUser({ username: this.state.username, password: this.state.password })
                if (this.state.uRole === "nurse") {
                    this.props.navigation.navigate("NurseMenu")
                }
                if (this.state.uRole === "admin") {
                    this.props.navigation.navigate("Dashboard")
                }

            })
                .catch((error) => console.log('Could not delete user info', error));

                         
                //event.preventDefault();

        
    }



    render() {
        return (
            <ScrollView>

                <View>
                    <Avatar src="" style={{ marginLeft: 200, marginBottom: 40 }} />
                    <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Password"
                    secureTextEntry={true}
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    />
                <CheckBox title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                    />
                </View>

                <View>
                    <Button title="LOGIN" onPress={() => {
                        console.log("fetna bl onPress")
                        this.handleLogin()
                    }} />
                </View>


            </ScrollView >
        );
    }
}

//export default connect(mapStateToProps, mapDispatchToProps)(Login);
export default connect(mapDispatchToProps)(Login);


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
