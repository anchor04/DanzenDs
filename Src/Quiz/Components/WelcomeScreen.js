import React, { Component } from 'react';
import {  View,
    Text,
    StyleSheet,
    Image,
    Button,
    ToastAndroid,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    Pressable
} from 'react-native';
import {FontAwesome} from '../../Extras/AllIcons';
import Header from '../../Extras/Header';
const {height,width} = Dimensions.get('window');


class QuizWelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        HeaderName:null,
    };
  }
  componentDidMount(){
      let HeaderName = this.props.route.params.Header;
      this.setState({HeaderName})
    //   alert(HeaderName)
  }
render(){
  return (
      <SafeAreaView style={styles.SafeArea}>
    <Header 
    navigation={this.props.navigation}
    Header={this.state.HeaderName}/>
    <View style={styles.TopScreen}>

        <View style={styles.QuizHeaderView}>
          
        <Text style={styles.QuizHeaderText}> Quiz </Text>
        </View>

    <View style={styles.ImageView}>
      <Image style={styles.logo} source={require('../../images/quizz.webp')} resizeMode='contain'/>
      </View>
    </View>
    <View style={styles.BottomScreen}>
      <Text style={styles.welcomeText}>Welcome To Quiz App</Text>
      <Pressable onPress={() => this.props.navigation.navigate('QuizScreen', {index:0})}>
            {/* // navigation.navigate('QuestionScreen'); */}
          <FontAwesome name="arrow-circle-right" size={70} color="green" />
      </Pressable>
      </View>
    </SafeAreaView>
  );
}
}

const styles = StyleSheet.create({
    SafeArea:{
        flex:1,
        backgroundColor: '#fff',
    },
    QuizHeaderView:{
      justifyContent: 'center',
      alignItems: 'flex-start',
      // backgroundColor: 'pink',
      height:40,
      marginLeft:20,
      marginTop:20
  },
  QuizHeaderText:{
      fontFamily:'Helvetica-Bold',
      fontSize:30,
      color:'#000'
  },
    TopScreen: {
        height:height*0.5,
    //   backgroundColor: 'pink',
    //   justifyContent: 'center',
    },
    ImageView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    BottomScreen:{
        height:height*0.5,
        alignItems: 'center',
        // backgroundColor: 'green',
    },
    logo: {
      height: 300,
      width: 300,
    },
    welcomeText: {
      fontSize: 24,
      fontFamily:'Beatles',
      marginTop: 15,
      textAlign: 'center',
    color:'#000'

    },
    inputBox: {
      width: '85%',
      height: 40,
      margin: 12,
      borderBottomWidth: 3,
      borderBottomColor: '#3700B3',
      marginTop: 60,
      color: 'black',
    },
  });
export default QuizWelcomeScreen;
