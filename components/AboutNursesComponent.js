
import React, { Component } from 'react';
import { FlatList, ScrollView, Text } from 'react-native';
import { ListItem, Avatar, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { fetchNurses, fetchUsers } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        nurses: state.nurses,
        users: state.users

    }
}

const mapDispatchToProps = dispatch => ({
    fetchNurses: () => dispatch(fetchNurses()),
    fetchUsers: () => dispatch(fetchUsers()),    

})

class AboutNurses extends Component {

    static navigationOptions = {
        title: 'About Nurses'
    };

    componentDidMount(){
        this.props.fetchNurses();
        this.props.fetchUsers();

    }

    render() {

        const renderNurses = ({ item, index }) => {
            return (
            <ListItem key={index} bottomDivider>
                    {/*<Avatar source={{ uri:}} />*/}
                   <ListItem.Content>
                        {/*<ListItem.Title>{item.users.firstname}</ListItem.Title>
                        <ListItem.Title>{item.users.lastname}</ListItem.Title>*/}
                        <ListItem.Subtitle>{item.nurses.description}</ListItem.Subtitle>
                   </ListItem.Content>
                </ListItem>
            
            );
        };
        

        if (this.props.nurses.isLoading) {
            return (
                <ScrollView>
                    <Card>
                        <Card.Title> Corporate Nurses</Card.Title>
                        <Loading />
                    </Card>
                </ScrollView>
            );
        }
        else if (this.props.nurses.errMess) {
            return (
                <ScrollView>
                    <Card>
                        <Card.Title> Corporate Nurses</Card.Title>
                        <Text>{this.props.nurses.errMess}</Text>
                    </Card>
                </ScrollView>
            );
        }
        else {
            nurses= this.props.nurses.nurses;
            users=this.props.users.users;
            return (
                <ScrollView>
                   
                        <Card>
                            <Card.Title> Corporate Nurses</Card.Title>
                            <FlatList
                                data={nurses,users}
                                renderItem={renderNurses}
                            />
                        </Card>

                </ScrollView>
            );
        }
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(AboutNurses);