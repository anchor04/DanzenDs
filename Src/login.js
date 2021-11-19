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
    ImageBackground
  } from 'react-native';
import LottieView from 'lottie-react-native';
import DropdownScreen from '../Src/DropdowMenu';
import DropdownCity from  '../Src/DropdownCity';
 

  export default class login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          CreateNewAccount:0, 
          MobileNumber:0,
          password:"",
        };
    }
    componentDidMount(){
    };

    LoginCredentials(number, Password){
        if(number == 1 && Password == "1"){
            // if(number == 123456789 && Password == "shuja123"){
        this.props.navigation.navigate('emptyScreen', {UserName:'Shuja Haider'})
        }
        else if(number == 2 && Password == "2" )
        {
        this.props.navigation.navigate('emptyScreen', {UserName:'Fazeel Haider'})
        }
        else{
            alert("Wrong Id or Password")

        }
    }

    render(){
        return(
            // <SafeAreaView style={{flex:1, backgroundColor:'#2F7433', later wala(2B6932)}}>
            <SafeAreaView style={{flex:1, backgroundColor:'transparent'}}>
            <ImageBackground source={require('../Src/images/BG.png')} resizeMode='cover' style={{ justifyContent:'center', flex:1}} >


            <View style={styles.TopContainer}>

            <View style={styles.HeadingView}>
                <Image style={{height:200, width:400}} source={require('../Src/images/DanzenDSLogo.png')} resizeMode='contain'/>
            </View>
            </View>
            <View style={styles.MiddleContainer}>
            <View style={styles.HeadingView}>
            <LottieView source={require('../Src/images/animation.json')}  style={{height:400, width:300 }}  autoPlay loop/>
            </View>
            </View>
            {this.state.CreateNewAccount == 0?
            <View style={styles.BottomContainer}>
                <View style={styles.TextinputsView}>
            <TextInput 
            placeholder={'Enter Mobile Number'} 
            value={this.state.username} 
            onChangeText={(text) => this.setState({MobileNumber:text})}
            style={styles.TextInputs}/>
            </View>
            <View style={styles.TextinputsView}>
            <TextInput 
            secureTextEntry 
            placeholder={'Enter Password'} 
            value={this.state.password} 
            onChangeText={(text) => this.setState({password:text})}
            style={styles.TextInputs} />
            </View>

            <View style={styles.BottomBtns}>
            <TouchableOpacity onPress={()=> this.LoginCredentials(this.state.MobileNumber, this.state.password)} style={styles.BtnsContainer}>
            <Text allowFontScaling={false} style={styles.BtnsText}>
              SIGN IN
            </Text>
            </TouchableOpacity>
            
            </View>
            <Text allowFontScaling={false} style={styles.BtnsText}>
             OR
            </Text>
            <View style={styles.BottomBtns}>
            
        <TouchableOpacity onPress={()=> this.setState({CreateNewAccount:1})} style={styles.BtnsContainer}>
            <Text allowFontScaling={false} style={styles.BtnsText}>
              CREATE NEW ACCOUNT
            </Text>
            </TouchableOpacity>
            </View>
            </View>
            :
            this.state.CreateNewAccount == 1?
            <View style={styles.BottomContainer}>
            <View style={styles.TextinputsView}>
            <TextInput placeholder={'Enter Name'} value={this.state.username} style={styles.TextInputs}/>
            </View>

            <View style={styles.TextinputsView}>
        <TextInput placeholder={'Enter Mobile Number'} value={this.state.MobileNumber} style={styles.TextInputs}/>
        </View>
        <View style={styles.TextinputsView}>
        <TextInput placeholder={'Enter Email Address'} value={this.state.email} style={styles.TextInputs} />
        </View>

        <View style={styles.BottomBtns}>
        <TouchableOpacity onPress={()=> this.setState({CreateNewAccount:2})} style={styles.BtnsContainer}>
        <Text allowFontScaling={false} style={styles.BtnsText}>
          NEXT
        </Text>
        </TouchableOpacity>
        </View>
        </View>
        :
        this.state.CreateNewAccount == 2?
        <View style={styles.BottomContainer}>
        <View style={styles.TextinputsView}>
        <TextInput placeholder={'Enter Clinic Name'} value={this.state.clinicname} style={styles.TextInputs}/>
        </View>
        
        <View style={styles.DropDownContainer}>
        <DropdownCity />
    </View>

        <View style={styles.DropDownContainer}>
        <DropdownScreen />
    </View>

    <View style={styles.BottomBtns}>
    <TouchableOpacity onPress={()=> this.setState({CreatenewAccountscrn1:1})} style={styles.BtnsContainer}>
    <Text allowFontScaling={false} style={styles.BtnsText}>
      SIGN UP
    </Text>
    </TouchableOpacity>
    </View>
    </View>
        :
        null
    }
      </ImageBackground>
            </SafeAreaView>
        )}
    }

        const styles = StyleSheet.create({
        BtnsContainer: {
              width:'90%', 
              backgroundColor:'#18C009',
              borderRadius:5
            },
            BtnsText:{
            fontSize:16,
            justifyContent:'center',
            alignSelf:"center",
            padding:5,
            color:'#fff',
            fontFamily:'Poppins-Medium'
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
            color:'#000'
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
            zIndex:99
        },   
        MiddleContainer:{
            flex:2.5,
        },
        BottomContainer:{
            flex:2,

        },
        BottomBtns:{
            // width:'100%',
            margin:5,
            justifyContent:'center',
            alignItems:'center',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 7,
            },
            shadowOpacity: 0.43,
            shadowRadius: 9.51,
            
            elevation: 15,
            
        },
        DropDownContainer:{
            width:'90%',
            // justifyContent:'center',
            // alignItems:'center',
            alignSelf:'center',
            borderRadius:10,
        }
          });
          