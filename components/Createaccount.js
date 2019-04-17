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
    TextInput,
    Image,
    ImageBackground,
    StatusBar
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firebase from 'firebase'
import { Container, Header, Content, Icon,Toast } from 'native-base';


type Props = {};
export default class Createaccount extends Component < Props > {

    constructor(props) {

        super(props)

        this.state = {
            email: '',
            password: '',
            password2: '',
            phone: '',
            message: ''
        }
    }

    createAccountFn = () => {

        if (this.state.email == '' && this.state.password == '' && this.state.password2 == '' && this.state.phone == '') {
           // this.setState({message: 'Fields cannot be empty'})
            // this.setState({activityVisible: false})


            Toast.show({
                text: "Please fill in all fields",
                buttonText: "Okay",
                duration: 3500,
                type:'danger'
              })

            return 0;
        } else if (this.state.password !== this.state.password2) {
            this.setState({message: 'Passwords do not match'})

            Toast.show({
                text: "Passwords do not match",
                buttonText: "Okay",
                duration: 3500,
                type:'danger'
              })
            //this.setState({activityVisible: false})

            return 0;

        }

        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.pushToDb()

                this.saveKey()
                this.directToMainPage()

                Toast.show({
                    text:"Logging you in...",
                    
                    duration: 2500,
                    type:'success'
                  })

            })
            .catch((error) => {
                this.setState({message: error.message})
                Toast.show({
                    text:this.state.message,
                    buttonText: "Okay",
                    duration: 5500,
                    type:'danger'
                  })
            })

    }

    saveKey = () => {

        AsyncStorage
            .setItem('loginkey', 'Logged in')
            .then(() => {
                console.log("Key has been saved")
            })
    }

    directToMainPage = () => {

        this
            .props
            .navigation
            .reset([NavigationActions.navigate({routeName: 'Mainpage'})])

    }

    pushToDb = () => {
        var usersRef = firebase
            .database()
            .ref("users");
        usersRef.push({phone: this.state.phone, email: this.state.email});
        // alert("Data saved")
    }

    componentDidMount = () => {
        //   this.pushToDb()

    }

    render() {
        return (
            <ImageBackground
                style={{
                height: '100%'
            }}
                source={require('../assets/Images/Loginbg-01.jpg')}>
                <View style={styles.header}>

<TouchableOpacity
onPress={()=>this.props.navigation.goBack()}
>
<Icon type='FontAwesome' name='arrow-left'  style={styles.headericon}/>

</TouchableOpacity>
</View>
                <View style={styles.container}>
                <StatusBar backgroundColor="rgba(139,69,19,.7)" barStyle="light-content" />

                    <View style={styles.logincont}>
                        <Text
                            style={{
                            color: 'black',
                            fontSize: 30,
                            color: 'white'
                        }}>Sign Up</Text>
                        <TextInput
                            keyboardType='email-address'
                            onChangeText={(email) => this.setState({email})}
                            style={styles.myInput}
                            placeholderTextColor='white'
                            placeholder='Email'></TextInput>
                        <TextInput
                            keyboardType='phone-pad'
                            onChangeText={(phone) => this.setState({phone})}
                            style={styles.myInput}
                            placeholderTextColor='white'
                            placeholder='Phone number'></TextInput>

                        <TextInput
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({password})}
                            style={styles.myInput}
                            placeholderTextColor='white'
                            placeholder='Password'></TextInput>
                        <TextInput
                            secureTextEntry={true}
                            onChangeText={(password2) => this.setState({password2})}
                            style={styles.myInput}
                            placeholderTextColor='white'
                            placeholder='Confirm Password'></TextInput>

                        <Text
                            style={{
                            padding: 0,
                            color: 'red',
                            marginTop: 10
                        }}>{this.state.message}</Text>

                        <TouchableOpacity onPress={this.createAccountFn} style={styles.myTouch}>
                            <Text style={styles.myTouchTxt}>Sign up</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Login')}
                            style={{
                            marginTop: 30,
                            alignItems: 'center'
                        }}>
                            <Text
                                style={{
                                color: '#fff'
                            }}>Already have account? Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {

        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: 20,
        width: '100%',

        flex: 1
    },
    logincont: {

        width: '100%',
        backgroundColor: 'rgba(0,0,0,.8)',
        padding: 50,
        borderRadius: 10

    },
    myTouch: {

        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,.8)',
        borderRadius: 50,
        marginTop: 20

    },
    myTouchTxt: {
        padding: 20,
        color: 'black'
    },
    myInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginTop: 20,
        color: 'white'

    },
    header:{
        marginTop:-15

    },

    headericon:{
color:'white',
padding:20
    }
});
