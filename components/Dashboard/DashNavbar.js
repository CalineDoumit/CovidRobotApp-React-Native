import React, { Component } from "react";
import { Text, View, Button,TextInput,TouchableOpacity,Modal } from 'react-native';
import {  Icon } from 'react-native-elements';


 class DashNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      phonenumber: '',
      description: '',
      showNurseModal: false,
    };
    this.toggleNurseModal = this.toggleNurseModal.bind(this);
    this.resetNurseForm = this.resetNurseForm.bind(this);


  };



   toggleNurseModal=() => {
    console.log("toggleModal nurse")
    this.setState({
      showNurseModal: !this.state.showNurseModal
    })
  }

  resetNurseForm=() =>{
    this.setState({ username: '', password: '', firstname: '', lastname: '', description: '', phonenumber: '' })
  }

  render() {
    return (
      <View>
        
        <View style={{ backgroundColor: 'blue', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
          <TouchableOpacity style={{ margin: 5, borderRadius: 40, backgroundColor: '#4ea8cb', }}
          >
            <Text>Add Patient</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ margin: 5, borderRadius: 40, backgroundColor: '#4ea8cb', }}
            onPress={() => {
              this.toggleNurseModal();
            }} >
            <Text>Add Nurse</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ margin: 5, borderWidth: 4 }}
          >
            <Text>Assign Robot</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ margin: 5, borderWidth: 4 }}
          >
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>

        <Modal animationType={"slide"} visible={this.state.showNurseModal} transparent={false}
          onDismiss={this.toggleNurseModal}
          onRequestClose={() => this.toggleNurseModal()
         
          }>
            <View>
            <TextInput
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
            <TextInput
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
            <TextInput
              placeholder="Firstname"
              leftIcon={
                <Icon
                  name='comment-o'
                  type='font-awesome'
                  size={24}
                />
              }
              onChangeText={(value) => this.setState({ firstname: value })}
            />
            <TextInput
              placeholder="Lastname"
              leftIcon={
                <Icon
                  name='comment-o'
                  type='font-awesome'
                  size={24}
                />
              }
              onChangeText={(value) => this.setState({ lastname: value })}
            />
            <TextInput
              placeholder="Phone Number"
              leftIcon={
                <Icon
                  name='comment-o'
                  type='font-awesome'
                  size={24}
                />
              }
              onChangeText={(value) => this.setState({ phonenumber: value })}
            />
            <TextInput
              placeholder="Desctiption"
              leftIcon={
                <Icon
                  name='comment-o'
                  type='font-awesome'
                  size={24}
                />
              }
              onChangeText={(value) => this.setState({ desctiption: value })}
            />
            <TextInput
              placeholder="Date Of Birth"
              leftIcon={
                <Icon
                  name='comment-o'
                  type='font-awesome'
                  size={24}
                />
              }
              onChangeText={(value) => this.setState({ dateofBirth: value })}
            />
            <TextInput
              placeholder="Allergies"
              leftIcon={
                <Icon
                  name='comment-o'
                  type='font-awesome'
                  size={24}
                />
              }
              onChangeText={(value) => this.setState({ allergies: value })}
            />
            <TextInput
              placeholder="Emergency Contact"
              leftIcon={
                <Icon
                  name='comment-o'
                  type='font-awesome'
                  size={24}
                />
              }
              onChangeText={(value) => this.setState({ emergencyContact: value })}
            />
            <TextInput
              placeholder="Blood Type"
              leftIcon={
                <Icon
                  name='comment-o'
                  type='font-awesome'
                  size={24}
                />
              }
              onChangeText={(value) => this.setState({ bloodType: value })}
            />
            </View>
        </Modal>
      </View>
    )
  }

};
export default DashNavbar;

