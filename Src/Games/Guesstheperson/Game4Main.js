import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image, Dimensions, SafeAreaView} from 'react-native';
import Option from '../Guesstheperson/Extras/OptionsGame4';
import Questions from '../Guesstheperson/Extras/QuestionsGame4.json';
import {connect} from 'react-redux';
import Header from '../../Extras/Header';
import { GetGFPQuestions } from '../../Extras/AllApis';
const {height, width}  = Dimensions.get('window')

class Game4Main extends React.Component {
    constructor(props){
        super(props)
            this.state = {
                username:null,
                timecount:0,
                ArrayMain:null
              // index:0,
            };
        }

        gfpapi(){


fetch(`${GetGFPQuestions}`,{
  method:'GET',
  headers:{
  Accept:'application/json'
}})
.then((res)=>res.json())
.then((json)=>{
  let {Message, Code, Data} = json
  // alert(Code)
  if(Code == '00'){
    this.setState({ArrayMain:Data})
    this.setState({PersonImage:Data[0].Image, Answers:Data[0].Answers, CorrectIndex:Data[0].CorrectIndex})
    // alert(JSON.stringify(Data[0]))
      
  }
        else{
          alert(Message)
        }
      })
    }

    componentDidMount(){
      // alert(JSON.stringify(this.store))
      this.gfpapi()
    }
    
    render(){
        const { route } = this.props;
        console.log(route)
        console.log("route")
        const {index} = route.params;
        const {ArrayMain} = this.state;
    return (
      <SafeAreaView style={{flex:1}}>
      <Header 
     navigation={this.props.navigation}
      />


      <View style={{ height:height*0.3, margin:20, borderRadius:14 }}>
        {ArrayMain != null?
        <Image style={styles.OptionImage} source={{uri:ArrayMain[index].Image}} resizeMode='contain' />
        :
        null
    }
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{}}>

        { ArrayMain != null?

      ArrayMain[index].Answers.map((option, i) => (

        <Option
          value={option}
          navigation={this.props.navigation}
          optionIdx={i}
          qnIndex={index}
          key={i}
          ImageArray={ArrayMain}

        />


      ))
      :
      null}
        <View style={{height:100}}/>
            </ScrollView>

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

export default connect(mapStateToProps, mapDispatchToProps)(Game4Main);

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
   OptionImage:{
      height:"100%",
      width:"100%",
      borderRadius:14
  },
   nextText: {
     color: 'white',
     fontWeight: '900',
   },
 });