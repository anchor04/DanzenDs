import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView,ScrollView,Image, TouchableOpacity, TextInput, FlatList, ActivityIndicator} from 'react-native';
import Header from '../Extras/Header';
import { AntDesign, Feather } from '../Extras/AllIcons';
import { BooksApi } from '../Extras/AllApis';
// import PDFViewew from './PdfReader';
import Spinner from 'react-native-spinkit';
import LinearGradient from 'react-native-linear-gradient';


let BooksArray = [];

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ShowBooks:false,
        PDFViewerEnable:false,
        BooksArray:null,
        CurrentScroll:0
    };
  }

  componentDidMount(){
    let HeaderName = this.props.route.params.Header;
    this.setState({HeaderName})

    this.getBooksAPI();
  }

  componentWillUnmount(){
  }


  FilterData(keyword){
      let {BooksArray} = this.state;
    if(keyword.length > 4){
      const newData = BooksArray.filter((item)=>((item.Name).toLowerCase()).includes((keyword).toLowerCase()));
    //   setTimeout(() => {
    //       alert(JSON.stringify(newData))
    //   }, 1000);
      this.setState({BooksArray:newData})
    }
    else if(keyword.length <= 1){
      this.getBooksAPI()
    }
    else{
     console.log('No Books Found!')
    }
  }


  getBooksAPI(){
      fetch(`${BooksApi}`, {
          method:'GET',
          headers:{
          Accept:'application/json'
        }})
        .then((res)=>res.json())
        .then((json)=>{
            let {Code, Message, Data} = json;
            // alert(Code)
            // alert(JSON.stringify(Code))
            if(Code == '00'){
                // BooksArray = [];
                // Data.map((val)=> {
                //     var object = {label: val.Name, value: val._id, imageCover:val.CoverImageURL, PdfURL:val.PdfURL}
                //     BooksArray.push(object)
                this.setState({BooksArray:Data})
                // })

                this.setState({ShowBooks:true})
            }
            else{
                alert(Message)
                this.setState({ShowBooks:true})

            }
      })
  }

  render() {
      const {BooksArray, CurrentScroll} = this.state;
    return (
      <SafeAreaView style={styles.Main}>
            <LinearGradient colors={['#27ae60', '#1e8449','#1e8449','#145a32']} style={styles.linearGradient}>

          <Header
            navigation={this.props.navigation}
            Header={this.state.HeaderName}
             />

        <View style={styles.BooksHeaderView}>
        <Text style={styles.BooksHeaderText}> Books </Text>
        </View>
             <View style={styles.SearchbardView}>
                 <View style={styles.Searchicon}>
                <Feather name='search' size={18} color="#B6BDC9" />
                </View>
                <View style={styles.searchbarText}>
                 <TextInput style={styles.searchbarText} 
                    placeholder='type here to Search'
                    placeholderTextColor='#b3b4b5'
                    onChangeText={(text)=> this.FilterData(text)}
                    />
                </View>

             </View>
             
                 <View style={styles.BooksCardView}>
                
                    {this.state.ShowBooks == true?

                   
                 <FlatList
                //  ref={listRef}
                 ref={(ref) => { this.listRef = ref; }}
                  keyboardShouldPersistTaps={'always'}
                  numColumns={2}
                       maxToRenderPerBatch={250}
                       removeClippedSubviews={true}
                       initialNumToRender={30}
                       data={BooksArray}
                       onScroll={({nativeEvent}) => { 
                        this.setState({CurrentScroll:nativeEvent.contentOffset.y})
                      console.log("nativeEvent")}}
                       renderItem={({item, index}) =>     
                       (
                        <>



                        <View styles={[StyleSheet.absoluteFillObject,{justifyContent: 'center',alignItems: 'center', alignSelf: 'center', alignContent: 'center',}]}>
                
                        <Image
                        key={`image-${index}`}
                        source={{uri:item.CoverImageURL}}
                       style={[StyleSheet.absoluteFillObject,{
                       height:240,
                       width:180,
                      }]}
                      resizeMode='cover'
                       blurRadius={50} />
                </View>


                    <TouchableOpacity onPress={()=> {
                         this.props.navigation.push('PDFViewew',{PdfCover:item.PdfURL})
                    }}>
                <View style={styles.BooksCardItems}>
                <Image source={{uri: item.CoverImageURL}} style={styles.Image} resizeMode='stretch' />
                </View>
                </TouchableOpacity>


                </>
                        )}/>

                        :
                        <View style={{flex:1, zIndex:99, justifyContent: 'center', alignItems:'center',}}>
                        <Spinner size={50} type={"ChasingDots"} color={'#fff'}/>
                        </View>
                        
  }
  
                 </View>

                 {CurrentScroll != 0?
                 <>
                 <View style={styles.scrollTopButtonView}>
                 <TouchableOpacity
                 containerStyle={styles.scrollTopButton} 
                 onPress={() => {
                   this.listRef.scrollToOffset({ y: 0, animated: true });
                  // alert(1)
                 }}
               >
                 <AntDesign  name='totop' color={'#fff'} size={30}/> 
               </TouchableOpacity>
               </View>
               </>
                :
                null
                }
                 </LinearGradient>
                
      </SafeAreaView>
    );
  }
}

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
        color:'#000',
        // fontWeight:'600'
    },
    SearchbardView:{
        height:40,
        width:'90%',
        backgroundColor: '#edf2f4',
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
    },
    BooksCardView:{
        flex:1,
        marginTop:10,
        // marginLeft:10,
    flexDirection:'row',
    // flexWrap:'wrap',
    width:'90%',
    alignSelf: 'center',
    justifyContent: 'center',
    },
    
    BooksItemsRatings:{
    position:'absolute',
    backgroundColor: "#fff",
    borderRadius:20,
    width:60,
    height:25,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    margin:5,
    marginTop:10,
    right:2,
    // left:2
    },
    BooksCardItems:{
        height:200,
        width:150,
    backgroundColor: '#fff',
    borderRadius:15,
    // margin:20,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 4,
},
shadowOpacity: 0.30,
shadowRadius: 4.65,

elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
    // zIndex: 10,
    },
    Image:{
        height:"100%",
        width:"100%",
        borderRadius:5,
    },
    linearGradient: {
      flex: 1,
    },
    scrollTopButton: {
      // position: 'rela',
      alignItems:'flex-end',
      height:60,
      justifyContent: 'flex-end',
      alignSelf: 'flex-end',
    },
    scrollTopButtonView: {
    //  backgroundColor: 'lightgreen',
    //  borderRadius:50,
    //  alignItems:'center',
    //  width:80,
    //  height:'10%',
    //  justifyContent: 'center',
    //  alignSelf: 'flex-end',

    position: 'absolute',
    right:40,
    bottom:20,
    backgroundColor: '#1e8449',
    borderRadius:50,
    width:75,
    height:'10%',
    justifyContent: 'center',
    alignItems: 'center',
    }
})

export default Books;
