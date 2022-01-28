import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import Header from './Extras/Header';
import { GetTopScorer } from './Extras/AllApis'
import Spinner from 'react-native-spinkit';
const {width} = Dimensions.get('window')

class Top20 extends Component {
    constructor(props) {
      super(props);
      this.state = {
          Loader:true
      };
    }
    
    getTop20(){
        fetch(`${GetTopScorer}`,{
            method:'GET',
            headers:{
            Accept:'application/json'
          }})
          .then((res)=>res.json())
          .then((json)=>{
            let {Message, Code, Data} = json
            if(Code == '00'){
                // alert(JSON.stringify(Data))
                this.setState({Loader:false, Top20scorers:Data})

                // setTimeout(() => {
                //     // alert(JSON.stringify(this.state.Top20scorers))
                // }, 1000);
          }else{
            this.setState({Loader:false})
            alert(Message)
          }
        })

        }
          
    componentDidMount(){
        this.getTop20();
    }

    render(){
        return(
            <SafeAreaView style={{flex:1, backgroundColor: "#fff",}}>
                <Header 
                navigation={this.props.navigation}
                WhiteHeader={false}/>
                <View style={styles.BooksHeaderView}>
                <Text style={styles.BooksHeaderText}> Top 20 Scorers </Text>
                </View>
            {this.state.Loader == false?
  
  <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>

                <FlatList
                keyboardShouldPersistTaps={'always'}
                    maxToRenderPerBatch={250}
                    removeClippedSubviews={true}
                    initialNumToRender={30}
                    data={this.state.Top20scorers}
                    renderItem={({item, index}) =>
                        (
                        <>   
                        <View style={styles.Main}>
                            <View style={styles.ContMain}>
                            <View style={styles.Container}>
                            <Text style={styles.scorerText}>
                                {item.Name}
                            </Text>
                            <Text style={styles.scorerText}>
                                Total Time: {item.TotalTime}
                            </Text>
                        </View>
                       

                        </View>
                        </View>
                </>
                    )
                    }/> 
                </View>

                    :
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Spinner size={50} type={"ChasingDots"} color={'#1e8449'}/> 
                </View>
            }
            </SafeAreaView>
        )
    }
}

export default Top20;

const styles = StyleSheet.create({
    Main:{
        flex:1,
        backgroundColor: "#fff",
    },
    BooksHeaderView:{
        justifyContent: 'center',
        alignItems: 'flex-start',
        // backgroundColor: 'pink',
        height:40,
        marginLeft:20,
        marginTop:20
    },
    BooksHeaderText:{
        fontFamily:'Helvetica-Bold',
        fontSize:30,
        color:'#000'
    },
    ContMain:{
        marginTop:10,
        width:width, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    Container:{
        width:'90%',
        backgroundColor: '#1e8449',
        justifyContent: 'center',
        borderRadius:10,
        padding:10,
        alignItems: 'center',
        margin:10
    },
    scorerText:{
        fontFamily:'Atlanta-Book',
        fontSize:20,
        color:'#fff'
    },
})
