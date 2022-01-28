import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView,ScrollView,Image, TouchableOpacity, TextInput, FlatList, ActivityIndicator} from 'react-native';
import Header from '../Extras/Header';
import { Feather } from '../Extras/AllIcons';
import { BooksApi } from '../Extras/AllApis';
// import '#000000'ew from './PdfReader';
import Spinner from 'react-native-spinkit';

let BooksArray = [];

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ShowBooks:false,
        '#000000'erEnable:false,
        BooksArray:null
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
      const newData = BooksArray.filter((item)=>((item.Name).toLowerCase()).startsWith((keyword).toLowerCase()));
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
      const {BooksArray} = this.state;
    return (
      <SafeAreaView style={styles.Main}>
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
                  keyboardShouldPersistTaps={'always'}
                  numColumns={2}
                       maxToRenderPerBatch={250}
                       removeClippedSubviews={true}
                       initialNumToRender={30}
                       data={BooksArray}
                       renderItem={({item, index}) =>
                        (
                        <>
                        <ScrollView>

                    <TouchableOpacity onPress={()=> {
                         this.props.navigation.push(''#000000'ew',{PdfCover:item.PdfURL})
                    }}>
                <View style={styles.BooksCardItems}>
                <Image source={{uri: item.CoverImageURL}} style={styles.Image} resizeMode='stretch' />
                </View>
                </TouchableOpacity>

                </ScrollView>
                </>
                        )}/>
                        :
                        <View style={{flex:1, zIndex:99, justifyContent: 'center', alignItems:'center'}}>
                        <Spinner size={50} type={"ChasingDots"} color={'#1e8449'}/>
                        </View>
  }
                 </View>
                
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
        fontFamily:'andlso',
        fontSize:30,
        color:'#000'
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
        height:220,
        width:160,
    backgroundColor: '#fff',
    borderRadius:15,
    margin:8,
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
    }
})

export default Books;
