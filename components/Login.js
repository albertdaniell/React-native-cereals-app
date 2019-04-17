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
    ActivityIndicator,
    StatusBar
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AsyncStorage} from 'react-native';
import {Container, Header, Content, Icon,Button, Toast} from 'native-base';

// firebase
import firebase from 'firebase'
import {NavigationActions} from 'react-navigation';

type Props = {};
export default class Login extends Component < Props > {
    directToMainPage = () => {

        this
            .props
            .navigation
            .reset([NavigationActions.navigate({routeName: 'Mainpage'})])

    }

    componentDidMount() {}

    constructor(props) {

        super(props)

        this.state = {
            email: '',
            password: '',
            message: null,
            isLoading: false
        }
    }

    testFunc = () => {
        // alert(0)
    }

    loginFunc = () => {
        this.setState({message: ''})
        this.setState({isLoading: true})

        // check if fields are empty

        if (this.state.email == '' || this.state.password == '') {
            this.setState({message: 'Please fill in all fields.'})
            var message=this.state.message

            Toast.show({
                text: "Please fill in all fields",
                buttonText: "Okay",
                duration: 3500,
                type:'danger'
              })


            
            this.setState({isLoading: false})

            return 0;
        }

        this.setState({message: ''})
        this.setState({isLoading: true})
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {

                //Store a key
                Toast.show({
                    text:"Logging you in...",
                    
                    duration: 2500,
                    type:'success'
                  })

                AsyncStorage
                    .setItem('loginkey', 'Logged in')
                    .then(() => {
                        console.log("Key has been saved")
                    })
                this.directToMainPage()
            })
            .catch(error => {
                this.setState({isLoading: false})
                this.setState({message: error.message})
                Toast.show({
                    text: this.state.message,
                    buttonText: "Okay",
                    duration: 4500,
                    type:'danger'
                  })
    
            })

    }

    render() {
        return (
            <ImageBackground
                style={{
                height: '100%'
            }}
                source={require('../assets/Images/Loginbg-01.jpg')}>
                <StatusBar backgroundColor="rgba(139,69,19,.7)" barStyle="light-content" />

                <View style={styles.header}>

                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon type='FontAwesome' name='arrow-left' style={styles.headericon}/>

                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <View style={styles.logincont}>
                        <Text
                            style={{
                            color: 'black',
                            fontSize: 30
                        }}>Login</Text>
                        <TextInput
                            keyboardType='email-address'
                            onChangeText={(email) => this.setState({email})}
                            style={styles.myInput}
                            placeholder='Email'></TextInput>
                        <TextInput
                            textContentType='password'
                            secureTextEntry={true}
                            style={styles.myInput}
                            onChangeText={(password) => this.setState({password})}
                            placeholder='Password'></TextInput>
                     

                        {this.state.isLoading
                            ? <TouchableOpacity style={styles.myTouch}>
                                    <ActivityIndicator
                                        size="small"
                                        style={{
                                        padding: 20
                                    }}
                                        color="#fff"/>
                                </TouchableOpacity>
                            : <TouchableOpacity onPress={this.loginFunc} style={styles.myTouch}>
                                <Text style={styles.myTouchTxt}>Login</Text>
                            </TouchableOpacity>
}

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Createaccount')}
                            style={{
                            marginTop: 30,
                            alignItems: 'center'
                        }}>
                            <Text style={{}}>No account? Sign Up</Text>
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
        backgroundColor: 'rgba(255,255,255,.8)',
        padding: 50,
        borderRadius: 10

    },
    myTouch: {

        alignItems: 'center',
        backgroundColor: 'rgb(139,69,19)',
        borderRadius: 30,
        marginTop: 20

    },
    myTouchTxt: {
        padding: 20,
        color: '#fff'
    },
    myInput: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginTop: 20

    },
    header: {
        marginTop: -15
    },

    headericon: {
        color: 'white',
        padding: 20
    }
});
