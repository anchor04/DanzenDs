/**
 * Created by ggoma on 2016. 11. 27..
 */
 import React from 'react';
 import {
     StyleSheet,
     Text,
     View,
     StatusBar,
 } from 'react-native';
 
 import Board from './components/board';
 
 export default class Solitair extends React.Component {
     render() {
         return (
             <View style={styles.container}>
                 <StatusBar barStyle='default' />
                 <Board />
             </View>
         );
     }
 }
 
 const styles = StyleSheet.create({
     container: {
         flex: 1,
     },
 });