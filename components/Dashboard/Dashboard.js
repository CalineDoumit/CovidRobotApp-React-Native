import React, { Component } from 'react';
import { View, Text, TouchableOpacity,Image } from 'react-native';
import { Button } from 'react-native-elements';
import DashNavbar from './DashNavbar';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { fetchUsers, postDeactivatePatient } from '../../redux/ActionCreators'
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';



const mapStateToProps = state => {
    return {
        users: state.users,
    }
}


const mapDispatchToProps = (dispatch) => ({
    fetchUsers: () => dispatch(fetchUsers()),
    postDeactivatePatient: (patientId) => dispatch(postDeactivatePatient(patientId)),

})



class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            tableHead: ['Role', 'Firstname', 'Lastname', 'Phone Number', 'Action'],
        }
        this.deactivatePatient = this.deactivatePatient.bind(this);
    }

    componentDidMount() {
        this.state.tableData.length = 0,
            this.props.users.users.map((user, index) => {
                this.state.tableData.push([user.role, user.firstname, user.lastname, user.phonenumber, user])
            })
    }

    static navigationOptions = {
        header: null,

    };
    deactivatePatient(data) {
        console.log("patient ID: " + data.patient)
        this.props.postDeactivatePatient(data.patient);
        this.props.fetchUsers();
    }

    element = (data) => (
        data.role === 'patient' ?
            data.isActive == true ?
                <TouchableOpacity onPress={() => 
                    this.deactivatePatient(data)
                }>
                    <View style={{ width: 80, height: 18, backgroundColor: '#0099CC', borderRadius: 40 }}>
                        <Text style={{ textAlign: 'center', color: '#fff', fontSize: 12 }}>DEACTIVATE</Text>
                    </View>
                </TouchableOpacity>
                :
                <Text>NOT ACTIVE</Text>
            :
            <View></View>
    );

    render() {
        return (
            <View>
                { this.state.tableData.length = 0,
                    this.props.users.users.map((user, index) => {
                        this.state.tableData.push([user.role, user.firstname, user.lastname, user.phonenumber, user])
                    })}
                <DashNavbar navigation={this.props.navigation} />

                
                <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center',height:100}}>
                   <Icon name='user' size={30} color='#0000000' style={{margin:10}}/>
                <Text style={{ fontSize: 20,fontStyle:'italic'}}>Welcome to your dashboard  </Text>
                </View>



                <Table borderStyle={{ borderColor: 'black' }}>
                    <Row data={this.state.tableHead} style={{ height: 60, backgroundColor: '#0099CC' }} textStyle={{ margin: 6 }} />
                    <ScrollView style={{height:'68%'}} >
                        {
                            this.state.tableData.map((rowData, index) => (
                                <TableWrapper key={index} style={{ flexDirection: 'row', backgroundColor: '##F5FFFA' }}>
                                    {
                                        rowData.map((cellData, cellIndex) => (
                                            <Cell key={cellIndex} data={cellIndex === 4 ? this.element(cellData, index) : cellData} textStyle={{ margin: 6, height: 40 }} />
                                        ))
                                    }
                                </TableWrapper>
                            ))
                        }
                    </ScrollView>
                </Table>


            </View>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);


