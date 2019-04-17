/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,StatusBar} from 'react-native';
import {NavigationActions} from 'react-navigation';
import firebase from 'firebase'
import {AsyncStorage} from 'react-native';

var config = {
    apiKey: "AIzaSyD8XIowQfU4njoZvHJlFiaX1YoDsRAJ1Lo",
    authDomain: "cereals-f8d9d.firebaseapp.com",
    databaseURL: "https://cereals-f8d9d.firebaseio.com",
    projectId: "cereals-f8d9d",
    storageBucket: "cereals-f8d9d.appspot.com",
    messagingSenderId: "299330604372"
};
firebase.initializeApp(config);
type Props = {};
export default class Home extends Component < Props > {

    constructor(props) {

        super(props)

        this.state = {
            loginkey: ''
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.retrieveMyKeyData()
        }, 500)

        //this.getUserDetails()  this.getUserDetails() this.checkKey()

    }

    getUserDetails = () => {

        firebase
            .auth()
            .onAuthStateChanged((user) => {
                if (user) {
                    // User is signed in.
                    var displayName = user.displayName;
                    var email = user.email;
                    var emailVerified = user.emailVerified;
                    var photoURL = user.photoURL;
                    var isAnonymous = user.isAnonymous;
                    var uid = user.uid;
                    var providerData = user.providerData;
                    // ...
                    this.directToMainPage()
                    // alert(email)
                } else {
                    this.reset()
                    // User is signed out. ...
                }
            });
        // var user=firebase.auth().currentUser if(user !=null){     //
        // alert(user.email)  alert(1) } else{    this.reset() }
    }

    retrieveMyKeyData = async() => {
        try {
            const value = await AsyncStorage.getItem('loginkey');
            if (value !== null) {
                this.getUserDetails()

                console.log("we have data")
                console.log(value);
                this.directToMainPage()
            } else {
                this.reset()
            }
        } catch (error) {
            console.log("no data")
        }
    };

    directToMainPage = () => {
        this
            .props
            .navigation
            .reset([NavigationActions.navigate({routeName: 'Mainpage'})])

    }

    reset = () => {
        this
            .props
            .navigation
            .reset([NavigationActions.navigate({routeName: 'Getstarted'})])

    }

    render() {
        return (
            <View style={styles.container}>
            <StatusBar backgroundColor="rgba(139,69,19,.7)" barStyle="light-content" />

                <Image
                    style={{
                    height: 150,
                    width: 150
                }}
                    source={require("../assets/Images/cARLOGO.png")}></Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
});
