import React ,{ Component } from 'react';
import { View } from 'react-native';
import {Text} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        users: state.users,
    }
}

const mapDispatchToProps = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers()),

})



class PatientMenu extends Component {
    constructor(props) {
        super(props);
        this.state={
            myself:null
        }
    }

    componentDidMount(){
        this.props.users.users.map((user)=>{
            if(user.username===this.props.navigation.getParam('username'))
                this.setState({myself: user})
        })
    }
 
    render() {
        return(
            <View>
            <Text>PATIENT INFORMATION</Text>
            <Text>{JSON.stringify(this.state.myself)}</Text>
            </View>
        )
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(PatientMenu);


