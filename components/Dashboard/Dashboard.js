import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import DashNavbar from './DashNavbar';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { fetchUsers, postDeactivatePatient } from '../../redux/ActionCreators'
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';


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
            tableHead: ['role', 'firstname', 'lastname', 'phone Number', 'Action'],
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
    }

    element = (data) => (
        data.role === 'patient' ?
            data.isActive == true ?
                <TouchableOpacity onPress={() => //console.log("button")
                this.deactivatePatient(data)
            }>
                    <View style={{ width: 80, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 }}>
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

                <DashNavbar navigation={this.props.navigation} />


                <ScrollView >
                    <Table borderStyle={{ borderColor: 'black' }}>
                        <Row data={this.state.tableHead} style={{ height: 60, backgroundColor: '#808B97' }} textStyle={{ margin: 6 }} />
                        {
                            this.state.tableData.map((rowData, index) => (
                                <TableWrapper key={index} style={{ flexDirection: 'row', backgroundColor: '#FFF1C1' }}>
                                    {
                                        rowData.map((cellData, cellIndex) => (
                                            <Cell key={cellIndex} data={cellIndex === 4 ? this.element(cellData, index) : cellData} textStyle={{ margin: 6, height: 40 }} />
                                        ))
                                    }
                                </TableWrapper>
                            ))
                        }
                    </Table>
                </ScrollView>

            </View>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);


