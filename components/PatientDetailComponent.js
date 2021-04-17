import {
    Card, CardImg, CardBody,
    CardTitle, Text
} from 'react-native-elements';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCorrespondingPatient } from '../redux/ActionCreators';
import { View } from 'react-native';


const mapStateToProps = state => {
    return {
        robots: state.robots,
        patients: state.patients
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCorrespondingPatient: (robotId) => dispatch(fetchCorrespondingPatient(robotId)),
})

function RenderRobot({ robot }) {
    return (
        <Card>
            <CardImg top src='' alt={robot.roomNumber} />
            <CardBody>
                <CardTitle>{robot.name}</CardTitle>
                {/*<CardText>{robot.description}</CardText>*/}
            </CardBody>
        </Card>
    )
}

class PatientDetail extends Component {

    componentDidMount() {
        this.props.fetchCorrespondingPatient(this.props.navigation.getParam('robotId',''));
    
      }
    constructor(props) {
        super(props);
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
        alert("patient id: " + robotId)
    }

    RobotCome(robotId) {
        console.log("patient ID: " + robotId)
        this.props.fetchRobotCome(robotId);
        alert("patient id: " + robotId)
    }

    RobotStop(robotId) {
        console.log("patient ID: " + robotId)
        this.props.fetchRobotStop(robotId);
        alert("patient id: " + robotId)
    }

    render() {
        const robotId = this.props.navigation.getParam('robotId','');
        return (
            <View>
                <Text>TEST </Text>
                <Text>patient : {this.props.patients.correspondingPatient.description} </Text>
                <Text>robot : {robotId} </Text>
                <Text>hello</Text>
            </View>


        );

    }

}
//export default connect(mapStateToProps)(Home);
export default connect(mapStateToProps, mapDispatchToProps)(PatientDetail);
