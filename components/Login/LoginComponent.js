import React, { Component } from "react";
import { Avatar, Button, Input, Icon } from 'react-native-elements';
import { Auth } from "../../redux/auth";
import { loginUser } from '../../redux/ActionCreators';
import { connect } from "react-redux";
import { View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Navigation from '../Navigation'



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
            password: ''
        };

        this.handleLogin = this.handleLogin.bind(this);
    };
    componentDidMount() {
        //document.body.style.backgroundColor = "#464646"
    }


    handleLogin() {
        console.log("fetna bl login")
        this.props.loginUser({ username: this.state.username, password: this.state.password })
            .then(() => {
                console.log("Step 1: setting state")
                this.setState({
                    uRole: localStorage.getItem('userRole')
                })

                    if(this.state.uRole==="nurse"){
                        this.props.navigation.navigate("NurseMenu")
                    }
                    if(this.state.uRole==="admin"){
                        this.props.navigation.navigate("Dashboard")
                    }
       
        //event.preventDefault();
            
            })
    }



    render() {
        return (
            <ScrollView>
                          
                    <View>
                        <Avatar src="" style={{ marginLeft: 200, marginBottom: 40 }} />
                        <Input
                            placeholder='Username'
                            leftIcon={
                                <Icon
                                    name='user-o'
                                    type='font-awesome'
                                    size={24}
                                />
                            }
                            onChangeText={(value) => this.setState({ username: value })}
                        />
                        <Input
                            placeholder="Password"
                            secureTextEntry={true}
                            leftIcon={
                                <Icon
                                    name='comment-o'
                                    type='font-awesome'
                                    size={24}
                                />
                            }
                            onChangeText={(value) => this.setState({ password: value })}
                        />
                    </View>

                    <View>
                        <Button title="LOGIN" onPress={() => {
                            console.log("fetna bl onPress")
                            this.handleLogin()
                            }}/>
                    </View>
                

            </ScrollView >
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);