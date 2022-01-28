import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Questions from './Questions.json';
import {useStateValue} from './stateProvider';

const Option = props => {
  // const [{score}, dispatch] = useStateValue();
  // const updateScore = Score => {
  //   dispatch({
  //     type: 'UPDATE_SCORE',
  //     score: Score,
  //   });
  // };
  // console.log(score);
  console.log(props)
  console.log(props.optionIdx)
  console.log("props.Questionasdasd")
  // let correctAnswerIdx = props.Question[0].Question[props.qnIndex].CorrectIndex;

  let correctAnswerIdx = props.Question[props.qnIndex].CorrectIndex;

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
    console.log(props.Question.length),
    console.log("props"),
      <TouchableOpacity
        onPress={() => { 
          if(props.optionIdx == correctAnswerIdx){
            // ? updateScore(1)
            // : updateScore(0);
          if (props.qnIndex + 1 >= props.Question.length) {
            console.log('End of Quiz');
            props.navigation.push('CongratsScreen')
          } else {
            props.navigation.push('QuizScreen', {
              index: props.qnIndex + 1,
            });
          }
        }
        else
        {
          alert('Wrong Answer')
        }
        }}>
    <View style={[styles.Option]}>
        <Text style={styles.OptionText}>{props.value}</Text>
    </View>
    
      </TouchableOpacity>
  );
};

export default Option;

const styles = StyleSheet.create({
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