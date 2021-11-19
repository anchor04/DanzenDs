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
    Image
  } from 'react-native';
  import Entypo from 'react-native-vector-icons/dist/Entypo';
  import VideoPlayer from 'react-native-video-player';
  import YoutubePlayer from "react-native-youtube-iframe";
  
  let isPlaying = false;

//   const togglePlaying = useCallback(() => {
//     isPlaying((prev) => !prev);
//   }, []);


  export default class emptyScreen extends React.Component{

    
    constructor(props){
        super(props)
            this.state = {
                username:null,
            };
        }
    

componentDidMount(){
    let username = this.props.route.params.UserName
    this.setState({username})
    // // let abc = JSON.parse(username)
    // alert(username)
}


    render(){
        return(
            <SafeAreaView style={{flex:1}}>
                <StatusBar />
                       <View style={styles.Header}>
                           <View style={styles.BlackBox}>
                        <Entypo name="menu" size={20} color={'#fff'} />
                       </View>
                       </View>
                       <View style={styles.VideoContainer}>
                       {/* <VideoPlayer
    video={{uri: 'https://www.youtube.com/watch?v=LipLZ59sLqQ' }}
    videoWidth={1500}
    videoHeight={1000}
    autoplay={false}
    defaultMuted={true}
    thumbnail={{ uri: 'https://i.ytimg.com/vi/H0l3tEWVxhs/maxresdefault.jpg' }}
/> */}

                        <YoutubePlayer
                        height={300}
                        // play={playing}
                        videoId={"aAaDyHjSPYc"}
                        // onChangeState={onStateChange}
                         />
                        </View>
                    <View style={styles.separator} />
                        <View style={styles.Greenbar}>

                        </View>

                        <View style={styles.BottomCard}>
                            <View style={styles.NameBar}>
                            <Text style={styles.NameText}>Hello, {this.state.username}</Text>
                            </View>


                        <View style={{flexDirection:'row', justifyContent:'center', alignContent:'center', marginTop:"10%"}}>
                            <View style={styles.Card}>
                                <View style={styles.ImageContainer}>
                            <Image style={{height:100, width:100}} source={require('../Src/images/books.png')} resizeMode='contain'/>
                            </View>
                            </View>
                            <View style={styles.Card}>
                            <View style={styles.ImageContainer}>
                            <Image style={{height:100, width:100}} source={require('../Src/images/news.png')} resizeMode='contain'/>
                            </View>
                            </View>
                            </View>

                            <View style={{flexDirection:'row', justifyContent:'center', alignContent:'center'}}>

                            <View style={styles.Card}>
                            <View style={styles.ImageContainer}>
                            <Image style={{height:200, width:200}} source={require('../Src/images/games.png')} resizeMode='contain'/>
                            </View>
                            </View>

                            <View style={styles.Card}>
                            <View style={styles.ImageContainer}>
                            <Image style={{height:80, width:80}} source={require('../Src/images/glass.png')} resizeMode='contain'/>
                            </View>
                            </View>
                            </View>

                        </View>
            {/* <TouchableOpacity onPress={()=> this.props.navigation.navigate('LoginScreen')}>
            <Text>
              Go Back
            </Text>
            </TouchableOpacity> */}
            </SafeAreaView>
            )}
        }

    const styles = StyleSheet.create({
        Header:{
            backgroundColor:'#fff',
            height:50,
            padding:10,
            justifyContent:'center'
        },
        Card:{
            height:100,
            width:100, 
            backgroundColor:'#F0F0F0',
            margin:10,
            padding:10,
            borderRadius:10
        },
        ImageContainer:{
            height:"100%",
            width:"100%",
            justifyContent:'center',
            alignItems:'center'
        },
        BlackBox:{
            justifyContent:'center',
            alignItems:'center',
            height:30, 
            width:30, 
            backgroundColor:'#000',
            borderRadius:4
        },
        VideoContainer:{
            height:'30%',
            backgroundColor:'#fff'
        },
        Greenbar:{
            height:40,
            backgroundColor:'#2F7433',
        },
        BottomCard:{
            borderTopLeftRadius:15,
            borderTopRightRadius:15,
            height:'50%',
            backgroundColor:'#fff'
        },
        separator:{
            height:2, 
            borderWidth:0.2, 
            backgroundColor:'#000', 
            marginTop:2
        },
        NameBar:{
            justifyContent:'center',
            alignItems:'center',
            height:40,
            backgroundColor:'#2B2E37',
            borderTopRightRadius:15,
            borderTopLeftRadius:15
        },
        NameText:{
            fontFamily:'Poppins-Regular',
            fontSize:15,
            color:'#fff'
        }
    })