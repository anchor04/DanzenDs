import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, BackHandler } from 'react-native';
import Header from '../../Extras/Header';
import LottieView from 'lottie-react-native';

class CongratsQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
    BackHandler.addEventListener("hardwareBackPress", this.backAction);
  }

  backAction = () => {
    this.props.navigation.push('Dashboard')

    // alert(
    //   "Please press the Home button to go back.")
    return true;


    }

    componentWillUnmount() {
      BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

  render() {
    return (
      <SafeAreaView style={{flex:1, backgroundColor: "#fff",}}>
        {/* <Header navigation={this.props.navigation}/> */}
      <View style={{height:400, width:200}}>
        <LottieView source={require('../../images/congratulation.json')} style={{height:'100%', width:'100%'}} autoPlay />
      </View>

      <View style={{flex:1,justifyContent: 'center', alignItems: 'center',}}>
        <TouchableOpacity onPress={()=> this.props.navigation.push('Dashboard')} style={{borderRadius:40, backgroundColor: 'green', padding: 10, width:'40%', justifyContent: 'center', alignItems: 'center',}}>
          <Text style={{fontSize:20, fontFamily:'Beatles', color:'#fff'}}>
            Home
          </Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    );
  }
}

export default CongratsQuiz;
