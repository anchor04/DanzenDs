import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, SafeAreaView, Image, TextInput,TouchableOpacity, ScrollView } from 'react-native';
import Header from './Extras/Header';
const {height, width} = Dimensions.get('window');
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { getProfileDetails, UpdateProfileForDoctors, fetch_url_encoded } from './Extras/AllApis'
import { urlencoded } from 'express';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-spinkit';


const encodeFormData = (data) => {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
}

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        HeaderName:null,
        UserTypeId:2,
        Name:null, 
        PhoneNumber:null, 
        Email:null, 
        ClinicName:null, 
        City:null, 
        Speciality:null, 
        Password:null,
        Loader:true
    };
  }

  

  componentDidMount(){
    // alert(JSON.stringify(this.props.route.params.UserId))
    
    let UserId = JSON.parse(this.props.route.params.UserId);
    this.setState({UserId})
    let UserName = this.props.route.params.UserName;
    this.setState({UserName})
    let HeaderName = this.props.route.params.Header;
    this.setState({HeaderName})
    // this.setState({Loader:true})

    this.getProfileDetails(this.state.UserTypeId,UserId)
  }

  updateProfile(userId){
    let params = {
    Id:userId,
    Name:this.state.Name,
    Email:this.state.Email,
    ClinicName:this.state.ClinicName,
    }
    var param123 = encodeFormData(params)
    fetch(`${UpdateProfileForDoctors}`,{
      method:'PUT',
        headers:{
          Accept: 'application/json',
          'Content-Type':'application/x-www-form-urlencoded'
        },
        body: param123
      })
      .then((response) => response.json())
      .then((responseJson) => {
        let {Code, Message} = responseJson;
        if (Code == '00'){
          this.getProfileDetails(this.state.UserTypeId,userId);
        }
        else{
          alert(Message)
        }
      })
  }

  getProfileDetails(UserTypeId,UserId){
    // alert(UserTypeId)
    // alert(UserId)
    // fetch(`${getProfileDetails}?UserTypeId=${this.state.UserTypeId}&Id=${this.state.UserId}`,{
      fetch(`${getProfileDetails}?UserTypeId=${UserTypeId}&Id=${UserId}`,{
      method:'GET',
      headers:{
      Accept:'application/json'
    }})
    .then((res)=>res.json())
    .then((json)=>{
      let {Message, Code, Data} = json
      // alert(Code)
      if(Code == '00'){

      this.setState({Name:Data[0].Name});
      this.setState({PhoneNumber:Data[0].PhoneNumber});
      this.setState({Email: Data[0].Email})
      this.setState({ClinicName: Data[0].ClinicName})
      this.setState({City:Data[0].CityName})
      this.setState({Speciality: Data[0].SpecialityName})
      this.setState({Password: Data[0].Password})

      this.setState({Loader:false})
      }
      else
      {
      this.setState({Loader:false})
        alert(Message)
      }
  })
}
  

  render() {
    const { Name, PhoneNumber, Email, ClinicName, City, Speciality, Password } = this.state;

    console.log(Name)
    console.log("NamefromProfile")
    return (
      <SafeAreaView style={styles.SafeAreaView}>
          <Header 
          navigation={this.props.navigation}
          Header={this.state.HeaderName} />
             <View style={styles.ProfileHeaderView}>
        <Text style={styles.ProfileHeaderText}> Profile </Text>
        </View>
        <View style={styles.TopContainer}>
            <View style={styles.ImageView}>
<FastImage
style={{ height:150,width:150}}
source={{
    // uri: 'https://i.ibb.co/vzYKfg7/trans.gif',
  uri: 'https://i.ibb.co/SJ3KYs2/5-min.gif',

    priority: FastImage.priority.normal,
}}
resizeMode={FastImage.resizeMode.contain}
/>
            </View>
            </View>         

          {this.state.Loader == false?
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.BottomContainer}>
            <View style={styles.UserLoginNameView}>
            <Text style={styles.FieldsPlaceHolder}>
            Your Name
            </Text>
            </View>
            <View style={styles.TextinputView}>
            <TextInput 
            placeholder={Name}
            placeholderTextColor='#000'
            value={Name}
            onChangeText={(text)=> this.setState({Name:text})}
            style={styles.TextiNputeditable}
            />
            </View>
            <View style={styles.UserLoginNameView}>
            <Text style={styles.FieldsPlaceHolder}>
            Your Phone Number
            </Text>
            </View>
            <View style={styles.TextinputView}>

            <TextInput placeholder={PhoneNumber}
            editable={false}
            placeholderTextColor='#000'
            onChangeText={(text)=> this.setState({PhoneNumber:text})}
            style={styles.TextiNputuneditable}
            />
            </View>

            <View style={styles.UserLoginNameView}>
            <Text style={styles.FieldsPlaceHolder}>
            Your Email
            </Text>
            </View>
            <View style={styles.TextinputView}>

            <TextInput 
            placeholder={Email}
            value={Email}
            placeholderTextColor='#000'
            style={styles.TextiNputeditable}
            onChangeText={(text)=> this.setState({Email:text})}
            
            />
            </View>

            <View style={styles.UserLoginNameView}>
            <Text style={styles.FieldsPlaceHolder}>
            Your Clinic Name
            </Text>
            </View>
            <View style={styles.TextinputView}>

            <TextInput placeholder={ClinicName}
            placeholderTextColor='#000'
            value={ClinicName}
            style={styles.TextiNputeditable}
            onChangeText={(text)=> this.setState({ClinicName:text})}
            />
            </View>

            <View style={styles.UserLoginNameView}>
            <Text style={styles.FieldsPlaceHolder}>
            Your City
            </Text>
            </View>
            <View style={styles.TextinputView}>

            <TextInput placeholder={City}
            editable={false}
            placeholderTextColor='#000'
            style={styles.TextiNputuneditable}
            onChangeText={(text)=> this.setState({City:text})}
            
            />
            </View>

<View style={styles.UserLoginNameView}>
            <Text style={styles.FieldsPlaceHolder}>
            Your Speciality
            </Text>
            </View>
            <View style={styles.TextinputView}>

            <TextInput 
            editable={false}
            placeholder={Speciality}
            placeholderTextColor='#000'
            style={styles.TextiNputuneditable}
            onChangeText={(text)=> this.setState({Speciality:text})}
            />
            </View>

               <View style={styles.UserLoginNameView}>
            <Text style={styles.FieldsPlaceHolder}>
            Your Password
            </Text>
            </View>
            <View style={styles.TextinputView}>
            <TextInput 
            value={Password}
            placeholder={Password}
            placeholderTextColor='#000'
            style={styles.TextiNputeditable}
            secureTextEntry={true}
            onChangeText={(text)=> this.setState({Password:text})}
            />
            </View>
            

            <View style={styles.BottomSaveBtn}>
            <TouchableOpacity style={styles.BottomSaveBtnTouch} onPress={()=> {this.updateProfile(this.state.UserId), this.setState({Loader:true})}} >
              <Text style={styles.BottomSaveBtnText}>
                Save
              </Text>
            </TouchableOpacity>
            </View>

            </View>
        
            <View style={{height:height*0.5}}/>
          

            </ScrollView>
            :
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
              {/* <ActivityIndicator size={25} color="#000" /> */}
<Spinner size={50} type={"ChasingDots"} color={'#1e8449'}/> 

            </View>
            }
      </SafeAreaView>
    )  
}
}

function mapStateToProps(state){
    return{
      store: state
    }
  }

  function mapDispatchToProps(dispatch){
    return{
      updateRideDetails:(state)=>dispatch({type:'UpdateRideDetails', state:state}),
    }
  }

  
export default connect(mapStateToProps,mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
    SafeAreaView:{
        flex:1,
        backgroundColor: '#F7F7FB',
    },
    ProfileHeaderView:{
      justifyContent: 'center',
      alignItems: 'flex-start',
      // backgroundColor: 'pink',
      height:40,
      marginLeft:20,
      marginTop:20
  },
  ProfileHeaderText:{
    fontFamily:'andlso',
    fontSize:30,
    color:'#000'
},
    TextiNputeditable:{ 
      margin:5, 
      marginTop:1,
      padding:10, 
      marginHorizontal:20, 
      borderRadius:2, 
      borderWidth:0.2, 
      borderColor:'#000',
      backgroundColor:'#fff'
  },
  TextiNputuneditable:{
    margin:5, 
    marginTop:1,
    padding:10, 
    marginHorizontal:20, 
    borderRadius:2, 
    borderWidth:0.2, 
    borderColor:'#000',
    backgroundColor:'#adadad'
  },
  BottomSaveBtn:{
    marginTop:15,
    height:50,
    width:'80%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems:'center',
    backgroundColor: '#1e8449',
    borderRadius:15
  },
  BottomSaveBtnTouch:{
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: "red",
    width:'100%',
    height:'100%'
  },
  BottomSaveBtnText:{
    fontFamily:'Poppins-Medium',
    fontSize:24,
    color:'#fff'
  },
    TopContainer:{
    height: height*0.20,
    // backgroundColor: "pink",
    },
    ImageView:{
        // marginTop:'10%',
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: 'transparent',
    },
    UserNameView:{
    justifyContent: 'center',
    alignItems:'center',
    margin:10,
    marginBottom:1
    },
    UserNameText:{
        fontFamily:'Poppins-Bold',
        fontSize:20,
        color:"#000"
    },
    UserLoginNameView:{
        // justifyContent: 'center',
        alignItems:'flex-start',
        // margin:10,
        padding:5,
        margin:5,
        marginTop:20,
        marginLeft:15,
        // backgroundColor: 'red',
    },
    FieldsPlaceHolder:{
        fontFamily:'Poppins-light',
        fontSize:14,
        color:"#145a32"
    },
    BottomContainer:{
      height:height*1,
      // backgroundColor: 'red',
    },
    TextinputView:{
      // flex:1,
      // padding:5,
    }
})



