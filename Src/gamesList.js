import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Header from './Extras/Header';
import LinearGradient from 'react-native-linear-gradient';


class gamesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      HeaderName:null
    };
  }

  componentDidMount(){
    // alert(JSON.stringify(this.props.route.params.Ponka))
    // let HeaderName = this.props.route.params.Header;
    // this.setState({HeaderName})
  }

  render() {
    return (
        <SafeAreaView style={{flex:1, backgroundColor: "#fff",}}>
            <LinearGradient colors={['#27ae60', '#1e8449','#1e8449','#145a32']} style={styles.linearGradient}>
        <Header 
        navigation={this.props.navigation}
        // Header={this.state.HeaderName}
        />

          <View style={styles.GamesHeaderView}>
          <Text style={styles.GamesHeaderText}> Games </Text>
          </View>

      <View style={styles.container}>
      </View>
      <View style={styles.CardContainerView}>
        <View style={{margin:5}}>

      <TouchableOpacity  style={{ borderRadius:15, }} onPress={()=> this.props.navigation.navigate('tictactoe',{BackScreen:"gamesList"})} >
      <Image source={require('./images/tictactoecover.png')} style={{height:130, width:160, borderRadius:10}} resizeMode='cover' />
          
          {/* <View style={styles.CardView}/> */}
            {/* <Text style={styles.CardViewText}>
                Tic-Tac-Toe
            </Text> */}
          </TouchableOpacity>
      </View>
      <View style={{margin:5}}>
          <TouchableOpacity style={{borderRadius:15, }} onPress={()=> this.props.navigation.navigate('GameBoard',{BackScreen:"gamesList"})} >
      <Image source={require('./images/whackamole.png')} style={{height:130, width:160, borderRadius:10}} resizeMode='cover' />
          
          </TouchableOpacity>
      </View>

      </View>
      <View style={styles.CardContainerView}>
      <View style={{margin:5}}>

      <TouchableOpacity style={{borderRadius:15,}} onPress={()=> this.props.navigation.navigate('DanzenGame5Screen',{BackScreen:"gamesList"})} >
      <Image source={require('./images/abc.png')} style={{height:130, width:160, borderRadius:10}} resizeMode='cover' />
          
            {/* <Text style={styles.CardViewText}>
            HangMan guessthefamouspeople
            </Text> */}
          </TouchableOpacity>
            </View>
            <View style={{margin:5}}>

          <TouchableOpacity onPress={()=> {this.props.navigation.push('SolitairGame')}} >
      <Image source={require('./images/guessthefamouspeople.jpeg')} style={{height:130, width:160, borderRadius:10}} resizeMode='cover' />

          </TouchableOpacity>
      </View>
      </View>
      </LinearGradient>

      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
    container:{
        flex:0.1,
        // backgroundColor: 'red',
    },
    GamesHeaderView:{
      justifyContent: 'center',
      alignItems: 'flex-start',
      // backgroundColor: 'pink',
      height:40,
      marginLeft:20,
      marginTop:20
  },
  GamesHeaderText:{
      fontFamily:'Helvetica-Bold',
      fontSize:30,
      color:'#000'
  },
    // GamesHeaderView:{
    //     backgroundColor: "#c8c8c8",
    // },
    // GamesHeaderText:{
    //     backgroundColor: "#c8c8c8",
    //     borderRadius:10,
    //     alignSelf:'center',
    //     fontFamily:'Poppins-Bold',
    //     color:'#000'
        
    // },
    CardContainerView:{
        flexDirection: 'row',
      justifyContent: 'center',  
      alignItems: 'center',
      flex:0.3,
      marginVertical:10,
    },
    CardView:{
    justifyContent: 'center',
    alignItems: 'center',
        height:130,
        width:130,
        borderRadius:15,
        borderWidth:0.5,
        margin:10,
        padding:5, 
        borderColor:'#000'
    },
    CardViewText:{
        fontFamily:'Poppins-Bold',
        alignSelf: 'center',
    color:'#000'

    },
    linearGradient: {
      flex: 1,
    },
});
export default gamesList;
