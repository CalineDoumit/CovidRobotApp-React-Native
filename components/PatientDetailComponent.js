import {
    Card, CardImg, CardBody,
    CardTitle, Text
} from 'react-native-elements';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCorrespondingPatient, fetchCorrespondingUser, fetchRobotGo, fetchRobotCome, fetchRobotStop } from '../redux/ActionCreators';
import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';




const mapStateToProps = state => {
    return {
        robots: state.robots,
        patients: state.patients,
        users: state.user,
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCorrespondingPatient: (robotId) => dispatch(fetchCorrespondingPatient(robotId)),
    fetchCorrespondingUser: (robotId) => dispatch(fetchCorrespondingUser(robotId)),
    fetchRobotGo: (robotId) => { dispatch(fetchRobotGo(robotId)) },
    fetchRobotCome: (robotId) => { dispatch(fetchRobotCome(robotId)) },
    fetchRobotStop: (robotId) => { dispatch(fetchRobotStop(robotId)) }
})


class PatientDetail extends Component {

    componentDidMount() {
        this.props.fetchCorrespondingPatient(this.props.navigation.getParam('robotId', ''));
        this.props.fetchCorrespondingUser(this.props.navigation.getParam('robotId', ''));
        //console.log("firstname in didMount",this.props.users.correspondingUser)
        this.state.tableData.length = 0,
            this.props.patients.correspondingPatient.temperatures.map((user) => {
                this.state.tableData.push([user])
            })

    }
    constructor(props) {
        super(props);
        this.state = {
            myrobot: this.props.robots.robots.filter((robot) => robot._id === this.props.navigation.getParam('robotId', ''))[0],
            tableData: [],
            tableHead: ['Temperature'],
        }
        this.RobotGo = this.RobotGo.bind(this);
        this.RobotCome = this.RobotCome.bind(this);
        this.RobotStop = this.RobotStop.bind(this);
    }

    static navigationOptions = {
        title: 'Patient Information'
    };


    RobotGo(robotId) {
        console.log("patient ID: " + robotId)
        this.props.fetchRobotGo(robotId);
        //alert("patient id: " + robotId)
    }

    RobotCome(robotId) {
        console.log("patient ID: " + robotId)
        this.props.fetchRobotCome(robotId);
        //alert("patient id: " + robotId)
    }

    RobotStop(robotId) {
        console.log("patient ID: " + robotId)
        this.props.fetchRobotStop(robotId);
        // alert("patient id: " + robotId)
    }

    render() {
        {
            this.state.tableData.length = 0,
                this.props.patients.correspondingPatient.temperatures.map((user) => {
                    this.state.tableData.push([user])
                })
        }
        const robotId = this.props.navigation.getParam('robotId', '');
        return (

            <View style={{ backgroundColor: '#FFFFFF' }}>

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Image source={{ uri: "data:image/jpeg;base64,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'" }}
                        style={{
                            width: 70,
                            height: 70,
                        }}
                    />
                    <Text style={{ fontSize: 30, alignSelf: 'center' }}> ROOM : {this.state.myrobot.roomNumber} </Text>
                </View>
                <ScrollView style={{ height: "100%" }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}>
                        <TouchableOpacity style={{ margin: 5, borderRadius: 30, backgroundColor: '#4ea8cb', width: 80, alignItems: 'center' }}
                            onPress={
                                () => this.RobotGo(this.state.myrobot.number)
                            } >
                            <Text style={{ color: 'white', fontSize: 20 }}>GO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ margin: 5, borderRadius: 30, backgroundColor: '#4ea8cb', width: 80, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                this.RobotStop(this.state.myrobot.number);
                            }} >
                            <Text style={{ color: 'white', fontSize: 18 }} >STOP</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ margin: 5, borderRadius: 40, backgroundColor: '#4ea8cb', width: 80, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                this.RobotCome(this.state.myrobot.number);
                            }} >
                            <Text style={{ color: 'white', fontSize: 18 }} >COME</Text>
                        </TouchableOpacity>
                    </View>

<View style={{margin:5}}>
                    <Text style={{fontStyle:'italic'}}>Robot is {this.state.myrobot.position}</Text>
                    {this.state.myrobot.isObstacle === true ?
                        <Text style={{fontStyle:'italic'}}> No Obstacles Found</Text>
                        :
                        <Text style={{fontStyle:'italic'}}>Obstacles Found</Text>


                    }
</View>
                    <View style={{ width: "100%", backgroundColor: '#0099CC', height: 40, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }} >
                        <Icon name="user" size={30} color='#FFFFFF' />
                        <Text style={{ fontSize: 25, fontWeight: "bold", color: 'white' }}> Patient </Text>
                    </View>
                    <Text style={{ fontSize: 15 }}>firstname lastname </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 15 }}>phone number  </Text>
                    </View>
                    <Text style={{ marginBottom: 20, fontSize: 15 }}>Emergency Contact : {this.props.patients.correspondingPatient.emergencyContact} </Text>


                    <View style={{ marginBottom: 20 }}>
                        <View style={{ width: "100%", backgroundColor: '#0099CC', height: 40, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }} >
                            <Icon name="hospital-o" size={30} color='#FFFFFF' />
                            <Text style={{ fontSize: 25, fontWeight: "bold", color: 'white' }}> Description </Text>
                        </View>
                        <Text style={{ fontSize: 15 }}>{this.props.patients.correspondingPatient.description} </Text>
                        <Text style={{ fontSize: 15 }}>Date of birth : {this.props.patients.correspondingPatient.dateofBirth} </Text>
                        <Text style={{ fontSize: 15 }}>Allergies : {this.props.patients.correspondingPatient.allergies} </Text>
                        <Text style={{ fontSize: 15 }}>Blood Type : {this.props.patients.correspondingPatient.bloodType} </Text>
                    </View>





                    <View style={{ width: "100%", backgroundColor: '#0099CC', height: 40, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }} >
                        <Icon name="thermometer" size={30} color='#FFFFFF' />
                        <Text style={{ fontSize: 25, fontWeight: "bold", color: 'white' }}> Temperature </Text>
                    </View>

                    <View style={{ width: "100%" }}>
                        <Table borderStyle={{ borderColor: 'black' }}>
                            <ScrollView style={{ height: '70%' }} >
                                {
                                    this.state.tableData.map((rowData, index) => (
                                        <TableWrapper key={index} style={{ flexDirection: 'row', backgroundColor: '##F5FFFA', height: 30 }}>
                                            {
                                                rowData.map((cellData, cellIndex) => (
                                                    <Cell key={cellIndex} data={cellData} textStyle={{ margin: 6, height: 40 }} />
                                                ))
                                            }
                                        </TableWrapper>
                                    ))
                                }
                            </ScrollView>
                        </Table>
                    </View>





                </ScrollView>
            </View>


        );

    }

}
//export default connect(mapStateToProps)(Home);
export default connect(mapStateToProps, mapDispatchToProps)(PatientDetail);
