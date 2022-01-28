import React, { Component } from 'react';
import { View, Text,  StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

class WelcomeGame4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <SafeAreaView style={{flex:1}}>
             <View style={styles.container}>
                <Text style={styles.heading}>Guess Famous People</Text>
                <TouchableOpacity
                    underlayColor="#ccc"
                    style={styles.button}
                    onPress={()=> this.props.navigation.push('Game4MainScreen', {index:0})}>
                        <Text style={styles.buttonText}>Start Game</Text>
                </TouchableOpacity>
                </View>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7d669e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        color: '#fff',
        fontSize: 20,
        marginBottom: 50,
        fontFamily: 'Helvetica',
    },
    button: {
        height: 60,
        backgroundColor: '#fff',
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 10,
    },
})
export default WelcomeGame4;
