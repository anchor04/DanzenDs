import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image, SafeAreaView, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Header from './Extras/Header'
const {height, width} = Dimensions.get('window')
import { Ionicons, Entypo, AntDesign, Feather} from './Extras/AllIcons'
import LottieView from 'lottie-react-native';
import { GetNotifications } from './Extras/AllApis';



let NotifcationsArray = [
    // {color:"#C70039", Title:'Dashboard', Description:'Test Desct',backgroundColor:'#eddae8', UserTypeId:'2', Link:'asd', ImageUrl:"asdzxcasd"},
    // {color:"#C70039", ScreenName:'Dashboard', Description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',backgroundColor:'#eddae8', UserTypeId:'2', Link:'asd', ImageUrl:"https://ibb.co/mXqtsdV"},
    // {color:"#44CD40", ScreenName:'Reward', backgroundColor:'#cdf2d0', timeOntheScreen:'44'},
    // {color:"#FB6B53", ScreenName:'HangMan', backgroundColor:'#eddbcb', timeOntheScreen:'44'},
    // {color:"#1DCD9D", ScreenName:'Tic-Tac-Toe', backgroundColor:'#cbedec', timeOntheScreen:'44'},
]


class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getNots(){
      // alert(1)
      NotifcationsArray = [];
      fetch(`${GetNotifications}?UserTypeId=2`,{
        method:'GET',
        headers:{
        Accept:'application/json'
      }})
      
      .then((res)=>res.json())
      .then((json)=>{
        
        let {Code, Message, Data} = json;
        if(Code == '00'){
            // alert(JSON.stringify(Data))
            // var objects = {ScreenName:Data.Title, color:Data.Color, backgroundColor:Data.BackgroundColor,Description: Data.Description, UserTypeId:Data.UserTypeId, Link:Data.Link, ImageUrl:Data.ImageUrl }
            // NotifcationsArray.push(objects)
            NotifcationsArray = Data
            this.setState({Loader:false})
  
        }
        else{
            alert(Message)
          this.setState({Loader:false})
        }
    })
  }

  componentDidMount(){
    this.getNots()
  }

  render() {
    return (
        <SafeAreaView style={{flex:1, backgroundColor: "#fff",}}>
            <Header 
            navigation={this.props.navigation}/>
              <View style={styles.GamesHeaderView}>
          <Text style={styles.GamesHeaderText}> Notifications </Text>
          </View>
          <View style={{height:height*0.1, width:width, justifyContent: 'center', alignItems: 'center', marginTop:50}}>
        <LottieView source={require('../Src/images/bell-alert.json')} style={{height:200, width:'100%'}} autoPlay loop />
      </View>
          <View style={styles.MainContainer}>
          <FlatList
                  keyboardShouldPersistTaps={'always'}
                  //  updateCellsBatchingPeriod={100}
                       maxToRenderPerBatch={250}
                       removeClippedSubviews={true}
                       initialNumToRender={30}
                       showsVerticalScrollIndicator={false}
                       data={NotifcationsArray}
                       renderItem={({item}) =>{
                            return(
              <View style={[styles.opacityview,{backgroundColor:item.BackgroundColor}]}>

                  <View style={styles.BarView}>
                <View style={{flexDirection:'row'}}>

                <View style={[styles.BarViewIcon,{backgroundColor:item.Color}]}>
                <Entypo name="bell" size={16} color={'#fff'}/>
                </View>
                <View style={styles.BarViewText}>
                    <TouchableOpacity onPress={()=> this.props.navigation.push(item.ScreenName)}>
                <Text allowFontScaling={false} style={styles.BarTextTitle}>
                    {item.Title}
                </Text>
                <Text allowFontScaling={false} style={styles.BarTextDesc}>
                    {item.Description}
                </Text>
                </TouchableOpacity>
                  </View>
                <View style={styles.BarViewImage}>
                  {item.ImageUrl == null ?
                  <Image source={require('./images/123.png')} style={styles.ImageStyle} resizeMode='contain' />
                  :
                  <Image source={{uri: item.ImageUrl}} style={[styles.ImageStyle,{height:100, width:60, borderRadius:10}]} resizeMode='contain'/>
                       }
                  </View>
                  </View>
                  </View>
           
              </View>
           
                        )}}
          />
          </View>
          
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
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
    MainContainer:{
        marginTop:50,
        flex:1,
        justifyContent: 'center',
        // alignItems:'center',
        // backgroundColor: 'red',
    },
    opacityview:{
        flex:1,
        margin:10,
        // width:'80%',
        // opacity:0.2,
        backgroundColor:'#EF9500',
        borderRadius:15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    BarView:{
        
        flexDirection:'row',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    BarViewIcon:{
        // flex:2,
        margin:5,
        // padding: 10,
       height:50,
       width:50,
       borderRadius:15,
       justifyContent: 'center',
        alignItems: 'center',
    },
    BarViewText:{
        flex:8,
        justifyContent: 'center',
      alignItems:'flex-start',

    },
    BarViewImage:{
      flex:2,
      justifyContent: 'center',
      alignItems:'center',
    },
    ImageStyle:{
      height:40,
      width:40
    },
    BarTextTitle:{
        fontFamily:'Poppins-SemiBold',
        fontSize:15
    },
    BarTextDesc:{
      fontFamily:'Poppins-Regular',
      fontSize:12
    }
})
export default Notifications;
