import React, { Component } from 'react';
import { Animated , PanResponder, Dimensions, View, Text, SafeAreaView, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import Header from './Extras/Header';
import {FontAwesome, Feather} from './Extras/AllIcons';
const {height, width} = Dimensions.get('window')
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';
import LottieView from 'lottie-react-native';
import FastImage from 'react-native-fast-image'

const backgroundImage = require('./images/trans.gif');


class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SlideItems: new Animated.Value(1),
      SlideOpacity: new Animated.Value(1),
      rightSlide: new Animated.Value(height),
      rightSlideOpacity:new Animated.Value(0),
    };
  }
  pan = new Animated.ValueXY();
  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      { dx: this.pan.x, dy: this.pan.y }
    ]),
    onPanResponderRelease: () => {
      Animated.spring(this.pan, { toValue: { x: 0, y: 0 } }).start();
    }
  });

  showItems(){
    Animated.timing(this.state.opacity, {
      toValue: 1,
      easing:Easing.linear,
      duration: 1000,
      useNativeDriver:true

    }).start();
  
    Animated.timing(this.state.SlideItems, {
      toValue: 1,
      easing:Easing.linear,
      duration: 200,
      useNativeDriver:true

    }).start();
  
    Animated.timing(this.state.SlideOpacity, {
      toValue: 1,
      easing:Easing.linear,
      duration: 500,
      useNativeDriver:true
    }).start();
  
    this.setState({showItems:1})
  }


  hideItems(){
    Animated.timing(this.state.opacity, {
      toValue: 0,
      easing:Easing.linear,
      duration: 1000,
      useNativeDriver:true

    }).start();
  
    Animated.timing(this.state.SlideItems, {
      toValue: width,
      easing:Easing.linear,
      duration: 500,
      useNativeDriver:true

    }).start();
  
    Animated.timing(this.state.SlideOpacity, {
      toValue: 0,
      easing:Easing.linear,
      duration: 500,
      useNativeDriver:true

    }).start();
  
  
  
    this.setState({showItems:0})
  
  }



  render() {
    return (
        <SafeAreaView style={{flex:1, backgroundColor: '#fff'}}>
     <Header 
     navigation={this.props.navigation} />
        <View style={styles.GamesHeaderView}>
          <Text style={styles.GamesHeaderText}> About Us </Text>
          </View>
          <ImageHeaderScrollView
          showsVerticalScrollIndicator={false}
      maxHeight={200}
      minHeight={0}
      minOverlayOpacity={0}
      maxOverlayOpacity={0}
      // headerImage={require("./images/tictactoecover.png")}
      renderHeader={() => <Image style={{height:150, width:400}} source={require('../Src/images/DanzenDSLogo.png')} resizeMode='contain'/>}
      useNativeDriver={true}
      headerContainerStyle={{justifyContent: 'center', alignSelf: 'center', backgroundColor: '#1e8449',}}
     >
      <View style={{...StyleSheet.absoluteFillObject, backgroundColor:"#1e8449"}}/>

      <View style={styles.BottomContainer}>
        <View style={styles.btnsViewbottom}>

        <View style={styles.btnsCardView}>
        <TouchableOpacity onPress={()=>Linking.openURL(`https:${"helix-ph.com/"}`)}>
        <FontAwesome name='globe' style={styles.IconsView}/>
        <Text allowFontScaling={false} style={styles.IconText}>Website</Text>
        </TouchableOpacity>
        </View>

        
        <View style={styles.btnsCardView}>
        <TouchableOpacity onPress={()=>Linking.openURL(`mailto:${"talha.aftab@hakimsonsgroup.com"}`)}>
        <Feather name='mail' style={styles.IconsView}/>
        <Text allowFontScaling={false} style={styles.IconText}>E-Mail</Text>
        </TouchableOpacity>

      </View>
      <View style={styles.btnsCardView}>
        <TouchableOpacity onPress={()=>Linking.openURL(`tel:02132568257`)}>
      <Feather name='phone' style={styles.IconsView}/>
        <Text allowFontScaling={false} style={styles.IconText}>Phone</Text>
        </TouchableOpacity>
      </View>
        </View>
      
      <View style={styles.BottomPassageView}>
      <Text style={styles.BottomPassageText}>
      Danzen Plus 50mg/10mg Tablet is a combination of two medicines. It is used to reduce pain and inflammation in conditions like rheumatoid arthritis, ankylosing spondylitis, and osteoarthritis. It is also used to relieve muscle pain, back pain, toothache, or pain in the ear and throat.
Danzen Plus 50mg/10mg Tablet can be taken with or without food. The dose will depend on what you are taking it for and how well it helps your symptoms. You should take it as advised by your doctor. Do not take more or use it for a longer duration than recommended by the doctor.
The most common side effects of this medicine include nausea, vomiting, heartburn, stomach pain, indigestion, diarrhea, and loss of appetite. If any of these side effects bother you or get worse, you should speak to your doctor. Your doctor may be able to suggest ways of preventing or reducing the side effects.
Before taking it, you should let your doctor know if you have a history of ulcer or bleeding in your stomach, high blood pressure, or have any trouble with your heart, kidneys, or liver. Let your doctor also know about all the other medicines you are taking because they may affect, or be affected by, this medicine.
Pregnant or breastfeeding women should consult their doctor before starting treatment. You should also avoid drinking alcohol while you are taking this medicine, as alcohol can cause excessive drowsiness.
      </Text>


      {this.state.showItems == 1?
      <Animated.View
      useNativeDriver={true}
          style={{
            transform: [{ translateX: this.pan.x }, { translateY: this.pan.y }]
          }}
          {...this.panResponder.panHandlers}
        >
        <TouchableOpacity onPress={()=> this.setState({showItems:0})}>
          
        <View style={{height:200, width:200, backgroundColor: 'transparent',}}>
        {/* <LottieView source={require('./images/loveemoji.json')} style={{height:'100%', width:'100%'}} autoPlay /> */}
        <FastImage style={styles.imageBackground} source={backgroundImage} />

      </View>
        </TouchableOpacity>

        </Animated.View>
        :
        <TouchableOpacity onPress={()=> this.setState({showItems:1})} style={{backgroundColor:"#1e8449", borderRadius:20,width:200, height:50, justifyContent: 'center', alignItems: 'center', margin:20}}>
          <Text allowFontScaling={false} style={{color:'#fff', fontFamily:'Beatles'}}>Press Here to See Magic!!!</Text>
        </TouchableOpacity>
  }
      </View>

      <View style={{height:200}}/>

      </View>
      </ImageHeaderScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    TopContainer:{
        flex:2,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#1e8449',
    },
    BottomContainer:{
        flex:8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        borderLeftColor:'transparent',
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 6,
},
shadowOpacity: 0.39,
shadowRadius: 8.30,

elevation: 13,
    },
    box: {
      height: 150,
      width: 150,
      backgroundColor: "blue",
      borderRadius: 5
    },
    btnsViewbottom:{
      flexDirection:'row',
      // flex:1,
      justifyContent: 'center',
      
      // backgroundColor: 'red',
      margin:10,
    },
    IconsView:{
      fontSize:40,
      color:'#000',
      margin:2,
      justifyContent: 'center',
      alignSelf: 'center',
    },
    BottomPassageView:{
      width:'90%',
      // backgroundColor:'pink',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop:20,
    },
    BottomPassageText:{
      fontSize:16,
      fontFamily:'Poppins-Regular',
      textAlign:'justify'
    },
    IconText:{
      fontFamily:'Beatles',
      fontSize:14,
      color:"#000"
    },
    btnsCardView:{
      height:80,
      width:80,
      justifyContent: 'center',
      alignItems: 'center',
      margin:10,
      backgroundColor: '#fff',
      padding:10,
      borderRadius:15,
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
    HeadingView:{
      justifyContent:'center',
      alignItems:'center'
      },
      imageBackground: {
        width:200,
        height:200
      },
})

export default AboutUs;
