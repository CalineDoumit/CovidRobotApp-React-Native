import React, { Component } from "react";
import { Text, View, Button, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { postNurse, postPatient, fetchUsers, fetchRobots,postAssign,logoutUser } from '../../redux/ActionCreators'
import { connect } from 'react-redux';
//import { ScrollView } from "react-native-gesture-handler";
import DropDownPicker from 'react-native-dropdown-picker'


const mapStateToProps = state => {
  return {
    users: state.users,
    robots: state.robots
  }
}


const mapDispatchToProps = (dispatch) => ({
  postNurse: (values) => dispatch(postNurse(values)),
  postPatient: (values) => dispatch(postPatient(values)),
  postAssign: (values) => dispatch(postAssign(values)),
  fetchUsers: () => dispatch(fetchUsers()),
  fetchRobots: () => dispatch(fetchRobots()),
  logoutUser: () => dispatch(logoutUser()),


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
      listOfInactivePatients: [],
      listOfInactiveRooms: [],
      chosenRobotid: 0,
      chosenPatientid: 0,


    };
    this.togglePatientModal = this.togglePatientModal.bind(this);
    this.toggleNurseModal = this.toggleNurseModal.bind(this);
    this.toggleAssignModal = this.toggleAssignModal.bind(this);
    this.resetNurseForm = this.resetNurseForm.bind(this);
    this.resetPatientForm = this.resetPatientForm.bind(this);
    this.handlePatientSubmit = this.handlePatientSubmit.bind(this);
    this.handleNurseSubmit = this.handleNurseSubmit.bind(this);
    this.handleAssignSubmit = this.handleAssignSubmit.bind(this);
    //this.activatePatientRobot = this.activatePatientRobot.bind(this);
    this.makeListPatients = this.makeListPatients.bind(this);
    this.makeListRooms = this.makeListRooms.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  };

  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchRobots();

  }
  handleLogout=()=>{
    this.props.logoutUser();
    this.props.navigation.navigate('Login')
}

  makeListPatients() {
    this.state.listOfInactivePatients.length = 0
    this.props.users.users.map((user, index) => {

      if (user.isActive == false) {
        console.log("user: " + JSON.stringify(user))
        this.state.listOfInactivePatients.push({ label: user.firstname, value: user.patient, icon: () => <Icon name="user" size={18} color="#0099CC" /> })
      }
    })
  }

  makeListRooms() {
    this.state.listOfInactiveRooms.length = 0
    this.props.robots.robots.map((robot) => {
      if (robot.isOccupied == false) {
        this.state.listOfInactiveRooms.push({ label: robot.roomNumber, value: robot.number, icon: () => <Icon name="h-square" size={18} color="#0099CC" /> })
      }
    })
  }


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
    this.props.fetchUsers();
  }


  toggleAssignModal = () => {
    console.log("toggleModal patient")
    this.makeListPatients();
    this.makeListRooms();
    this.setState({
      showAssignModal: !this.state.showAssignModal
    })
    this.props.fetchUsers();
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
    this.props.fetchUsers();

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

  activatePatientRobot(patientId, robotNumber) {
    //alert("patient ID: " + patientId)
    //alert("robot number " + robotNumber)
    this.props.postAssign({ patientId: patientId, robotnumber: robotNumber });
  }

  handleAssignSubmit() {
    console.log("patient id " + this.state.chosenPatientid)
    console.log("robot id " + this.state.chosenRobotid)
    this.activatePatientRobot(this.state.chosenPatientid, this.state.chosenRobotid)
    this.toggleAssignModal()

  }

  resetPatientForm = () => {
    this.setState({ username: '', password: '', firstname: '', lastname: '', description: '', phonenumber: '', allergies: '', bloodType: '', dateofBirth: '', emergencyContact: '', })
  }
  resetNurseForm = () => {
    this.setState({ username: '', password: '', firstname: '', lastname: '', description: '', phonenumber: '' })
  }

  render() {
    return (
      <View style={{borderWidth:4, height:'10%'}}>

        <View style={{backgroundColor: 'black', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' , flex:1}}>
          <TouchableOpacity style={{ margin: 5, }}
            onPress={() => {
              this.togglePatientModal();
            }}
          >
            <Text style ={{color:'#FFFFFF'}}>Add Patient</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ margin: 5}}
            onPress={() => {
              this.toggleNurseModal();
            }} >
            <Text style ={{color:'#FFFFFF'}}>Add Nurse</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ margin: 5 }}
            onPress={() => {
              this.toggleAssignModal();
            }} >
            <Text style ={{color:'#FFFFFF'}}>Assign Robot</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ margin: 5, backgroundColor:'#0099CC',borderRadius:30, width:80 ,alignItems:'center'}}
           onPress={() => {
            this.handleLogout();
        }}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>

        <Modal animationType={"slide"} visible={this.state.showPatientModal}
          onDismiss={this.togglePatientModal}
          onRequestClose={() => this.togglePatientModal()}>
          <View>
            <View style={{alignItems:'center',backgroundColor:'#0099CC', height:50, justifyContent:'center'}}>
            <Text style ={{fontSize:25, color:'white'}}>ADD PATIENT</Text>
            </View>
            
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


<View style={{alignItems:'center'}}>
              <TouchableOpacity style={{ margin: 5, backgroundColor:'#0099CC',borderRadius:30, width:150,height:50 ,alignItems:'center',justifyContent:'center'}} onPress={this.handlePatientSubmit}>
                <Text style={{color:'white',fontSize:20}}>SUBMIT</Text>
              </TouchableOpacity>
              </View>
            </ScrollView>

          </View>
        </Modal>

        <Modal animationType={"slide"} visible={this.state.showNurseModal} //transparent={false}
          onDismiss={this.toggleNurseModal}
          onRequestClose={() => this.toggleNurseModal()

          }>
          <View>
          <View style={{alignItems:'center',backgroundColor:'#0099CC', height:50, justifyContent:'center'}}>
            <Text style ={{fontSize:25, color:'white'}}>ADD NURSE</Text>
            </View>
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
<View style={{alignItems:'center'}}>
            <TouchableOpacity style={{ margin: 5, backgroundColor:'#0099CC',borderRadius:30, width:150,height:50 ,alignItems:'center',justifyContent:'center'}} onPress={this.handleNurseSubmit}>
              <Text style={{color:'white',fontSize:20}} >SUBMIT</Text>
            </TouchableOpacity>
            </View>

          </View>
        </Modal>

        <Modal animationType={"slide"} visible={this.state.showAssignModal}
          onDismiss={this.toggleAssignModal}
          onRequestClose={() => this.toggleAssignModal()

          }>

          <View>
          <View style={{alignItems:'center',backgroundColor:'#0099CC', height:50, justifyContent:'center',marginBottom:200}}>
            <Text style ={{fontSize:25, color:'white'}}>ASSIGN A PATIENT TO A ROOM</Text>
            </View>
            <DropDownPicker
              placeholder='Select a patient'
              items={this.state.listOfInactivePatients}
              //defaultValue={this.state.country}
              containerStyle={{ height: 40,marginBottom:10 }}
              style={{ backgroundColor: '#fafafa' }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={item => this.setState({chosenPatientid : item.value})}
            />

            <DropDownPicker
              placeholder='Select a Room'
              items={this.state.listOfInactiveRooms}
              //defaultValue={this.state.country}
              containerStyle={{ height: 40 }}
              style={{ backgroundColor: '#fafafa' }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={item =>this.setState({chosenRobotid : item.value})}
            />
            <View style={{alignItems:'center', marginTop:20}}>
            <TouchableOpacity style={{ margin: 50, backgroundColor:'#0099CC',borderRadius:30, width:150,height:50 ,alignItems:'center',justifyContent:'center'}}
            onPress={this.handleAssignSubmit} >
              <Text style={{color:'white',fontSize:20}}>Submit</Text>
            </TouchableOpacity>
</View>
          </View>

        </Modal>

      </View>
    )
  }

};


export default connect(mapStateToProps, mapDispatchToProps)(DashNavbar);