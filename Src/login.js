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
    TextInput,
    Image,
    ImageBackground,
    ActivityIndicator,
    AsyncStorage,
    Keyboard,
    Dimensions,
    Modal
  } from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import Pdf from 'react-native-pdf';
import LinearGradient from 'react-native-linear-gradient';
import encodeFormData, {SignUpApi, LoginApi, GetCities, GetSpecialities, forgetPw} from './Extras/AllApis';
import CustomCitiesScreen from './CitiesDropDownFinal';
import SpecialitiesScreen from './SpecialitiesDropDownFinal';
import {AntDesign, Entypo, FontAwesome} from './Extras/AllIcons';
import { CheckBox } from 'react-native-elements';
const {height, width} = Dimensions.get('window');
import Spinner from 'react-native-spinkit';


let UserPolicy = 'http://192.251.198.43:3000/static/Danzen-DS-Mobile-Application-End-User-Licensee-Agreement.pdf';
let CitiesList = [];
let Specialieties = [];

  class login extends React.Component{
    constructor(props){
        super(props);
      this.setModalVisible = this.setModalVisible.bind(this),
        this.state = {
          CreateNewAccount:0, 
          ForgetPassword:0,
          forgotpinEnable:0,
          username:'',
          MobileNumber:"",
          email:'',
          password:"",
          clinicname:'',
          SelectedCityId:0,
          SelectedSpecialityId:0,
          forgettextPrinted:null,
          SelectedSpecialityName:'',
          SelectedCityName:'',
          hideImage:false,
          Loader:false,
          isSelected:false,
          CodeUnsuccessful:0
        };
    }

     setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
      }

      forgetpwAPI(phone){
        // alert(phone)
        fetch(`${forgetPw}?PhoneNumber=${phone}`, {
          method:'GET',
        headers:{
          Accept: 'application/json',
          'Content-Type':'application/x-www-form-urlencoded'
        },
      })
      .then((response) => response.json())
    .then((responseJson) =>  {
    
    let { Message, Code } = responseJson
    // alert(JSON.stringify(Message))

    if (Code == '00'){
      this.setState({forgotpinEnable:0, forgettextPrinted:Message, CodeUnsuccessful:0})

      setTimeout(() => {
        this.setState({CreateNewAccount:0,ForgetPassword:0})
      }, 2000);

    }
    else{
      // alert(1)
      this.setState({forgotpinEnable:0, forgettextPrinted:Message, CodeUnsuccessful:1 })
      
    }
    })
      }

    async LoginforDoctor(phone, pass){
        this.setState({hideImage:false})

      const Params = {
        PhoneNumber:phone,
        Password: pass
      }
    const body = encodeFormData(Params);
    console.log(body)

      fetch(`${LoginApi}`, {
        method:'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type':'application/x-www-form-urlencoded'
      },
      body: body
    })
    .then((response) => response.json())
    .then(async(responseJson) =>  {
    console.log(body)
    console.log("ALASora")
    console.log(responseJson)
    
    var responseJson = responseJson;
    if(responseJson.Code == '00'){
    
          let UserId = responseJson.Data.Id;
          let Username = responseJson.Data.Name;
            await AsyncStorage.setItem('UserId', JSON.stringify(UserId))
            await AsyncStorage.setItem('Username', JSON.stringify(Username))
          this.props.navigation.push('Dashboard', {User:this.state.username})
          this.setState({Loader:false})

    }
    else{
      // this.props.navigation.push('Dashboard', {User:this.state.username})

this.setState({Loader:false})
      alert(responseJson.Message)
    }
  })
}


 GetCitiesArray = () => {
  fetch(`${GetCities}`, {
      method:'GET',
      headers:{
      Accept:'application/json'
    }})
    .then((res)=>res.json())
    .then((json)=>{

    //   let {Result} = ;
      let {Code, Message, Data} = json;
      if(Code == '00'){
        CitiesList = [];
        if(Data != null){
        Data.map((val)=>{
        var object = {label: val.Name, value: val._id}
        CitiesList.push(object);
        })
      }
      else{
        alert(Message)
      }
}
})
}

GetSpecialiesArray = () => {
  fetch(`${GetSpecialities}`, {
      method:'GET',
      headers:{
      Accept:'application/json'
    }})
    .then((res)=>res.json())
    .then((json)=>{

    //   let {Result} = ;
      let {Code, Message, Data} = json;
      if(Code == '00'){
        Specialieties = [];
        if(Data != null){
        Data.map((val)=>{
        var object = {label: val.Name, value: val._id}
        Specialieties.push(object);
        })
      }
      else{
        alert(Message)
      }
}
})
}

    SignUpForDoctor(){
      this.setState({hideImage:false})
    
      const Params = {
        Name: this.state.username,
        PhoneNumber:this.state.MobileNumber,
        Email: this.state.email,
        ClinicName: this.state.clinicname,
        CityId: this.state.SelectedCityId,
        SpecialityId: this.state.SelectedSpecialityId,
        Password: this.state.Password
      }
    const body = encodeFormData(Params);
    console.log(body)

      fetch(`${SignUpApi}`, {
        method:'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type':'application/x-www-form-urlencoded'
      },
      body: body
    })
    .then((response) => response.json())
    .then((responseJson) => {
    console.log(body)
    console.log("ALASora")
    console.log(responseJson)
    
    var responseJson = responseJson;
    if(responseJson.Code == '00'){
      // AsyncStorage.setItem('username', {User:this.state.username})
      this.props.navigation.push('Dashboard', {User:JSON.stringify(this.state.username)});
this.setState({Loader:false})

    }
    else{
      alert(responseJson.Message)
this.setState({Loader:false})

    }
      })
    }


async  componentDidMount() {

 
      await AsyncStorage.removeItem('UserName')
      // alert(JSON.stringify(this.props.store))
   
        let savedUserId = await AsyncStorage.getItem('UserId')

      
        if(savedUserId != null){
        this.props.navigation.push('Dashboard', {User:this.state.username})
        this.setState({Loader:false})
        }
       
        this.GetCitiesArray();
        this.GetSpecialiesArray();
      }

      componentWillUnmount() {

      }
    

    render(){
        const{
            gifLoading
        } = this.state;
 const source = { uri: UserPolicy, cache: true };

        return(
            // <SafeAreaView style={{flex:1, backgroundColor:'#2F7433', later wala(2B6932)}}>
            <SafeAreaView style={{flex:1, backgroundColor:'transparent'}}>
            {/* <ImageBackground source={require('../Src/images/BG.png')} resizeMode='cover' style={{ justifyContent:'center', flex:1}} > */}
            <LinearGradient colors={['#27ae60', '#1e8449','#1e8449','#145a32']} style={styles.linearGradient}>

            {this.state.hideImage == false?
            <View style={styles.TopContainer}>

            <View style={styles.HeadingView}>
                <Image style={{height:200, width:300}} source={require('../Src/images/DanzenDSLogo.png')} resizeMode='contain'/>
            </View>
            </View>
            :
            null
            }
            <View style={styles.MiddleContainer}>
            <View style={styles.HeadingView}>
            {/* <LottieView source={require('../Src/images/animation.json')}  style={{height:400, width:300 }}  autoPlay loop/> */}
            {/* <Image source={require('../Src/images/trans.gif')}  style={{height:450,width:450}} resizeMode="contain"   /> */}
            {!gifLoading?
              <FastImage
              style={{ height:200,width:200}}
              source={{
                //   uri: 'https://i.ibb.co/vzYKfg7/trans.gif',
                  uri: 'https://i.ibb.co/SJ3KYs2/5-min.gif',
                //   uri:'https://i.ibb.co/dpxGSZh/new.gif',
                  priority: FastImage.priority.high,
                  cache: FastImage.cacheControl.immutable
              }}
              resizeMode={FastImage.resizeMode.contain}
              onLoadEnd={()=>this.setState({gifLoading:false})}
          />:
          <View
          style={{marginTop:180}}>
          {/* <ActivityIndicator color={"#ffffff"} size={"large"} /> */}
        <Spinner size={50} type={"ChasingDots"} color={'#fff'}/> 

          </View>
            }
          
            </View>
            </View>
            {this.state.CreateNewAccount == 0 && this.state.ForgetPassword != 1?
            this.state.Loader == false?
            <View style={styles.BottomContainer}>
                <View style={styles.TextinputsView}>
            <TextInput 
            onFocus={()=> this.setState({hideImage:true})}
            onEndEditing={()=> this.setState({hideImage:false})}
            placeholder={'Mobile Number'} 
            // value={this.state.username} 
            placeholderTextColor={'#000000'}
            onChangeText={(text) => this.setState({MobileNumber:text})}
            style={styles.TextInputs}/>
            </View>
            <View style={styles.TextinputsView}>
            <TextInput 
            secureTextEntry 
            onFocus={()=> this.setState({hideImage:true})}
            onEndEditing={()=> this.setState({hideImage:false})}
            placeholder={'Password'} 
            placeholderTextColor={'#000000'}
            // value={this.state.password} 
            onChangeText={(text) => this.setState({password:text})}
            style={styles.TextInputs} />
            </View>

            <View style={styles.BottomBtns}>
            <TouchableOpacity onPress={()=> {this.LoginforDoctor(this.state.MobileNumber, this.state.password), this.setState({Loader:true})}} style={styles.BtnsContainer}>
            <Text allowFontScaling={false} style={styles.BtnsText}>
              Sign In
            </Text>
            </TouchableOpacity>
            
            </View>
            <Text allowFontScaling={false} style={styles.BtnsText}>
             OR
            </Text>
            <View style={styles.BottomBtns}>
            
        <TouchableOpacity onPress={()=> this.setState({CreateNewAccount:1})} style={styles.BtnsContainer}>
            <Text allowFontScaling={false} style={styles.BtnsText}>
             Sign Up
            </Text>
            </TouchableOpacity>
            </View>
            <View style={styles.BottomBtns}>
            
            <TouchableOpacity onPress={()=> {this.setState({ForgetPassword:1})}} style={styles.ForgotpassBtnsContainer}>
                <Text allowFontScaling={false} style={styles.ForgotpassBtnsText}>
                  Forget your Password?
                </Text>
                </TouchableOpacity>
                </View>
            </View>
            :
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center',}}>
              {/* <ActivityIndicator size={30} color={'#fff'} /> */}
        <Spinner size={50} type={"ChasingDots"} color={'#fff'}/> 

            </View>

            :
            this.state.ForgetPassword == 1?
            <>
            <View style={styles.BottomContainer}>
    <View style={styles.TextinputsView}>
        <TextInput placeholder={'Enter Phone Number'} 
          onFocus={()=> this.setState({hideImage:true})}
          onEndEditing={()=> {this.setState({hideImage:false}), this.forgetpwAPI(this.state.MobileNumber)}}
            placeholderTextColor={'#000000'}
            style={styles.TextInputs}
            onChangeText={(text)=> this.setState({MobileNumber:text})} />
        </View>

        {/* {this.state.forgotpinEnable == 1?
    <View style={styles.TextinputsView}>
    <TextInput 
    placeholder={'Recovery Code'} 
    onFocus={()=> this.setState({hideImage:true})}
    onEndEditing={()=> this.setState({hideImage:false})}
    placeholderTextColor={'#000000'}
    value={this.state.password} 
    onChangeText={(text) => this.setState({password:text})}
    style={styles.TextInputs} />
    </View>
    
            :
            null
    } */}
            
        <View style={[styles.BottomBtns,{marginTop:20, padding:10, paddingBottom:5}]}>
          
            <TouchableOpacity onPress={()=> {this.state.MobileNumber != ''? (this.setState({forgotpinEnable:1, forgettextPrinted:null}), this.forgetpwAPI(this.state.MobileNumber)): alert('Enter Valid Phone Number')}} style={styles.BtnsContainer}>
           
            {this.state.forgotpinEnable == 0?
            <Text allowFontScaling={false} style={styles.BtnsText}>
             Submit
            </Text>
            :
             <View style={{flex:1, justifyContent: 'center', alignItems: 'center',}}>
             {/* <ActivityIndicator size={30} color={'#fff'} /> */}
       <Spinner size={50} type={"ChasingDots"} color={'#fff'}/> 

           </View>
    }
           
            </TouchableOpacity>

            {this.state.forgettextPrinted != null?
          <View style={{margin:10,flexDirection:'row', justifyContent: 'center', alignContent: 'center', alignSelf: 'center',}}>
            {this.state.CodeUnsuccessful == 1?
            <AntDesign name='exclamationcircle' color={'red'} size={20}/>
            :
            <AntDesign name='checkcircle' color={'lightgreen'} size={20}/>
            
            }
            <Text allowFontScaling={false} style={{marginHorizontal:5, color:"#fff", fontSize:14, fontFamily:'Poppins-SemiBold'}}>
            {this.state.forgettextPrinted}
           </Text>
           </View>
           :
           null
    }
           
            </View>
            <View style={{ flex:0.4, justifyContent: 'center',}}>
                  <TouchableOpacity onPress={()=> this.setState({CreateNewAccount:0 ,ForgetPassword:0})}>
                  <Text style={styles.BtnsText}>
                    Back
                  </Text>
                  </TouchableOpacity>
                </View>
            </View>
               
                </>
            :
            this.state.CreateNewAccount == 1?
            <>
       
            <View style={styles.BottomContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[styles.TextinputsView,{paddingTop:0, marginTop:0}]}>
            <TextInput placeholder={'Name'}
              onFocus={()=> this.setState({hideImage:true})}
              onEndEditing={()=> this.setState({hideImage:false})}
            placeholderTextColor={'#000000'}
            onChangeText={(text)=> {this.setState({username:text})}}
            style={styles.TextInputs}/>
            </View>

            <View style={styles.TextinputsView}>
        <TextInput placeholder={'Mobile Number'} 
          onFocus={()=> this.setState({hideImage:true})}
          onEndEditing={()=> this.setState({hideImage:false})}
            placeholderTextColor={'#000000'}
            onChangeText={(text)=> {this.setState({MobileNumber:text})}}
            style={styles.TextInputs}/>
        </View>
        <View style={styles.TextinputsView}>
        <TextInput placeholder={'Email Address'} 
          onFocus={()=> this.setState({hideImage:true})}
          onEndEditing={()=> this.setState({hideImage:false})}
            placeholderTextColor={'#000000'}
            onChangeText={(text)=> {this.setState({email:text})}}
            style={styles.TextInputs} />
        </View>
        <View style={styles.TextinputsView}>
        <TextInput placeholder={'Password'} 
          onFocus={()=> this.setState({hideImage:true})}
          onEndEditing={()=> this.setState({hideImage:false})}
        secureTextEntry
            placeholderTextColor={'#000000'}
            onChangeText={(text)=> {this.setState({Password:text})}}
            style={styles.TextInputs} />
        </View>

        <View style={styles.BottomBtns}>
        <TouchableOpacity onPress={()=> this.setState({CreateNewAccount:2})} style={styles.BtnsContainer}>
        <Text allowFontScaling={false} style={styles.BtnsText}>
          Next
        </Text>
        </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.setState({CreateNewAccount:0 ,ForgetPassword:0})} style={{ justifyContent: 'center', marginTop:10, padding:10}}>
            <Text style={styles.BtnsText}>
                    Back
            </Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
        </View>
        </>
        :
        this.state.CreateNewAccount == 2?
        this.state.Loader == false?

        <>
        
        <View style={styles.BottomContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.TextinputsView}>
        <TextInput placeholder={'Clinic Name'} 
          onFocus={()=> this.setState({hideImage:true})}
          onEndEditing={()=> this.setState({hideImage:false})}
        value={this.state.clinicname}
            placeholderTextColor={'#000000'}
            onChangeText={(text)=> {this.setState({clinicname:text})}}
            style={styles.TextInputs}/>
        </View>
        
        <View style={styles.DropDownContainer}>
            <TouchableOpacity onPress={()=> this.setState({ModalEnable:1})} style={styles.TextinputsView}>
            {this.state.SelectedCityName == ''?
        
        <Text allowFontScaling={false} style={[styles.TextInputs,{width:'100%', height:50}]}> Select Your City</Text>
        :
        <Text allowFontScaling={false} style={[styles.TextInputs,{width:'100%', height:50}]}> {this.state.SelectedCityName}</Text>
      }
        </TouchableOpacity>
       
    </View>

        <View style={styles.DropDownContainer}>
        
        <TouchableOpacity onPress={()=> this.setState({SpecialitiesModal:1})} style={styles.TextinputsView}>
        {this.state.SelectedSpecialityName == ''?
       
        <Text allowFontScaling={false} style={[styles.TextInputs,{width:'100%', height:50}]}> Select Your Speciality</Text>
        :
        <Text allowFontScaling={false} style={[styles.TextInputs,{width:'100%', height:50}]}> {this.state.SelectedSpecialityName}</Text>
      }
        </TouchableOpacity>
    </View>

    <View style={{flexDirection:'row', marginTop:10}}>
      <View style={{flex:2, justifyContent: 'center', alignItems: 'center'}}>
      <CheckBox
      center
      checkedColor='#fff'
                checked={this.state.isSelected}
                onPress={() =>{ this.setState({isSelected:!this.state.isSelected}); }}
                style={{height:20, width:20, borderColor:"#fff", backgroundColor:'#fff'}}
              />

      </View>
      
      <View style={{flex:7, justifyContent: 'center', alignItems: 'flex-start'}}>
      <View style={{flexDirection:'row', justifyContent: 'center',}}>
      <Text style={{ color:'#fff', fontFamily:'Beatles', fontSize:16}}>
        I Agree to the 
      </Text>
      <TouchableOpacity style={{paddingHorizontal:2}} onPress={()=> this.setState({UserPolicyEnable:1})}>
          <Text style={{color:'blue', fontFamily:'Beatles', fontSize:18}}> Policy </Text>
          </TouchableOpacity> 
      </View>
      </View>
    </View>

    <View style={styles.BottomBtns}>
      {this.state.isSelected == true?
    <TouchableOpacity onPress={()=> {
        this.SignUpForDoctor(),
        this.setState({Loader:true})
    }} style={styles.BtnsContainer}>
    <Text allowFontScaling={false} style={styles.BtnsText}>
      Sign Up
    </Text>
    </TouchableOpacity>
    :
    <TouchableOpacity onPress={()=> {
     alert('Please agree to the terms and policy')
  }} style={[styles.BtnsContainer,{backgroundColor: "#847f7f",}]}>
  <Text allowFontScaling={false} style={styles.BtnsText}>
    Sign Up
  </Text>
  </TouchableOpacity>
    }

    </View>
    <View style={{  justifyContent: 'center', padding:10}}>
<TouchableOpacity onPress={()=> this.setState({CreateNewAccount:0 ,ForgetPassword:0})}>
<Text style={styles.BtnsText}>
  Back
</Text>
</TouchableOpacity>
</View>
</ScrollView>
    </View>


</>
    :
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <Spinner size={50} type={"ChasingDots"} color={'#fff'}/> 
    </View>
        :
    
      
        null
    }

  {
  }

  {this.state.ModalEnable == 1?
                  <CustomCitiesScreen
                  Parent={this}
                  //  modalvisbile={true}
                   data = {CitiesList}
                   modalVisible={this.state.ModalEnable}  />
                :
                null
                }

        {this.state.SpecialitiesModal == 1?
        <SpecialitiesScreen 
        Parent={this}
        //  modalvisbile={true}
         data = {Specialieties}
         modalVisible={this.state.SpecialitiesModal}  />
      :
      null
      }

{this.state.UserPolicyEnable == 1?
    <Modal
    animationType="slide"
    transparent={true}
    visible={this.state.UserPolicyEnable == 1? true : false}
    // data={UserPolicy}
    onRequestClose={()=> this.setState({UserPolicyEnable:0})}
    >
         
<View style={{height:height*0.8, width:width,flex: 1,justifyContent: "flex-end"}}>
<Pdf 
      source={source} 

            onPageChanged={(page,numberOfPages) => {
                console.log(`Current page: ${page}`);
            }}
            onError={(error) => {
                console.log(error);
                console.log("12937889i");
                // alert(error)
            }}
          
            style={styles.pdf}/>
      <View style={{position: 'absolute', top:10, right:5, zIndex: 99}}>
        <TouchableOpacity onPress={()=> this.setState({UserPolicyEnable:0})}>
      <Entypo name='circle-with-cross' size={30} />
      </TouchableOpacity>

      </View>

  </View>
  </Modal>

  :
  null
    }


    </LinearGradient>

            </SafeAreaView>

            
        )}
    }

 

    function mapStateToProps(state){
      return{
        store: state
      }
    }
      
    export default connect(mapStateToProps)(login);

        const styles = StyleSheet.create({
        BtnsContainer: {
              width:'90%', 
              backgroundColor:'#26a256',
              borderRadius:15,
              marginTop:5
            },
        ForgotpassBtnsContainer:{
          width:'90%', 
          backgroundColor:'transparent',
        },
        BtnsText:{
        fontSize:16,
        justifyContent:'center',
        alignSelf:"center",
        padding:5,
        color:'#fff',
        fontFamily:'Helvetica-Bold'
    },
        ForgotpassBtnsText:{
          fontSize:13,
            justifyContent:'center',
            alignSelf:"center",
            // padding:5,
            color:'#ffffff',
            fontFamily:'Poppins-Regular',

        },
        TextinputsView:{
            justifyContent:'center',
            alignItems:'center',
            margin:5,
            marginBottom:1
        },
        TextInputs:{
            backgroundColor:'#fff', 
            width:'90%', 
            padding:12, 
            borderRadius:10, 
            justifyContent:'center', 
            alignItems:'center',
            fontFamily:'Poppins-Medium',
            color:'#000000'
        },
        HeadingView:{
        justifyContent:'center',
        alignItems:'center'
        },
        HeadingName:{
            fontFamily:'Righteous-Regular',
            fontSize:40,
        },
        TopContainer:{
            flex:0.5,
            // zIndex:99
        },   
        MiddleContainer:{
            flex:2,
            justifyContent: 'flex-end',
            alignItems:'center'
        },
        BottomContainer:{
            flex:3,
        },
        linearGradient: {
          flex: 1,
        },
        BottomBtns:{
            // width:'100%',
            margin:5,
            justifyContent:'center',
            alignItems:'center',
            shadowColor: '#000000',
            shadowOffset: {
                width: 0,
                height: 7,
            },
            shadowOpacity: 0.43,
            shadowRadius: 9.51,
            
            // elevation: 15,
            
        },
        DropDownContainer:{
            width:'90%',
            // justifyContent:'center',
            // alignItems:'center',
            alignSelf:'center',
            borderRadius:10,
        },
        pdf: {
          // flex:1,
          width:width,
          height:height,
          // backgroundColor: '#fff',
      }
          });
          