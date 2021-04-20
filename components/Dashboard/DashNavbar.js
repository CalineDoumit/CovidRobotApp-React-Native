import React, { Component } from "react";
import { Text, View, TouchableOpacity, Modal,ModalHeader,ModalBody } from 'react-native';
import { Input, Icon } from 'react-native-elements';


export default class DashNavbar extends Component {
  constructor(props) {
    super(props);
    this.image = "https://www.google.com/imgres?imgurl=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20190301%2Fourlarge%2Fpngtree-vector-administration-icon-png-image_747092.jpg&imgrefurl=https%3A%2F%2Fpngtree.com%2Ffreepng%2Fvector-administration-icon_4090499.html&tbnid=_-PfS-qdsdd64M&vet=12ahUKEwj_4r-3vu_vAhVVt6QKHWInBxkQMygFegUIARDeAQ..i&docid=SVrhkK6EHI8bwM&w=640&h=640&q=admin%20logo&hl=en-GB&ved=2ahUKEwj_4r-3vu_vAhVVt6QKHWInBxkQMygFegUIARDeAQ"
    this.state = {
      isNavOpen: false,
      isPatientModalOpen: false,
      isNurseModalOpen: false,
      isAssignModalOpen: false,
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      phonenumber: '',
      description: '',
      allergies: '',
      bloodType: '',
      dateofBirth: '',
      emergencyContact: '',
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.togglePatientModal = this.togglePatientModal.bind(this);
    this.toggleNurseModal = this.toggleNurseModal.bind(this);
    this.toggleAssignModal = this.toggleAssignModal.bind(this);
    this.handlePatientSubmit = this.handlePatientSubmit.bind(this);
    this.handleNurseSubmit = this.handleNurseSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

  }
  handleLogout() {
    this.props.logoutUser();
  }

  handlePatientSubmit() {
    this.togglePatientModal();
    this.props.postPatient({
      username: this.state.username,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      phonenumber: this.state.phonenumber,
      description: this.state.description,
      allergies: this.state.allergies,
      bloodType: this.state.bloodType,
      dateofBirth: this.state.dateofBirth,
      emergencyContact: this.state.emergencyContact,
    });
  }

  handleNurseSubmit() {
    this.toggleNurseModal();
    this.props.postNurse({
      username: this.state.username,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      phonenumber: this.state.phonenumber,
      description: this.state.description,
    });
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  togglePatientModal() {
    this.setState({
      isPatientModalOpen: !this.state.isPatientModalOpen
    });
  }

  toggleNurseModal() {
    this.setState({
      isNurseModalOpen: !this.state.isNurseModalOpen
    });
  }

  toggleAssignModal() {
    this.setState({
      isAssignModalOpen: !this.state.isAssignModalOpen
    });
  }

  onChange(item, name) {
    console.log("changed")
  }

  render() {
    return (
      <View style={{ height: '10%', backgroundColor: 'blue', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
        <TouchableOpacity style={{ margin: 5, borderRadius: 40, backgroundColor: '#4ea8cb', }}
          onPress={this.togglePatientModal}>
          <Text>Add Patient</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ margin: 5, borderWidth: 4 }}
          onPress={this.toggleNurseModal}>
          <Text>Add Nurse</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ margin: 5, borderWidth: 4 }}
          onPress={this.toggleAssignModal}>
          <Text>Assign Robot</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ margin: 5, borderWidth: 4 }}
          onPress={this.handleLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>

        <Modal animationType={"slide"} visible={this.state.isPatientModalOpen}
          onDismiss={this.togglePatientModal}
          onRequestClose={() => this.togglePatientModal()
          }>
          <ModalHeader toggle={this.togglePatientModal}>Add Patient</ModalHeader>
          <ModalBody>
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
            <Input
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
            <Input
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
            <Input
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
            <Input
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
            <Input
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
            <Input
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
            <Input
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
            <Input
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
          </ModalBody>
        </Modal>
      </View>
    )
  }

};


