/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Option from '../Options';
import Questions from '../Questions.json';
import {connect} from 'react-redux';
import Header from '../../Extras/Header';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import {QuizQuestions} from '../../Extras/AllApis'
import Spinner from 'react-native-spinkit';

class quizScreen extends React.Component{

    constructor(props){
        super(props)
            this.state = {
                username:null,
                timecount:0,
                QuizQs:null,
                QuizAns:null,
                QuizCorrectIndex:null,
                Answers:null,
                anser:null,
                Loader:true
              // index:0,
            };
        }

    quizApi(Index){
        fetch(`${QuizQuestions}`, {
          method:'GET',
          headers:{
          Accept:'application/json'
        }})
        .then((res)=>res.json())
        .then((json)=>{
    
          let {Code, Message, Data} = json;
          // alert(JSON.stringify(Data))
          if(Code == '00'){
            this.setState({WholeArray:Data})
            // setTimeout(() => {
              // alert(JSON.stringify(Data[0].Answers))
            // }, 1000);
            this.setState({QuizQs:Data.Question, QuizAns:Data.Answers, QuizCorrectIndex:Data.CorrectIndex});
            this.setState({Loader:false})
            let abc = Data
            this.setState({anser:abc})

            // anwar = abc.replace(/\*/g,' ')
            // (/\*/g," ")
          }
          else{
            this.setState({Loader:false})
          }
      })
    }

    componentDidMount(){
      // alert(JSON.stringify(this.store))
      let Index = this.props.route.params.index
      this.quizApi(Index)
    }
    
    render(){
        const { route } = this.props;
        console.log(route)
        console.log("route")
        const {index} = route.params;
        const {anser} = this.state
  return (
    <SafeAreaView style={{flex:1, backgroundColor: "#fff",}}>
      <Header 
     navigation={this.props.navigation}
      />

      {this.state.Loader == false?
      typeof this.state.WholeArray != 'undefined'?
      <>
      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        <Text style={styles.questionNo}>
          {index + 1}/{this.state.WholeArray.length}
        </Text>
      </View>
        <Text style={styles.Question}>
          {this.state.WholeArray[index].Question}
          </Text> 
      
        <ScrollView showsVerticalScrollIndicator={false} style={{}}>

  

        {anser != null?
        anser[index].Answers.map((option, i) => (
        <Option
          value={option}
          navigation={this.props.navigation}
          optionIdx={i}
          qnIndex={index}
          key={i}
          Question={this.state.WholeArray}
        />

      ))
     :
     null
    }
      
      
        <View style={{height:100}}/>
            </ScrollView>
            </>
          :
          null
          :
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Spinner size={50} type={"ChasingDots"} color={'#1e8449'}/> 
            </View>
        }

    </SafeAreaView>
  );
}
}

function mapStateToProps(state){
  return{
    store: state
  }

}

function mapDispatchToProps(dispatch){
  return{
      UpdateItemsInCart:(state)=>dispatch({type:'UpdateItemsInCart', state:state})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(quizScreen);


const styles = StyleSheet.create({
  questionNo: {
    color: 'red',
    fontSize: 25,
    margin: 20,
  },
  Question: {
    fontSize: 24,
    margin: 25,
    color:'#000'
  },
  nextButton: {
    height: 50,
    width: '20%',
    backgroundColor: '#3700B3',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    margin: 20,
    borderRadius: 15,
  },
  nextText: {
    color: 'white',
    fontWeight: '900',
  },
  Option: {
    borderColor: 'black',
    borderWidth: 3,
    margin: 20,
    marginBottom: 3,
    borderRadius: 25,
    height:70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e8449',
  },
  OptionText: {
    fontSize: 26,
    color:'#fff',
    fontFamily:'Beatles'
  },
});