import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    // Modal,
    Image,
    AsyncStorage,
    Dimensions,
    BackHandler,
    Animated,
    Easing,
    Alert
  } from 'react-native';
import Modal from "react-native-modal";
  import {AntDesign, Entypo} from './Extras/AllIcons';
  import VideoPlayer from 'react-native-video-player';
  import YoutubePlayer from "react-native-youtube-iframe";
import FastImage from 'react-native-fast-image'
import { MyCarousel } from './Carousel';
import CustomTabBar from './Extras/CustomTabBar';
import {DashboardBanners} from '../Src/Extras/AllApis'
const { height, width } = Dimensions.get('window');
import Spinner from 'react-native-spinkit';


const backgroundImage = require('../Src/images/trans.gif');


// let defaultgreen = '#7fe076';
// let defaultgreen = '#32a352';
let defaultgreen = '#30A453';

//   const togglePlaying = useCallback(() => {
//     isPlaying((prev) => !prev);
//   }, []);




  export default class dashboard extends React.Component{

    
constructor(props){
    super(props)
        this.state = {
            timecount:0,
            VideoModalVisible:false,
            ImagesArray:null,
            ImageLoader:true,
            SlideItems: new Animated.Value(0),
            SlideOpacity: new Animated.Value(1),
            rightSlide: new Animated.Value(height),
            rightSlideOpacity:new Animated.Value(0),
            Animationforbtn1: new Animated.Value(1),
            Animationforbtn2: new Animated.Value(1),
            Animationforbtn3: new Animated.Value(1),
            Animationforbtn4: new Animated.Value(1),
            Animationforbtn5: new Animated.Value(1),
            Animationforbtn6: new Animated.Value(1),
        };
    }

    getDBBanner(){
        fetch(`${DashboardBanners}`, {
            method:'GET',
            headers:{
            Accept:'application/json'
            }})
            .then((res)=>res.json())
            .then((json)=>{
        
            let {Code, Message, Data} = json;
                // alert(JSON.stringify(Data))
            if(Code == '00'){
            
            this.setState({ImagesArray:Data, ImageLoader:false})

            this.setState({VideoUrl:Data[0].VideoUrl})
            }
            else{
                alert(Message)
            this.setState({ImageLoader:false})

            }
    })
    }

counterOnscreen(){
 var hours = new Date().getHours();
 var minutes = new Date().getMinutes();
 var seconds = new Date().getSeconds();
 console.log('Checked in at '+hours+':'+minutes+':'+seconds)
}

counterOffscreen(){
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    var seconds = new Date().getSeconds();
    console.log('Checked out at '+hours+':'+minutes+':'+seconds)
   }

backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to exit?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
}

anim1(){
      Animated.timing(this.state.Animationforbtn1, {
        toValue: 2,
        duration: 1500,
      }).start(()=>{
        Animated.timing(this.state.Animationforbtn1, {
            toValue: 1,
            duration: 500,
          }).start();
      });
}
anim2(){
    Animated.timing(this.state.Animationforbtn2, {
      toValue: 2,
      duration: 1500,
    }).start(()=>{
      Animated.timing(this.state.Animationforbtn2, {
          toValue: 1,
          duration: 500,
        }).start();
    });
}
anim3(){
    Animated.timing(this.state.Animationforbtn3, {
      toValue: 2,
      duration: 1500,
    }).start(()=>{
      Animated.timing(this.state.Animationforbtn3, {
          toValue: 1,
          duration: 500,
        }).start();
    });
}
anim4(){
    Animated.timing(this.state.Animationforbtn4, {
      toValue: 2,
      duration: 1500,
    }).start(()=>{
      Animated.timing(this.state.Animationforbtn4, {
          toValue: 1,
          duration: 500,
        }).start();
    });
}
anim5(){
    Animated.timing(this.state.Animationforbtn5, {
      toValue: 2,
      duration: 1500,
    }).start(()=>{
      Animated.timing(this.state.Animationforbtn5, {
          toValue: 1,
          duration: 500,
        }).start();
    });
}
anim6(){
    Animated.timing(this.state.Animationforbtn6, {
      toValue: 2,
      duration: 1500,
    }).start(()=>{
      Animated.timing(this.state.Animationforbtn6, {
          toValue: 1,
          duration: 500,
        }).start();
    });
}


async componentDidMount(){
    this.getDBBanner()
    let UserId = await AsyncStorage.getItem('UserId');
    let Username = await AsyncStorage.getItem('Username');
    // alert(UserId)
    let UserNameParsed = JSON.parse(Username)
    
    this.setState({UserId, UserNameParsed});
    

    const didBlurSubscription = this.props.navigation.addListener( 'blur', payload => { 
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);

       });
      const didFocusSubscription = this.props.navigation.addListener( 'focus', payload => {
        BackHandler.addEventListener("hardwareBackPress", this.backAction);

    })
  
    // this.counterOnscreen()


}


    render(){
        const {
            timecount,
            VideoModalVisible
        } = this.state;

        return(
            <>
            <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
                <StatusBar />       
                       <View style={styles.Header}>
                           
                           <View style={[styles.BlackBox,{flex:1}]}>
                               <TouchableOpacity onPress={()=> 
                                this.props.navigation.openDrawer()}>
                        <Entypo name="menu" size={30} color={'#fff'} />
                        </TouchableOpacity>
                       </View>
                       <View style={{flex:9, justifyContent: 'center', alignItems: 'flex-end', marginHorizontal:10}}>
                            <Text allowFontScaling={false} style={{color:'#fff', fontFamily:'Beatles', fontSize:18}}>
                               Hello! {this.state.UserNameParsed}
                            </Text>
                       </View>
                       </View>
                       
                       <View style={styles.VideoContainer}>
                       {this.state.ImageLoader == false?
                 
                         <MyCarousel
                         Parent={this}
                         ImagesArray={this.state.ImagesArray}
                         />
                        :
<View style={{flex:1, justifyContent: 'center', alignItems: 'center',}}>
              {/* <ActivityIndicator size={30} color={'#fff'} /> */}
        <Spinner size={50} type={"ChasingDots"} color={'#fff'}/> 

            </View>
                       }
                        </View>

                        
                        <View style={styles.BottomMainCardView}>
                        <View style={{...StyleSheet.absoluteFillObject, backgroundColor:defaultgreen}}/>
                
                 <View style={{flex:1, borderTopLeftRadius:70, backgroundColor: "#fff"}}>
                 <FastImage style={styles.imageBackground} source={backgroundImage} />

                 <View style={styles.BottomCard}>
                          


                        <View style={{flexDirection:'row', justifyContent:'center', alignContent:'center'}}>
                        <TouchableOpacity onPress={()=> {
                            this.anim1();
                            setTimeout(() => {
                                this.props.navigation.push('Books', {Header:null})
                            }, 2500); 
                            }}>
                            
                            <View style={styles.Card}>
                                <Animated.View style={[styles.ImageContainer,{
                                    transform:[
                                        {
                                            scale:this.state.Animationforbtn1,
                                        } 
                                     ]
                                }]}>
                            <Image style={{height:50, width:50}} source={require('../Src/images/Dashboardicons/books.png')} resizeMode='contain'/>
                            </Animated.View>
                            <View style={{justifyContent:'center',alignItems:'center',}}>
                            <Text style={styles.IconText}>
                               Books
                            </Text>
                            </View>
                            </View>
                            </TouchableOpacity>

                            <TouchableOpacity 
                            onPress={()=> {
                                    this.anim5();
                                    setTimeout(() => {this.props.navigation.navigate('ArticlesScreen', {Header:null})
                                }, 2500)}}>
                                <View style={styles.Card}>
                            <Animated.View style={[styles.ImageContainer,{
                                    transform:[
                                        {
                                            scale:this.state.Animationforbtn5,
                                        } 
                                     ]
                                }]}>
                            <Image style={{height:50, width:50}} source={require('../Src/images/Dashboardicons/articles.png')} resizeMode='contain'/>
                            </Animated.View>
                            <View style={{justifyContent:'center',alignItems:'center',}}>

                            <Text style={styles.IconText}>
                                Articles
                            </Text>
                            </View>
                            </View>
                            </TouchableOpacity>

                   

                            <TouchableOpacity 
                            onPress={()=> {
                                    this.anim3();
                                    setTimeout(() => {this.props.navigation.navigate('gamesList', {Header:null})
                                    }, 2500)}}>
                            <View style={styles.Card}>
                            <Animated.View style={[styles.ImageContainer,{
                                    transform:[
                                        {
                                            scale:this.state.Animationforbtn3,
                                        } 
                                     ]
                                }]}>
                            <Image style={{height:50, width:50}} source={require('../Src/images/Dashboardicons/games.png')} resizeMode='contain'/>
                            </Animated.View>
                            <View style={{justifyContent:'center',alignItems:'center',}}>
                            <Text style={styles.IconText}>
                                Games
                            </Text>
                            </View>
                            </View>
                            </TouchableOpacity>

                            </View>

                            <View style={{flexDirection:'row', justifyContent:'center', alignContent:'center'}}>
                            <TouchableOpacity 
                            onPress={()=> {
                                    this.anim4();
                                    setTimeout(() => {this.props.navigation.navigate('WelcomeScreen', {Header:'Quiz'})
                                }, 2500)}}>
                                    
                                    <View style={styles.Card}>
                            <Animated.View style={[styles.ImageContainer,{
                                    transform:[
                                        {
                                            scale:this.state.Animationforbtn4,
                                        } 
                                     ]
                                }]}>
                            <Image style={{height:50, width:50}} source={require('../Src/images/Dashboardicons/quiz.png')} resizeMode='contain'/>
                            </Animated.View>
                            <View style={{justifyContent:'center',alignItems:'center',}}>
                            <Text style={styles.IconText}>
                                Quiz
                            </Text>
                            </View>
                            
                            </View>
                            </TouchableOpacity>

                            {/* <View style={{flexDirection:'row', justifyContent:'center', alignContent:'center'}}> */}

                       

                            <TouchableOpacity 
                            onPress={()=> {
                                    this.anim6();
                                    setTimeout(() => {this.props.navigation.navigate('Reward', {Header:null})
                                }, 2500)}}>
                                <View style={styles.Card}>
                            <Animated.View style={[styles.ImageContainer,{
                                    transform:[
                                        {
                                            scale:this.state.Animationforbtn6,
                                        } 
                                     ]
                                }]}>
                            <Image style={{height:50, width:50}} source={require('../Src/images/Dashboardicons/reward.png')} resizeMode='contain'/>
                            </Animated.View>
                            <View style={{justifyContent:'center',alignItems:'center',}}>
                            <Text style={styles.IconText}>
                                Rewards
                            </Text>
                            </View>
                            </View>
                            </TouchableOpacity>

                            <TouchableOpacity 
                            onPress={()=> {
                                    this.anim2();
                                    setTimeout(() => {this.props.navigation.push('NewsScreen', {UserId:this.state.UserId})
                                    }, 2500)}}>
                            <View style={styles.Card}>
                            <Animated.View style={[styles.ImageContainer,{
                                    transform:[
                                        {
                                            scale:this.state.Animationforbtn2,
                                        } 
                                     ]
                                }]}>
                            <Image style={{height:50, width:50}} source={require('../Src/images/Dashboardicons/news.png')} resizeMode='contain'/>
                            </Animated.View>
                            <View style={{justifyContent:'center',alignItems:'center',}}>
                            <Text style={styles.IconText}>
                               News
                            </Text>
                            </View>
                            </View>
                            </TouchableOpacity>
                            </View>

          
                        </View>
                        </View>

                        <View style={styles.BottomCustomTab}>
                        <View style={styles.customTabbar}>
                            <CustomTabBar
                            navigation={this.props.navigation}
                            Parent={this}/>
                            </View>
                            </View>
                        </View> 
                   

           

            </SafeAreaView>
                        {VideoModalVisible == true?
            <View style={styles.VideoModalView}>

                        <Modal 
                        animationIn={"slideInUp"}
                        animationOut={'slideInDown'}
                        transparent={true}
                        isVisible={VideoModalVisible == true? true : false}
                        onBackdropPress={()=> this.setState({VideoModalVisible:false})}
                        >
                            <View style={styles.VideoView}>
                        <YoutubePlayer
                height={200}
                 videoId={this.state.VideoUrl}
                //  videoId={"g3aSkwL73T0"}
                
                  /> 
                  </View>
                  </Modal> 
                  </View>

                  :
                  null
                        }
            </>
            
            )}
        }

    const styles = StyleSheet.create({
        Header:{
            flexDirection:'row',
            backgroundColor:defaultgreen,
            height:50,
            padding:10,
            justifyContent:'center'
        },
        Card:{
            height:100,
            width:100, 
            // backgroundColor:'#c8c8c8',
            margin:10,
            // padding:10,
            borderRadius:10,
        },
        customTabbar:{
            height:60, 
            borderRadius:15, 
            backgroundColor: "#30A453",
            // marginTop:50, 
            width:'95%', 
            justifyContent: 'center', 
            alignSelf: 'center'
        },
        VideoModalView:{
            // flex: 1,
            // backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
            borderRadius: 20,
            // alignItems: "center",
        },
        VideoView:{

            backgroundColor:'transparent', 

            // justifyContent: 'center',
        },
        IconText:{
            fontFamily:'Atlanta-Book',
            fontSize:14,
            color:"#000",
            // fontWeight:'400'
        },
        ImageContainer:{
            // height:"100%",
            width:"100%",
            justifyContent:'center',
            alignItems:'center',
        },
        BlackBox:{
            justifyContent:'center',
            alignItems:'center',
            height:40, 
            width:40, 
            backgroundColor:'transparent',
            borderRadius:4
        },
        VideoContainer:{
            flex:0.4,
            backgroundColor:defaultgreen,
            borderBottomRightRadius:70
        },
        BottomMainCardView:{
            flex:0.55,
            backgroundColor:'#000',
            borderTopLeftRadius:70
            // borderTopColor:'#000000',
            // borderTopWidth:0.1,
        },
        BottomCustomTab:{
            justifyContent: 'center', 
            backgroundColor: '#fff',
            flex:0.1
        },
        BottomCard:{
            // borderTopLeftRadius:15,
            // borderTopRightRadius:15,
            // height:'50%',
            // backgroundColor:'#fff',
            marginTop:'10%',
            borderBottomColor:'#2B2E37'
        },
        imageBackground: {
            opacity:0.2,
            width: '100%',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          },
        
    })