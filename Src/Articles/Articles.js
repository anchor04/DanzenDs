import React, { Component } from 'react';
import { View, Text, PermissionsAndroid, Image, TextInput, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Header  from '../Extras/Header';
import RNFetchBlob from 'rn-fetch-blob';
import {Feather} from '../Extras/AllIcons';
import {getArticles} from '../Extras/AllApis'
import Spinner from 'react-native-spinkit';
import LinearGradient from 'react-native-linear-gradient';




class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PdfCover:null,
      Arraymap:null,
      Loader:true,
      Searchedarticles:null
    };
  }

  FilterData(keyword){
    let {Arraymap} = this.state;
    if(keyword.length > 4){
      const newData = Arraymap.filter((item)=>((item.Title).toLowerCase()).includes((keyword).toLowerCase()));
      this.setState({
        Arraymap:newData
        });
    }
    else if(keyword.length <= 1){
      this.getArticles()
    }
    else{
     console.log('No Articles Found!')
    }
  }


  getArticles(){
    fetch(`${getArticles}`, {
      method:'GET',
      headers:{
      Accept:'application/json'
    }})
    .then((res)=>res.json())
    .then((json)=>{

      let {Code, Message, Data} = json;
      // alert(JSON.stringify(json))
      if(Code == '00'){
        this.setState({Arraymap:Data});
        this.setState({Loader:false})
      }
      else{
        this.setState({Loader:false})
      }
  })
}


  componentDidMount(){
    this.getArticles()


  }



  render() {
    return (
      <SafeAreaView style={{flex:1, backgroundColor: '#fff',}}>
      <Header 
          navigation={this.props.navigation}
          />
      <View style={styles.RewardsHeaderView}>
        <Text style={styles.ArticlesHeaderText}> Articles </Text>
        </View>

        <View style={styles.SearchbardView}>
                 <View style={styles.Searchicon}>
                <Feather name='search' size={18} color="#B6BDC9" />
                </View>
                <View style={styles.searchbarText}>
                 <TextInput style={styles.searchbarText} 
                    value={this.state.Searchedarticles}
                    placeholder='type here to Search'
                    placeholderTextColor='#b3b4b5'
                    onChangeText={(text)=> this.FilterData(text)}/>
                </View>

             </View>
        {this.state.Loader ==false?
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.MainContainer}>
          {this.state.Arraymap != null?
          this.state.Arraymap.map(val=>{
        
            return(
              <>

        <View style={styles.NewsView}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0c0c0b','#1e8449' ,'#1e8449']} style={styles.linearGradient}>


        <View style={styles.ArticlesTextHeaderView}>
        <Text numberOfLines={4} style={styles.ArticlesTextHeader}> 
          {val.Title}
          </Text>
          </View>
        <View style={styles.ArticlesTextView}>
          <Text numberOfLines={1} style={styles.ArticlesText}> 
          {val.Description}
          </Text>
      </View>
      <View style={{flexDirection:'row', flex:1}}>
      <View style={{flex:6,backgroundColor: 'transparent'}}>
      </View>
      <View style={{flex:4, margin:4, borderRadius:5, justifyContent: 'center',alignItems: 'center', alignSelf: 'center', alignContent: 'center'}}>
      <TouchableOpacity onPress={()=> {
        this.props.navigation.push('PDFViewarticles',{PdfCover:val.PdfURL})
      }}>
      <Text style={{paddingHorizontal:2, alignSelf:'flex-end', color:'#fff', textDecorationLine: 'underline', fontFamily:'Poppins-Bold'}}>Read this Article</Text>
      </TouchableOpacity>
      </View>

    
      </View>

      </LinearGradient>

      </View>

              </>
            )
          })
          :
           null
        } 
      </View>
    
      </ScrollView>
      :
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
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
ArticlesHeaderText:{
    fontFamily:'Helvetica-Bold',
    fontSize:30,
    color:'#000'
},
MainContainer:{
    marginTop:20,
  justifyContent: 'center',
  alignItems:'center',
},
NewsView:{
  margin:5,
  // flexDirection:'row',
  // justifyContent: 'flex-start',
  width:'90%',
  borderRadius:5,
  borderWidth:1,
  // borderColor:'#ceaf00',
},
ArticlesText:{
  fontFamily:'Poppins-Medium',
  fontSize:12,
  color:'#fff'
},
ArticlesTextView:{
  marginVertical:2,
  // margin:5,
  padding:5,
  // flex:10,
  width:'75%',
  justifyContent: 'center',
  alignSelf: 'center',
},
ArticlesTextHeader:{
  fontFamily:'Poppins-Medium',
  fontSize:16,
  color:'#fff'

},
ArticlesTextHeaderView:{
  marginVertical:2,
  margin:5,
  padding:5,
  flex:1,


},
SearchbardView:{
  height:40,
  width:'90%',
  backgroundColor: '#1e8449',
  borderRadius:20,
  justifyContent: 'center',
  alignItems: 'flex-start',
  alignSelf:'center',
  marginTop:15,
  flexDirection:'row'
},
Searchicon:{
  flex:1,
  marginLeft:5,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf:'center',
  alignContent: 'center',
  backgroundColor: 'transparent',
  
},
searchbarText:{
  flex:9,
  backgroundColor: 'transparent',
  color:"#fff",
  placeholderTextColor:"#fff"
},
linearGradient:{
  // borderRadius:5,
}

})

export default Articles;
