/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation'

// Import routes

import Home from './components/Home'
import Getstarted from './components/Getstarted'
import Login from './components/Login'
import Createaccount from './components/Createaccount'
import Mainpage from './components/Main'
import Explore from './components/Tabs/Explore'
import Profile from './components/Tabs/Profile'
import ContRepo from './components/Contact'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev men' +
            'u'
});

const TabNav = createBottomTabNavigator({
    Explore: {
        screen: Explore,
        navigationOptions: {
            header: null 
        }

    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            header: null
        }
    }
})

const AppNavigator = createStackNavigator({

    Home: {
        screen: Home,
        navigationOptions: {
            header: null
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    Getstarted: {
        screen: Getstarted,
        navigationOptions: {
            header: null
        }
    },
    Createaccount: {
        screen: Createaccount,
        navigationOptions: {
            header: null
        }
    },
    Mainpage: {
        screen: TabNav,
        navigationOptions: {
            header: null
        }
    },
    Contact: {
        screen:ContRepo,
        navigationOptions: {
            title:'Contact and Report'
        }
    }

}, {
    navigationOptions: {
        header: null
    }
})

const AppContainer = createAppContainer(AppNavigator)

type Props = {};
export default class App extends Component < Props > {
    render() {
        return (
            <AppContainer></AppContainer>
        );
    }
}

const styles = StyleSheet.create({});
