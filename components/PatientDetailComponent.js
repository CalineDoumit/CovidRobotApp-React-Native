import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button,Text
} from 'react-native-elements';
import React,{ Component } from 'react';
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return {
        robots: state.robots,
        patients:state.patients
    }
}

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

    render(){
        return(<Text>TEST</Text>);
        
    }

}
//export default connect(mapStateToProps)(Home);
export default connect(mapStateToProps)(PatientDetail);
