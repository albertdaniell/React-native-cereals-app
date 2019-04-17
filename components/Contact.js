/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {List, ListItem, Container, Header, Content,Textarea} from 'native-base'
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
import { TextInput } from 'react-native-gesture-handler';

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

        } else {}
    }

    signOut = () => {
        firebase
            .auth()
            .signOut()
            .then(function () {})
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
                <View style={{padding:20}}>
                    <Text style={styles.HeadingTxt}>Contact</Text>
                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et non minima eum impedit dolorum eaque nisi harum accusamus ullam, incidunt modi ut amet repellendus ducimus eveniet facilis? Amet, recusandae quibusdam.
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus expedita ipsa quod cum quo ex tempora tenetur similique repudiandae voluptates amet libero nihil ratione et, vitae at mollitia, sed laborum!
                    </Text>


                </View>

                <View style={styles.report}>
                    <Text style={styles.HeadingTxt}>Report</Text>

                    <Text>Issue</Text>
                    <TextInput
                    placeholder='Issue'
                     style={styles.myInput}>

                    </TextInput>
                    <Text>Description</Text>
                    <Textarea  style={styles.myInput2} rowSpan={5} placeholderTextColor='#ccc' bordered placeholder="Please give description of the issue" />


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
    HeadingTxt: {
        fontSize: 20,
        marginBottom:10
       
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
    },
    report:{
        padding:20
    },
    myInput: {
        borderBottomColor: '#efefef',
        borderBottomWidth: 1,
        marginTop: 5,
        marginBottom:10

    },
    myInput2: {
        borderColor: '#efefef',
        borderWidth: 1,
        marginTop: 10,
        height:100

    },
});
