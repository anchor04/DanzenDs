import React, { Component } from 'react';
import { View, Text, Image, SafeAreaView, StyleSheet, ScrollView, AsyncStorage } from 'react-native';
import Header  from './Extras/Header';
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';
import {GetRewards, GetTimeSpent} from './Extras/AllApis'
import Spinner from 'react-native-spinkit';
import LinearGradient from 'react-native-linear-gradient';



let RewardsArray = []


class Rewards extends Component {
  constructor(props) {
    super(props);
    this.state = {
        Timer:0, 
        Loader:true,
        totalTime:0
    };
  }

  getRewardsApi(){
    fetch(`${GetRewards}`, {
      method:'GET',
      headers:{
      Accept:'application/json'
      }})
      .then((res)=>res.json())
      .then((json)=>{
  
      let {Code, Message, Data} = json;
          // alert(JSON.stringify(Data))
      if(Code == '00'){
      
        this.setState({dataobj:Data, Loader:false})

        // let objects = {id: Data}
      }
      else{
        alert(Message)
        this.setState({Loader:false})
      }
    })
  }

  GetTimeSpent(UserId){
    fetch(`${GetTimeSpent}?StartDate=2021-12-01&EndDate=2021-12-29&UserId=${UserId}`,{
      method:'GET',
          headers:{
          Accept:'application/json'
        }})
        .then((res)=>res.json())
        .then((json)=>{
          let { Code, Result}  = json
          if(Code == '00'){
      let StringTime = Result.TotalTime.toString()
            let substringtime = StringTime.substr(0,5)
            this.setState({Loader:false, totalTime:substringtime})
       
          }
          else
          {
            this.setState({Loader:false})

          }

    })
  }

  async componentDidMount(){
    this.getRewardsApi()
    let UserId = await AsyncStorage.getItem('UserId')
    this.GetTimeSpent(UserId)

  }


  render() {
      const {totalTime, dataobj} = this.state;
    return (
      <SafeAreaView style={{flex:1, backgroundColor: "#fff",}}>
      <Header 
          navigation={this.props.navigation}
          />
      <View style={styles.RewardsHeaderView}>
        <Text style={styles.RewardsHeaderText}> Rewards </Text>
        </View>
      {this.state.Loader == false?
        <ImageHeaderScrollView
          showsVerticalScrollIndicator={false}
      maxHeight={150}
      minHeight={0}
      minOverlayOpacity={0}
      maxOverlayOpacity={0}
      showsVerticalScrollIndicator={false}
      // headerImage={require("./images/tictactoecover.png")}
      renderHeader={() =>  {
        return(
          <>
       <View style={styles.TopContainer}>

      <Text style={styles.Timer}>
           {totalTime} mins
      </Text>

      </View>
        </>
        )}
}
      useNativeDriver={true}
      headerContainerStyle={{justifyContent: 'center',borderTopRightRadius:40, borderTopLeftRadius:40, alignSelf: 'center', backgroundColor: '#1e8449',}}
     > 
      <View style={{...StyleSheet.absoluteFillObject, backgroundColor:"#1e8449"}}/>

      <View style={styles.MainContainer}>
        
          {typeof dataobj != 'undefined'?
          dataobj.map(val=>{
        
            return(
              <>
        <View style={styles.NewsView}>

        <Image source={{uri:val.ImageUrl}} style={styles.Image} resizeMode='contain'/>
        <View>
        <View style={styles.RewardstextHeaderView}>
        <Text style={styles.RewardstextHeader}> 
          {val.Title}
          </Text>
          </View>
        <View style={styles.RewardstextView}>
          <Text style={styles.RewardsText}> 
          {val.Description}
          </Text>
      </View>
      </View>
      </View>

              </>
            )
          })
        :
        null} 
      </View>

      </ImageHeaderScrollView>
      :
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      {/* <ActivityIndicator size={25} color="#000" /> */}
<Spinner size={50} type={"ChasingDots"} color={'#1e8449'}/> 

    </View>
        }
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  RewardsHeaderView:{
    justifyContent: 'center',
    alignItems: 'flex-start',
    // backgroundColor: 'pink',
    height:40,
    marginLeft:20,
    marginTop:20
},
TopContainer:{
    // margin:10,
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
    height:100,
    backgroundColor: '#1e8449',
},
Timer:{
    fontSize:24,
    fontFamily:'Poppins-Medium',
    color:'#fff'
},
RewardsHeaderText:{
    fontFamily:'Helvetica-Bold',
    fontSize:30,
    color:'#000'
},
MainContainer:{
  justifyContent: 'center',
  alignItems:'center',
  backgroundColor: "#fff",
  borderTopLeftRadius:40,
  borderTopRightRadius:40
},
NewsView:{
  margin:20,
  flexDirection:'row',
  // justifyContent: 'flex-start',
  alignSelf: 'flex-start',
},
Image:{
  height:120, 
  width:120, 
  borderRadius:15,

},
RewardsText:{
  fontFamily:'Poppins-Regular',
  fontSize:14
},
RewardstextView:{
  marginVertical:2,
  margin:5,
  width:'90%',
},
RewardstextHeader:{
  fontFamily:'Poppins-Bold',
  fontSize:18
},
RewardstextHeaderView:{
  marginVertical:2,
  margin:5,
  width:'90%',
},
})

export default Rewards;
