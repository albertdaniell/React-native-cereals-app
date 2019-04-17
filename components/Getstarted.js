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

type Props = {};
export default class Getstarted extends Component < Props > {

    componentDidMount() {}

    componentDidUpdate() {}

    componentWillMount() {}

    reset = () => {}
    render() {
        return (
            <ImageBackground
                source={require('../assets/Images/Bg1-01.jpg')}
                style={{
                height: '100%'
            }}>
            <StatusBar backgroundColor="rgba(139,69,19,.7)" barStyle="light-content" />

                <View style={styles.container}>

                    <View
                        style={{
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: 20
                    }}>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Createaccount')}
                            style={styles.myTouch}>
                            <Text style={styles.myTouchTxt}>G   E   T      S   T   A   R   T   E   D</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('')}
                            style={{
                            marginBottom: 20
                        }}>
                            <Image
                                source={require('../assets/Images/Fblogo.png')}
                                style={{
                                height: 60,
                                width: 60,
                                borderRadius: 100
                            }}></Image>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Login')}
                            style={{
                            marginBottom: 10
                        }}>
                            <Text style={{}}>Already have account? Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ImageBackground>
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
        padding: 7,
        color: '#fff'
    }
});
