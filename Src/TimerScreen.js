import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import Header from './Extras/Header';
import Pie from 'react-native-pie';
import {FontAwesome5,FontAwesome} from './Extras/AllIcons'
import { ScrollView } from 'react-native';
import {GetTimeSpent} from './Extras/AllApis';
import Spinner from 'react-native-spinkit';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';


//  let TimeScreenData = [
//      {color:"#C70039", ScreenName:'Home', IconName:'home',  percentage: 20, timeOntheScreen:'44'},
//      {color:"#44CD40", ScreenName:'Games', IconName:'gamepad', percentage: 40, timeOntheScreen:'60'},
//      {color:"#FB6B53", ScreenName:'Books', IconName:'book', percentage: 10, timeOntheScreen:'20'},
//      {color:"#1DCD9D", ScreenName:'News', IconName:'newspaper-o', percentage: 7, timeOntheScreen:'23'},
//      {color:"#ce62d6", ScreenName:'Articles', IconName:'file-text-o', percentage: 8, timeOntheScreen:'11'},
//      {color:"#f4ea29", ScreenName:'Others', IconName:'gear', percentage: 15, timeOntheScreen:'10'},
//  ]

let TimeScreenData = []

class TimerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        totalTime:'0',
        abc:[],
        Loader:true
    };
  }

  GetTimeSpent(UserId){
    // alert(this.getmonthlast(new Date))
    fetch(`${GetTimeSpent}?StartDate=${this.getmonthfirst(new Date)}&EndDate=${this.getmonthlast(new Date)}&UserId=${UserId}`,{
      method:'GET',
          headers:{
          Accept:'application/json'
        }})
        .then((res)=>res.json())
        .then((json)=>{
          let { Code, Result}  = json
          // let abc = JSON.parse(Result)
          // alert(JSON.stringify(Result.WithPercentage))

          if(Code == '00'){


            // let objects = {color: Result.WithPercentage.color, ScreenName:Result.WithPercentage.ScreenName, IconName:Result.WithPercentage.IconName,  percentage: Result.WithPercentage.percentage, timeOntheScreen:Result.WithPercentage.TimeInMins}

            TimeScreenData = Result.WithPercentage
      let StringTime = Result.TotalTime.toString()

            this.setState({Loader:false, totalTime:StringTime})

          }
          else
          {
            this.setState({Loader:false})

          }

    })
  }

    getmonthfirst(mydate){
      // var firstDay = new Date(mydate.getFullYear(), mydate.getMonth(), 1);
      // moment(firstDay).format("dddd, MMM DD at HH:mm a")

        var GivenDate = new Date(mydate);
        var date = 1;
        let month = GivenDate.getMonth()+1;
        var year = GivenDate.getFullYear();
        
        if(month.toString().length == 1){
           month = `0${month}`;
        }
    
        if(date.toString().length == 1){
          date = `0${date}`;
        }
    
        var firstDay = year+"-"+month+"-"+date;
        // alert(firstDay)
        return firstDay;

    } 
    
    // get month last
    getmonthlast(mydate){
      // var lastDay = new Date(mydate.getFullYear(), mydate.getMonth() + 1, 0);
      
      var GivenDate = new Date(mydate);
      // alert(GivenDate)
      var date = 31;
      let month = GivenDate.getMonth() + 1;
      var year = GivenDate.getFullYear();
      
      if(month.toString().length == 1){
         month = `0${month}`;
      }
  
      if(date.toString().length == 1){
        date = `0${date}`;
      }
  
      var lastDay = year+"-"+month+"-"+date;
      // alert(date)
      // alert(lastDay)
      return lastDay;
    }
  

  async componentDidMount(){
    let UserId = await AsyncStorage.getItem('UserId')
    // alert(JSON.stringify(TimeScreenData))
    var date = new Date(); 

    this.getmonthfirst(date);
    this.getmonthlast(date)

    this.GetTimeSpent(UserId)

  }
  render() {

    return (
        <SafeAreaView style={{flex:1, backgroundColor: "#fff",}}>
          
        <Header 
        navigation={this.props.navigation}/>
              <View style={styles.GamesHeaderView}>
          <Text style={styles.GamesHeaderText}> Screen Times </Text>
          </View>
          {this.state.Loader == false?
        <ScrollView>

      <View style={styles.TopContainer}>
        <View style={{justifyContent: 'center', alignItems: 'center', flex:2}}>
      <FastImage
              style={{ height:150,width:150}}
              source={{
                  uri: 'https://i.ibb.co/SJ3KYs2/5-min.gif',
                  priority: FastImage.priority.high,
                  cache: FastImage.cacheControl.immutable
              }}
              resizeMode={FastImage.resizeMode.contain}
              onLoadEnd={()=>this.setState({gifLoading:false})}
          />
          </View>
          <View style={{margin:5, marginLeft:0, backgroundColor: 'transparent', flex:2, justifyContent: 'center', alignItems: 'center'}}>
           <Pie
              radius={70}
              innerRadius={60}
              sections={TimeScreenData}
              dividerSize={1}
              strokeCap={'round'}
            /> 
    
             <View style={styles.gauge}>
                <Text style={styles.gaugeText}>
                  {this.state.totalTime.substr(0,5)} mins
                </Text>
              </View>
      </View>
   
        {/* <View style={{ backgroundColor: "transparent", flex:1}}>
            {TimeScreenData.map((val)=>{
          return(
            <View style={{borderRadius:10, backgroundColor:val.color , margin:4,opacity:0.5,height:25,justifyContent: 'center', alignSelf: 'flex-end', }}>
            <View style={{flex:1, flexDirection:'row', padding:5, paddingVertical:2 }}>
                <FontAwesome name='eercast' size={14} color='#000' />
                <Text style={{color:'#000'}}>{val.ScreenName}</Text>
            </View>
            </View>
            )})}


      </View> */}
      
      
      </View>
      <View style={styles.BottomContainer}>

      {typeof TimeScreenData != 'undefined'?
      TimeScreenData.map((val)=>{
        console.log(val)
        console.log('Hellozxncjh')
          return (
      <View style={styles.tabsView}>
           <View style={styles.TabsIconsView}>
              <View style={[styles.TabsIcons,{backgroundColor:val.color}]}>
              <FontAwesome name={val.IconName} size={20} color='#fff'/>
              </View>
           </View>
           
           <View style={styles.tabsbar}>
               <View style={{flex:2}}>
              <Text allowFontScaling={false} style={styles.tabsbarText}>
                  {val.ScreenName}
              </Text>
              </View>
              <View style={{flex:1}}>

              <Text allowFontScaling={false} style={[styles.tabsbarText,{fontSize:18}]}>
                      {val.TimeInMins} mins
                  </Text>
                  </View>
           </View>
      
      </View>
       ) })
       :
       null
    }


      </View>
      </ScrollView>
  :
  <View style={{flex:1, zIndex:99, justifyContent: 'center', alignItems:'center'}}>
  <Spinner size={50} type={"ChasingDots"} color={'#1e8449'}/>
  </View>
  }
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
    TopContainer:{
        flexDirection:'row',
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "transparent",
        margin:10,
        padding: 20,
    },
    BottomContainer:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabsView:{
        flexDirection:'row',
        backgroundColor: 'transparent',
    },
    TabsIconsView:{
        height:75,
        flex:3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TabsIcons:{
        height:60,
        width:60,
        backgroundColor: '#ce62d6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:20
    },
    tabsbar:{
        flex:7,
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // alignSelf:'flex-start',
        flexDirection:'row'
    },
    tabsbarText:{
        fontFamily:'Beatles',
        fontSize:24
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
    gauge: {
        position: 'absolute',
        width: 160,
        height: 160,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
      },
      gaugeText: {
        backgroundColor: 'transparent',
        color: '#000',
        fontSize: 22,
        fontFamily:'Beatles',
      },
      linearGradient: {
        flex: 1,
      },
})
export default TimerScreen;
