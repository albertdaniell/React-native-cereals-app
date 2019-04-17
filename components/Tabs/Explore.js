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
    
} from 'react-native';
import { Container, Header, Item, Input, Icon, Button,Tab, Tabs,TabHeading } from 'native-base';

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
            // alert(0) this.reset()
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
            
      <Container>
      
      <View style={{margin:10,height:'100%'}}>
      <Tabs>
          <Tab heading={ <TabHeading style={{ backgroundColor: 'rgb(139,69,19)',color:'#fff'}}><Text style={{color:'#fff'}}>Camera</Text></TabHeading>}>
          <Text style={styles.PageHead}>Explore</Text>

<Item style={styles.searchDiv}>
<Icon style={{marginLeft:10}} name="ios-search" />
<Input placeholder="Search" style={styles.searchInput}/>

</Item>
          </Tab>
          <Tab heading={ <TabHeading style={{ backgroundColor: 'rgb(139,69,19)',color:'#fff'}}><Text style={{color:'#fff'}}>Camera</Text></TabHeading>}>
          <Text>haha</Text>
          </Tab>
          <Tab heading={ <TabHeading style={{ backgroundColor: 'rgb(139,69,19)',color:'#fff'}}><Text style={{color:'#fff'}}>Camera</Text></TabHeading>}>
          <Text>haha</Text>
          </Tab>
        </Tabs>
      </View>
      
      </Container>
         


        );
    }
}

const styles = StyleSheet.create({
    container: {

        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },

    searchInput:{
       
       
    },


    searchDiv:{
        padding:2,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius:10,
        backgroundColor:'#ccc',
        marginLeft:10,
        marginRight:10,
        height:35

    },

    PageHead: {
        fontSize: 30,
        padding: 15
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
