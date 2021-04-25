import React, { Component } from "react";
import { Text, View, Button, TextInput, TouchableOpacity, Modal,ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { postNurse, postPatient } from '../../redux/ActionCreators'
import { connect } from 'react-redux';
//import { ScrollView } from "react-native-gesture-handler";
const mapStateToProps = state => {
  return {
    users: state.users
  }
}


const mapDispatchToProps = (dispatch) => ({
  postNurse: (values) => dispatch(postNurse(values)),
  postPatient: (values) => dispatch(postPatient(values)),
  postAssign: (values) => dispatch(postAssign(values)),

})


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
      allergies: '',
      bloodType: '',
      dateofBirth: '',
      emergencyContact: '',
      showPatientModal: false,
      showNurseModal: false,
      showAssignModal: false,
      listOfInactivePatients:[],
      listOfInactiveRooms:[],
      chosenRobotid:0,
      chosenPatientid:0,


    };
    this.togglePatientModal = this.togglePatientModal.bind(this);
    this.toggleNurseModal = this.toggleNurseModal.bind(this);
    this.toggleAssignModal = this.toggleAssignModal.bind(this);
    this.resetNurseForm = this.resetNurseForm.bind(this);
    this.resetPatientForm = this.resetPatientForm.bind(this);
    this.handlePatientSubmit = this.handlePatientSubmit.bind(this);
    this.handleNurseSubmit = this.handleNurseSubmit.bind(this);
    //this.handleAssignSubmit = this.handleAssignSubmit.bind(this);
    this.activatePatientRobot=this.activatePatientRobot.bind(this);


  };


  toggleNurseModal = () => {
    console.log("toggleModal nurse")
    this.setState({
      showNurseModal: !this.state.showNurseModal
    })
  }

  togglePatientModal = () => {
    console.log("toggleModal patient")
    this.setState({
      showPatientModal: !this.state.showPatientModal
    })
  }

  makeListPatients(){
    this.props.users.users.map((user,index)=>{
      if(user.isActive==false){
        this.state.listOfInactiveRooms.length=0
        this.state.listOfInactivePatients.push({label:user.firstname,value:user.patient})
      }
    })
  }

  makeListRooms(){
    alert("all the robots : "+ JSON.stringify(this.props.robots.robots))
    this.props.robots.robots.map((robot)=>{
      if(robot.isOccupied==false){
        this.state.listOfInactiveRooms.length=0
        this.state.listOfInactiveRooms.push({label:robot.roomNumber,value:robot.number})
      }
    })
  }

  toggleAssignModal = () => {
    console.log("toggleModal patient")
    this.makeListPatients();
    this.makeListRooms();
    this.setState({
      showAssignModal: !this.state.showAssignModal
    })
  }

  handleNurseSubmit = () => {

    this.props.postNurse({
      username: this.state.username,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      phonenumber: this.state.phonenumber,
      description: this.state.description,

    });
    this.toggleNurseModal();
    console.log("button pressed")
  }

  handlePatientSubmit = () => {
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
    this.togglePatientModal();
    console.log("button pressed")
  }

  activatePatientRobot(patientId,robotNumber){
    alert("patient ID: "+patientId)
    alert("robot number "+robotNumber)
    this.props.postAssign({patientId:patientId,robotnumber:robotNumber});
}

 /* handleAssign(){
    console.log("patient id "+ this.state.chosenPatientid)
    console.log("robot id "+ this.state.chosenRobotid)
    this.activatePatientRobot(this.state.chosenPatientid,this.state.chosenRobotid)

  }*/

  resetPatientForm = () => {
    this.setState({ username: '', password: '', firstname: '', lastname: '', description: '', phonenumber: '', allergies: '', bloodType: '', dateofBirth: '', emergencyContact: '', })
  }
  resetNurseForm = () => {
    this.setState({ username: '', password: '', firstname: '', lastname: '', description: '', phonenumber: '' })
  }

  render() {
    return (
      <View>

        <View style={{ backgroundColor: 'blue', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', height: '50%' }}>
          <TouchableOpacity style={{ margin: 5, borderRadius: 40, backgroundColor: '#4ea8cb', }}
            onPress={() => {
              this.togglePatientModal();
            }}
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
          onPress={() => {
            this.toggleAssignModal();
          }} >
            <Text>Assign Robot</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ margin: 5, borderWidth: 4 }}
          >
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>

        <Modal animationType={"slide"} visible={this.state.showPatientModal}
          onDismiss={this.togglePatientModal}
          onRequestClose={() => this.togglePatientModal()}>
          <View>
            <Text>ADD PATIENT</Text>
            <ScrollView>
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
                style={{ margin: 10 }}
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
                style={{ margin: 10 }}
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
                style={{ margin: 10 }}
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
                style={{ margin: 10 }}
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
                style={{ margin: 10 }}
              />
              <TextInput
                placeholder="Description"
                leftIcon={
                  <Icon
                    name='comment-o'
                    type='font-awesome'
                    size={24}
                  />
                }
                onChangeText={(value) => this.setState({ description: value })}
                style={{ margin: 10 }}
              />
              <TextInput
                placeholder="Date of Birth"
                leftIcon={
                  <Icon
                    name='comment-o'
                    type='font-awesome'
                    size={24}
                  />
                }
                onChangeText={(value) => this.setState({ dateofBirth: value })}
                style={{ margin: 10 }}
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
                style={{ margin: 10 }}
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
                style={{ margin: 10 }}
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
                style={{ margin: 10 }}
              />

              

              <TouchableOpacity style={{ borderWidth: 4, width: 100, alignSelf: 'center' }} onPress={this.handlePatientSubmit}>
                <Text>SUBMIT</Text>
              </TouchableOpacity>
            </ScrollView>

          </View>
        </Modal>

        <Modal animationType={"slide"} visible={this.state.showNurseModal} //transparent={false}
          onDismiss={this.toggleNurseModal}
          onRequestClose={() => this.toggleNurseModal()

          }>
          <View>
            <Text>ADD NURSE</Text>
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
              style={{ margin: 10 }}
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
              style={{ margin: 10 }}
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
              style={{ margin: 10 }}
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
              style={{ margin: 10 }}
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
              style={{ margin: 10 }}
            />
            <TextInput
              placeholder="Description"
              leftIcon={
                <Icon
                  name='comment-o'
                  type='font-awesome'
                  size={24}
                />
              }
              onChangeText={(value) => this.setState({ description: value })}
              style={{ margin: 10 }}
            />

            <TouchableOpacity style={{ borderWidth: 4, width: 100, alignSelf: 'center' }} onPress={this.handleNurseSubmit}>
              <Text>SUBMIT</Text>
            </TouchableOpacity>

          </View>
        </Modal>

        


      </View>
    )
  }

};


export default connect(mapStateToProps, mapDispatchToProps)(DashNavbar);