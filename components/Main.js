/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    Image,
    StatusBar
} from 'react-native';
import {AsyncStorage} from 'react-native';
import {NavigationActions} from 'react-navigation';
import firebase from 'firebase'

type Props = {};
export default class Main extends Component < Props > {

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
        // alert(0)
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
            // alert(1)

            this.setState({email: user.email, username: user.displayName})

            //alert(user.displayName)

        } else {
            //  alert(0) this.reset()
        }
    }

    signOut = () => {
        firebase
            .auth()
            .signOut()
            .then(function () {
                // alert("nice") Sign-out successful.
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
            <View>

                <Text>This is the main page, Welcome {this.state.email}</Text>

                <TouchableOpacity onPress={this.clearKey}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    myTouch: {
        padding: 15,
        borderRadius: 50,
        margin: 40,
        backgroundColor: 'rgb(139,69,19)'
    },
    myTouchTxt: {
        padding: 10,
        color: '#fff'
    }
});
