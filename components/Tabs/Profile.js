/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {List, ListItem, Container, Header, Content} from 'native-base'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView
} from 'react-native';
import {AsyncStorage} from 'react-native';
import {NavigationActions} from 'react-navigation';
import firebase from 'firebase'

type Props = {};
export default class Explore extends Component < Props > {

    componentWillMount() {
        this.getUserData()
    }

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            username: ''
        }
    }

    directToStartedPage = () => {
       
        this
            .props
            .navigation
            .reset([NavigationActions.navigate({routeName: 'Getstarted'})])

    }

    getUserData = () => {
        this.setState({email: 'nothing here'})

        var user = firebase
            .auth()
            .currentUser;

        if (user) {
            

            this.setState({email: user.email, username: user.displayName})


        } else {
            
        }
    }

    signOut = () => {
        firebase
            .auth()
            .signOut()
            .then(function () {
                
            })
            .catch(function (error) {
                alert("null")
            });
    }

    checkUserSignIn = () => {
        var user = firebase
            .auth()
            .currentUser;

        if (user) {
            alert("There is a user here")
        } else {
            this.reset()
        }
    }

    clearKey = () => {

        AsyncStorage
            .removeItem('loginkey')
            .then(() => {
                this.signOut()
                this.directToStartedPage()
            })
            .catch((error) => {

                alert(error)
            })

    }

    render() {
        return (
            <ScrollView>
                <View>
                    <Text style={styles.accountTxt}>Account</Text>
                    <List>
                        <ListItem itemDivider></ListItem>
                        <ListItem style={styles.myListItem}>
                            <TouchableOpacity style={styles.myTouch}>
                                <Text style={styles.myTouchTxt}>{this.state.email}</Text>
                            </TouchableOpacity>
                        </ListItem>

                        <ListItem itemDivider></ListItem>
                        <ListItem style={styles.myListItem}>
                            <TouchableOpacity style={styles.myTouch}>
                                <Text style={styles.myTouchTxt}>Your activity</Text>
                            </TouchableOpacity>
                        </ListItem>

                        <ListItem style={styles.myListItem}>
                            <TouchableOpacity style={styles.myTouch}>
                                <Text style={styles.myTouchTxt}>Payments</Text>
                            </TouchableOpacity>
                        </ListItem>

                        <ListItem itemDivider></ListItem>
                        <ListItem style={styles.myListItem}>
                            <TouchableOpacity style={styles.myTouch}>
                                <Text style={styles.myTouchTxt}>About</Text>
                            </TouchableOpacity>
                        </ListItem>

                        <ListItem style={styles.myListItem}>
                            <TouchableOpacity style={styles.myTouch}>
                                <Text style={styles.myTouchTxt}>Share</Text>
                            </TouchableOpacity>
                        </ListItem>

                        <ListItem style={styles.myListItem}>
                            <TouchableOpacity
                            onPress={()=>this.props.navigation.navigate('Contact')}
                             style={styles.myTouch}>
                                <Text style={styles.myTouchTxt}>Contact and remarks</Text>
                            </TouchableOpacity>
                        </ListItem>

                        <ListItem style={styles.myListItem}>
                            <TouchableOpacity onPress={this.clearKey} style={styles.myTouch}>
                                <Text style={styles.myTouchTxt}>Logout</Text>
                            </TouchableOpacity>
                        </ListItem>
                    </List>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {

        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    accountTxt: {
        fontSize: 30,
        padding: 15
    },
    myTouch: {

        width: '100%'

    },
    myListItem: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    myTouchTxt: {
        padding: 10,
        color: 'black'
    }
});
