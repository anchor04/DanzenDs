import React, { Component } from 'react';
import { View,Dimensions,TouchableOpacity, Text, Image, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import Header  from './Extras/Header';
import {GetNews} from './Extras/AllApis'
import Spinner from 'react-native-spinkit';
const {width} = Dimensions.get('window')


let NewsArray = []

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Loader:true
    };
  }

  GetNewsFn(){
      fetch(`${GetNews}`,{
        method:'GET',
        headers:{
        Accept:'application/json'
      }})
      .then((res)=>res.json())
      .then((json)=>{
        let {Message, Code, Data} = json
        // alert(Code)
        if(Code == '00'){
  
          // alert(JSON.stringify(Data))
          NewsArray = Data
  
        this.setState({Loader:false})
        }
        else
        {
        this.setState({Loader:false})
          alert(Message)
        }
    })
  
  }

  componentDidMount(){
    this.GetNewsFn()
  }

  render() {
    return (
      <SafeAreaView style={{flex:1, backgroundColor: "#fff",}}>
      <Header 
          navigation={this.props.navigation}
          />
      <View style={styles.BooksHeaderView}>
        <Text style={styles.BooksHeaderText}> News </Text>
        </View>
      { this.state.Loader == false?
      
      <ScrollView>
      <View style={styles.MainContainer}>
          {NewsArray.map(val=>{
            console.log(val.Image)
            console.log("val.Image")
            return(
              <>
          <TouchableOpacity onPress={()=> this.props.navigation.navigate('NewsReadScreen', {htmlContent:val.Html})}>

        <View style={styles.NewsView}>
        <View style={{flex:3}}>
        <View style={styles.newstextHeaderView}>
        <Text style={styles.newstextHeader}> 
          {val.Title}
          </Text>
          </View>
        <View style={styles.newstextView}>
          <Text style={styles.newstext}> 
          {val.Description}
          </Text>
      </View>
      </View>
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center', }}>
        <View style={{ borderRadius:100, backgroundColor: "#fff",}}>
      <Image source={{uri:val.ThumbnailImageUrl}} style={styles.Image} resizeMode='contain'/>
      </View>
      </View>
      </View>
      </TouchableOpacity>

              </>
            )
          })} 
      </View>
      </ScrollView>
      :
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
<Spinner size={50} type={"ChasingDots"} color={'#1e8449'}/> 
    </View>
  }
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
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
MainContainer:{
  // justifyContent: 'center',
  // alignItems:'center',
  marginTop:10,
  width:width, 
  justifyContent: 'center',
  alignItems: 'center',
  // backgroundColor: 'red',
},
NewsView:{
  flexDirection:'row',
  width:'90%',
  backgroundColor: '#1e8449',
  justifyContent: 'center',
  borderRadius:10,
  // padding:10,
  alignItems: 'center',
  // margin:10
  height:100,

},
Image:{
  height:80, 
  width:80, 
  borderRadius:100
},
newstext:{
  fontFamily:'Poppins-Regular',
  fontSize:14,
  color:'#fff'
},
newstextView:{
  marginVertical:2,
  margin:5,
  // width:'90%',
},
newstextHeader:{
  fontFamily:'Poppins-Bold',
  fontSize:18,
  color:'#fff'

},
newstextHeaderView:{
  marginVertical:2,
  margin:5,
  // width:'90%',

}
})

export default News;
