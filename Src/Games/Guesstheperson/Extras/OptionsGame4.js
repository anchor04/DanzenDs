import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Questions from './QuestionsGame4.json';
import {useStateValue} from './stateProvider';

const OptionsGame4 = props => {
  // const [{score}, dispatch] = useStateValue();
  // const updateScore = Score => {
  //   dispatch({
  //     type: 'UPDATE_SCORE',
  //     score: Score,
  //   });
  // };
  // console.log(score);
  console.log(props)
  console.log(props.ImageArray[0].CorrectIndex)
  console.log("props.Questionasdasd")
  let correctAnswerIdx = props.ImageArray[props.qnIndex].CorrectIndex;
  let handleValidation = () => {
    if (props.optionIdx === correctAnswerIdx) {
      console.log('Correct Answer');
      setOptioncolor({borderColor: 'green'});
    } else {
      console.log('Wrong Answer');
      setOptioncolor({borderColor: 'red'});
    }
  };
  return (
      <TouchableOpacity
        onPress={() => { 
          if(props.optionIdx == correctAnswerIdx){
            // ? updateScore(1)
            // : updateScore(0);
          if (props.qnIndex + 1 >= props.ImageArray.length) {
            console.log('End of Quiz');
            props.navigation.navigate('WelcomeGame4Screen')
          } else {
            props.navigation.push('Game4MainScreen', {
              index: props.qnIndex + 1,
            });
          }
        }
        else
        {
          alert('Wrong Answer')
        }
        }} >
    <View style={[styles.Option]}>
        <Text style={styles.OptionText}>{props.value}</Text>
    </View>

      </TouchableOpacity>
  );
};

export default OptionsGame4;


const styles = StyleSheet.create({
    Option: {
      borderColor: 'black',
      borderWidth: 3,
      margin: 20,
      marginBottom: 3,
      borderRadius: 25,
      height:60,
    //   width:150,
    paddingHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf:'center',
      backgroundColor: '#1e8449',
      flexDirection:'row', 
    },
    OptionText: {
      fontSize: 26,
      color:'#fff',
      fontFamily:'Beatles'
    },
   
  });