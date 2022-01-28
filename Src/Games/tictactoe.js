import React, { Component } from 'react';
import { View, Text,StyleSheet, TouchableOpacity, SafeAreaView, Alert  } from 'react-native';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Header from '../Extras/Header'


class tictactoe extends Component {
  constructor(props) {
    super(props);
    this.state = {
        gameState:[
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ],
        currentPlayer:1
    };
  }

  componentDidMount(){
      let BackScreen = this.props.route.params.BackScreen;
    //   let xyz = JSON.parse(BackScreen)
    //   alert(BackScreen)
      this.setState({BackScreen})
      this.initializeGame()
  }

  initializeGame(){
this.setState({gameState:[
    [0,0,0],
    [0,0,0],
    [0,0,0]
],
currentPlayer: 1
})
  }

  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch(value)
    {
    case 1: return <Entypo name="cross" style={styles.crossSymbol} />
    case -1: return <Entypo name="circle" style={styles.circleSymbol} />
    default: return <View />
    }
    }

    TilePress = (row, col) => {

        //dont allow tiles to change..
        var value = this.state.gameState[row][col];
        if(value !== 0) {return; }

        //Grab Current Player
        var currentPlayer = this.state.currentPlayer;
        

        //set the correct tile
        var arr = this.state.gameState.slice();
        arr[row][col] = currentPlayer;
        this.setState({gameState: arr});
        
        
        //switch to other player
        var nextPlayer = (currentPlayer == 1)? -1 : 1;
        this.setState({currentPlayer: nextPlayer});

        //check for winners

        var winner = this.getWinner();
        if (winner == 1){
        Alert.alert('Player 1 is the winner');
        this.initializeGame();
        } else if (winner == -1){
        Alert.alert('Player 2 is the winner');
        this.initializeGame();
        }
    }



    getWinner = () => {
        const NUM_TILES = 3;
        var arr = this.state.gameState;
        var sum;
        
        //checking rows..
        for (var i = 0 ; i < NUM_TILES; i++){
        sum = arr[i][0] + arr[i][1] + arr[i][2];
        if (sum == 3) { 
        return 1; 
        }
        else if (sum == -3) {
        return -1;
        } 
    }
        
        //checking columns..
        for (var i = 0 ; i < NUM_TILES; i++){
        sum = arr[0][i] + arr[1][i] + arr[2][i];
        if (sum == 3) { 
        return 1; 
        }
        else if (sum == -3) {
        return -1;
        }   
    }
        //checking diagonals...
        sum = arr[0][0] + arr[1][1] + arr[2][2];
        if (sum == 3) { 
        return 1; 
        }
        else if (sum == -3) {
        return -1;
        }
        
        
        sum = arr[2][0] + arr[1][1] + arr[0][2];
        if (sum == 3) { 
        return 1; 
        }
        else if (sum == -3) {
        return -1;
        }
        
        
        // Tie...
        
        return 0;
    }

    resetGame = () => {
        this.initializeGame();
    }
    goBack = () => {
       this.props.navigation.navigate(this.state.BackScreen)
    }

  render() {
      const {
        currentPlayer
      } = this.state
    return (
        <SafeAreaView style={{flex:1, backgroundColor: "#fff",}}>
    
            <Header
            navigation={this.props.navigation} />
            <View style={styles.RewardsHeaderView}>
        <Text style={styles.ArticlesHeaderText}> Tic-Tac-Toe </Text>
        </View>
      <View style={styles.Container}>
          <View style={styles.playerTurn}>
            {currentPlayer == 1?
        <Text style={styles.PlayerturnText}>Player 1 Turn</Text>
        :
        <Text style={styles.PlayerturnText}>Player 2 Turn</Text>
            }
      </View>

<View style={{justifyContent: 'center',alignItems:'center', flex:1}}>
<View style={{flexDirection:'row'}}>
      <TouchableOpacity onPress={()=> {this.TilePress(0,0)}} style={[styles.MainBoard,{borderTopWidth:0, borderLeftWidth:0}]}>
          {this.renderIcon(0,0)}
          </TouchableOpacity>
      <TouchableOpacity onPress={()=> this.TilePress(0,1)} style={[styles.MainBoard,{borderTopWidth:0}]}>
      {this.renderIcon(0,1)}
      </TouchableOpacity>
        <TouchableOpacity onPress={()=> this.TilePress(0,2)} style={[styles.MainBoard,{borderTopWidth:0, borderRightWidth:0}]}>
        {this.renderIcon(0,2)}
      </TouchableOpacity>

      </View>

      <View style={{flexDirection:'row'}}>
      <TouchableOpacity onPress={()=> this.TilePress(1,0)} style={[styles.MainBoard,{borderLeftWidth:0}]}>
      {this.renderIcon(1,0)}
          </TouchableOpacity>
      <TouchableOpacity onPress={()=> this.TilePress(1,1)} style={styles.MainBoard}>
      {this.renderIcon(1,1)}
          </TouchableOpacity>
     <TouchableOpacity onPress={()=> this.TilePress(1,2)} style={[styles.MainBoard,{borderRightWidth:0}]}>
     {this.renderIcon(1,2)}
          </TouchableOpacity>
     </View>


      <View style={{flexDirection:'row'}}>
      <TouchableOpacity onPress={()=> this.TilePress(2,0)} style={[styles.MainBoard,{borderBottomWidth:0, borderLeftWidth:0}]}>
      {this.renderIcon(2,0)}
          </TouchableOpacity>
      <TouchableOpacity onPress={()=> this.TilePress(2,1)} style={[styles.MainBoard,{borderBottomWidth:0}]}>
      {this.renderIcon(2,1)}
          </TouchableOpacity>
     <TouchableOpacity onPress={()=> this.TilePress(2,2)} style={[styles.MainBoard,{borderBottomWidth:0, borderRightWidth:0}]}>
     {this.renderIcon(2,2)}
        </TouchableOpacity>
      </View>
      </View>
      </View>

      <View style={styles.ResetGameButtonView}>
          <TouchableOpacity onPress={()=> {
           Alert.alert(
            "Are you Sure you want to reset the game?",
            'The current state of the game will be lost!',
            [
              {
                text: "No",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              {
                text: "Yes",
                onPress: ()=>{
                  this.resetGame();
                }
              },
            ],
            { cancelable: false }
          );
} }
style={styles.ResetGameButton}>
            <Text style={styles.ResetGameText}>
                Reset Game
            </Text>
          </TouchableOpacity>
      </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    Container:{
        flex:1,
        // backgroundColor:'red'
    },
    Header:{
        height:60,
        backgroundColor: "#000",
        justifyContent: 'center',
        flexDirection:'row'
    },
    RewardsHeaderView:{
        justifyContent: 'center',
        alignItems: 'flex-start',
        // backgroundColor: 'pink',
        height:40,
        marginLeft:20,
        marginTop:20
    },
    ArticlesHeaderText:{
        fontFamily:'andlso',
        fontSize:30,
        color:'#000'
    },
    headerBackarrow:{
        fontSize:30,
        color:"#fff",
    },
    HeaderGameNameView:{
        justifyContent: 'center',
        alignItems:'center',
        flex:9,
    },
    HeaderGameName:{
        fontSize:24,
        fontFamily:'Poppins-Bold',
        color:'#fff'
    },
    playerTurn:{
        height:50,
        backgroundColor:'transparent',
        padding:5,
        margin:5,
        marginTop:20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    PlayerturnText:{
        fontFamily:'Beatles',
        alignSelf:'center',
        fontSize:24,
        color:'#1e8449',
    },
    MainBoard:{
        // flexDirection:'row',
        height:100,
        width:100,
        borderWidth:2,
        borderColor:"#000",
        justifyContent: 'center',
        alignItems:'center'
    },
    crossSymbol:{
        fontSize:50,
         color:"red"
    },
    circleSymbol:{
        fontSize:37,
         color:"green"
    },
    ResetGameButtonView:{
        flex:0.1,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:"transparent",
        margin:10,
        marginBottom:25,
        padding:5
    },
    ResetGameButton:{
        width:'60%',
        justifyContent: 'center',
        alignItems:'center'
    },
    ResetGameText:{
        fontSize:18,
        fontFamily:'Poppins-Bold',
        color:'#1e8449'
    }
});

export default tictactoe;
