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
    ImageBackground,
    Image,
    Platform,
    AsyncStorage,
    Dimensions
  } from 'react-native';
  import VideoPlayer from 'react-native-video-player';
  import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import YoutubePlayer from "react-native-youtube-iframe";
  const {height, width} = Dimensions.get('window')

  const IS_IOS = Platform.OS === 'ios';
  const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');


  function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}


const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;



export class MyCarousel extends React.Component {
    constructor(props){
    super(props)
    this.state = {
    carouselplay:true
    }

    }
    componentDidMount(){
        this.carouselnext.stopAutoplay()

        // let Addon = {
        //     title:'Video',
        //     illustration: require('../Src/images/Dashboardicons/news.png')
        // }
        // ImagesArray = ImagesArray;
        // ImagesArray.push(Addon)
    }
    _renderItem = ({item, index}, parallaxProps) => {

        
        // alert(JSON.stringify(item))
        if(item.VideoUrl == 'null'){
        return (
            <>
            <View style={styles.slide}>
                   <Image
              source={{uri: item.src}}
              style={styles.image}
              
            />

                <ParallaxImage
                source={{uri:item.src}}
                containerStyle={styles.imageContainer}
                style={styles.image}
                parallaxFactor={0.4}
                {...parallaxProps}
                />
              

            </View>
           
            </>
        )}
        else{
            return(
            // <TouchableOpacity onPress={()=> {this.props.Parent.setState({VideoModalVisible:true})}} style={styles.slide}>
       <VideoPlayer
        video={{ uri: item.VideoUrl }}
        // video={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}}
        videoWidth={200}
        videoHeight={100}
        thumbnail={{ uri: item.src }}
        // thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg'  }}
        autoplayDelay={10}
        onPlayPress={()=> {this.carouselnext.stopAutoplay()}}
        // disableSeek
        showDuration={true}
        onStart={()=> {this.carouselnext.stopAutoplay()}}
        onEnd={()=> { this.carouselnext.snapToNext(),
         setTimeout(() => {
            this.carouselnext.startAutoplay()
        }, 1000) }}
        // hideControlsOnStart
        // onStart={()=> this.setState({carouselplay:false})}
        // onEnd={()=> this.setState({carouselplay:true})}
        
    />

             

            // </TouchableOpacity>
            )
        }
    }

    render () {
       const { ImagesArray } = this.props;
        return (
            <>
                <View style={{marginTop:'7%', flex:1}}>
            {/* <Carousel
            // autoplay={this.state.carouselplay}
            // layout={'tinder'}
            //   ref={(c) => { this._carousel = c; }}
              data={ImagesArray}
              renderItem={this._renderItem}
              loop={true}
            //   sliderWidth={width-1}
            //   itemWidth={width-1}
            sliderWidth={sliderWidth-1}
            itemWidth={itemWidth-1}
            itemHeight={100}
            sliderHeight={100}
            hasParallaxImages={true}
            /> */}
            <Carousel
                ref={(c) => { this.carouselnext = c; }}
                autoplay
                sliderWidth={width-1}
                sliderHeight={height-1}
                itemWidth={slideWidth+70}
                itemHeight={slideHeight-500}
                data={ImagesArray}
                renderItem={this._renderItem}
                hasParallaxImages={true}
                loop
                />

 


            </View>

</>
        );
    }
}

const styles = StyleSheet.create({
    title:{
        fontSize:18,
        color:"#fff",
        margin:10,
    },
    // slide:{
    //     justifyContent:'center',
    //     alignContent:'center',
    //     alignItems:'center',
    //     flex:1
    // },
    // image:{
    //     height:200,
    //     width:350,
    //     borderRadius:10
    // },
    slideInnerContainer: {
        width: itemWidth,
        height: slideHeight,
        paddingHorizontal: itemHorizontalMargin,
        paddingBottom: 18 // needed for shadow
    },
    shadow: {
        position: 'absolute',
        top: 0,
        left: itemHorizontalMargin,
        right: itemHorizontalMargin,
        bottom: 18,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        borderRadius: entryBorderRadius
    },
    imageContainer: {
        flex: 1,
        marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    imageContainerEven: {
        backgroundColor: "#000"
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        height:200,
        // width:350,
        resizeMode: 'stretch',
        borderRadius: IS_IOS ? entryBorderRadius : 0,
        borderRadius: 5,
        marginBottom:entryBorderRadius,
        // borderTopRightRadius: 20
    },
    // image's border radius is buggy on iOS; let's hack it!
    radiusMask: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: entryBorderRadius,
        backgroundColor: 'white'
    },
    radiusMaskEven: {
        backgroundColor: "#000"
    },
    textContainer: {
        justifyContent: 'center',
        paddingTop: 20 - entryBorderRadius,
        paddingBottom: 20,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
    textContainerEven: {
        backgroundColor: "#000"
    },
    title: {
        color: "#000",
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 0.5
    },
    titleEven: {
        color: 'white'
    },
    subtitle: {
        marginTop: 6,
        color: "gray",
        fontSize: 12,
        fontStyle: 'italic'
    },
    subtitleEven: {
        color: 'rgba(255, 255, 255, 0.7)'
    }
})