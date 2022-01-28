import * as React from 'react';
import { Button, View, SafeAreaView, Text, Image, ScrollView,TouchableOpacity, StyleSheet,AsyncStorage } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import login from './login';
import dashboard from './dashboard';
import { withNavigation } from 'react-navigation';
import FastImage from 'react-native-fast-image';
import {FontAwesome, AntDesign, Entypo, Feather, MaterialIcons, Ionicons} from './Extras/AllIcons';
import LinearGradient from 'react-native-linear-gradient'


class Drawer extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          FirstName:null, 
          LastName:null, 
            username:null, 
        FullName:null}
    }
    async componentDidMount(){
    var UserId = await AsyncStorage.getItem('UserId');
    this.setState({UserId})
  // alert(Math.round(width*36.20/100))
        const username = await AsyncStorage.getItem('UserName', null);
        this.setState({FullName:username}) 
        // let FirstName = username.split(' ')[0]
        // this.setState({
        //     username:FirstName
        // })



    }

    logout = async () => {
        await AsyncStorage.removeItem('UserName')
        await AsyncStorage.removeItem('UserId');
        await AsyncStorage.removeItem('Username');
        this.props.navigation.closeDrawer()
        // alert(1)
    }


    render (){
        // const DrawerStatus = this.props.navigation.state.isDrawerOpen;
        // if(DrawerStatus == true){
        //  alert(1)
        // }
    
        const { navigate , push} = this.props.navigation;  
      return (
        <>
        <SafeAreaView style={{flex:1, backgroundColor:'#117864'}}>
        {/* <LinearGradient colors={['#58D68D', '#1D8348','#1D8348','#1D8348', '#58D68D']} style={styles.linearGradient}> */}
        {/* <LinearGradient colors={['#4ba178', '#05a156','#05a156','#4ba178']} style={styles.linearGradient}> */}
        {/* <LinearGradient colors={['#448b61', '#43be75','#43be75','#448b61']} style={styles.linearGradient}> */}
        <LinearGradient colors={['#27ae60', '#1e8449','#1e8449','#145a32']} style={styles.linearGradient}>
        

<View
style={{
//   backgroundColor:'#2D3748',
}}
>

    <View
    style=
    {{
    //   padding:50,
    //   backgroundColor:"#58D68D",
    //   borderColor:"#58D68D",
    //   borderBottomLeftRadius:10,
    //   borderBottomRightRadius:10,
    borderRadius:10,
      margin:10,
      marginBottom:10,
    // shadowColor: '#000000',
    // shadowOffset: {
    //     width: 0,
    //     height: 7,
    // },
    // shadowOpacity: 0.43,
    // shadowRadius: 9.51,
    
    // elevation: 15,
    

    }}
    >


        {/* <View
        style={{
            position:'absolute',
            bottom:0,
            top:0,
            left:0,
            right:0,
            // flex:1,

        //   backgroundColor:'red',
        }}>
            <Image source={require('../Src/images/bubble.png')} resizeMode='contain' style={styles.drawerbubble}/>
            <Text style={styles.DrawerHelloText}>Hi there! {this.state.username}</Text>
        </View> */}
        {/* profile */}

        <View
        style={{
          // justifyContent:'center',
          alignItems:'center',
          justifyContent:'center',
        //   marginLeft:5,
          flexDirection:'row',
          shadowColor:'#000000', shadowOpacity:0.5, shadowOffset:{width:1,height:1}, shadowRadius:10,
        }}
        >  
        <View style={{
          // justifyContent:'center',
          alignItems:'center',
          justifyContent:'center', padding:5}} >
            {/* <Image source={require('../Src/images/123.png')} style={{height:180, width:170}} resizeMode='contain' /> */}
            {/* <View style={{position:'absolute', bottom:25, top:-40,}}> */}
            <View>
         <FastImage
                style={{ height:200,width:200}}
                source={{
                    // uri: 'https://i.ibb.co/vzYKfg7/trans.gif',
                  uri: 'https://i.ibb.co/SJ3KYs2/5-min.gif',

                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
            />
        </View>
        <View style={{width:280}}>
        <View style={styles.separator}/>
        </View>
        </View>
        </View>
        </View>
        </View>
        <ScrollView>

        <TouchableOpacity
onPress={()=> 
    navigate('Profile', {UserName:this.state.FullName, Header:'Profile', UserId:this.state.UserId})
}
style={styles.Draweroptionbtns}>
    <View style={styles.DraweroptionsView}>
        {/* <MaterialIcons name="payment" size={30} color={"#18C009"} light/> */}
     
    </View>
    <View style={styles.DraweroptionsTextView}>
        <View style={styles.DrawerIcons}>
            <Entypo name="user" size={24} color={'#fff'}/>
        </View>
        <View style={styles.DrawerTextView}>
        <Text allowFontScaling={false}  style={styles.DraweroptionsText}>
        Profile
        </Text>
        </View>
    </View>
</TouchableOpacity>

<TouchableOpacity
onPress={()=> 
    // navigate('paymentMethod')
    navigate('gamesList', {Header:'Games'})
}
style={styles.Draweroptionbtns}>
    <View style={styles.DraweroptionsView}>
        {/* <MaterialIcons name="payment" size={30} color={"#18C009"} light/> */}
     
    </View>
    <View style={styles.DraweroptionsTextView}>
    <View style={styles.DrawerIcons}>
            <Entypo name="game-controller" size={24} color={'#fff'}/>
        </View>
        <View style={styles.DrawerTextView}>
        <Text allowFontScaling={false}  style={styles.DraweroptionsText}>
        Games
        </Text>
        </View>
    </View>
</TouchableOpacity>

<TouchableOpacity
onPress={()=> 
    navigate('WelcomeScreen', {Header:'Quiz'})
}
style={styles.Draweroptionbtns}>
    <View style={styles.DraweroptionsView}>
        {/* <MaterialIcons name="payment" size={30} color={"#18C009"} light/> */}
     
    </View>
    <View style={styles.DraweroptionsTextView}>
    <View style={styles.DrawerIcons}>
            <Feather name="aperture" size={24} color={'#fff'}/>
        </View>
        <View style={styles.DrawerTextView}>
        <Text allowFontScaling={false}  style={styles.DraweroptionsText}>
        Quiz
        </Text>
    </View>
    </View>

</TouchableOpacity>
<TouchableOpacity
onPress={()=> 
    navigate('NewsScreen', {UserId:this.state.UserId})
}
style={styles.Draweroptionbtns}>
    <View style={styles.DraweroptionsView}>
        {/* <MaterialIcons name="payment" size={30} color={"#18C009"} light/> */}
     
    </View>
    <View style={styles.DraweroptionsTextView}>
    <View style={styles.DrawerIcons}>
            <Ionicons name="newspaper-outline" size={24} color={'#fff'}/>
        </View>
        <View style={styles.DrawerTextView}>
        <Text allowFontScaling={false}  style={styles.DraweroptionsText}>
        News
        </Text>
    </View>
    </View>
</TouchableOpacity>
<TouchableOpacity
onPress={()=> 
    push('Books', {Header:'E-Books'})
}
style={styles.Draweroptionbtns}>
    <View style={styles.DraweroptionsView}>
        {/* <MaterialIcons name="payment" size={30} color={"#18C009"} light/> */}
     
    </View>
    <View style={styles.DraweroptionsTextView}>
    <View style={styles.DrawerIcons}>
            <FontAwesome name="book" size={24} color={'#fff'}/>
        </View>
        <View style={styles.DrawerTextView}>
        <Text allowFontScaling={false}  style={styles.DraweroptionsText}>
        E-Books
        </Text>
    </View>
    </View>
</TouchableOpacity>

<TouchableOpacity
onPress={()=> {
    push('Reward')
}}
style={styles.Draweroptionbtns}>
    <View style={styles.DraweroptionsView}>
        {/* <MaterialIcons name="payment" size={30} color={"#18C009"} light/> */}
     
    </View>
    <View style={styles.DraweroptionsTextView}>
    <View style={styles.DrawerIcons}>
            <Ionicons name="gift" size={24} color={'#fff'}/>
        </View>
        <View style={styles.DrawerTextView}>
        <Text allowFontScaling={false}  style={styles.DraweroptionsText}>
        Rewards
        </Text>
    </View>
    </View>
</TouchableOpacity>



<TouchableOpacity
onPress={()=> {
    this.logout()
    push('LoginScreen')
}}
style={styles.Draweroptionbtns}>
    <View style={styles.DraweroptionsView}>
        {/* <MaterialIcons name="payment" size={30} color={"#18C009"} light/> */}
     
    </View>
    <View style={styles.DraweroptionsTextView}>
    <View style={styles.DrawerIcons}>
            <AntDesign name="logout" size={24} color={'#fff'}/>
        </View>
        <View style={styles.DrawerTextView}>
        <Text allowFontScaling={false}  style={styles.DraweroptionsText}>
        Log Out
        </Text>
    </View>
    </View>
</TouchableOpacity>
</ScrollView>
</LinearGradient>
</SafeAreaView>
        </>
      )
}
}  


export default withNavigation(Drawer);

const styles = StyleSheet.create({
    Draweroptionbtns:{
        flex:1, 
        // padding:20, 
        flexDirection:'row', 
        // marginTop:5,
        // backgroundColor:'pink',
        justifyContent:'center',
        alignContent:'center',
        // alignItems:'center',
        alignSelf:'center'
    },
    DrawerTextView:{
        flex:0.7,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf:'center',
        // marginLeft:20,
        // backgroundColor: 'pink',
    },
    DrawerIcons:{
        flex:0.2,
        justifyContent: 'flex-start',
        alignItems:'flex-start',
        // backgroundColor: 'red',
    },
    DraweroptionsView:{
        // flex:0.2, 
        alignItems:'center', 
        justifyContent:'center', 
        // backgroundColor:'red',
        // margin:5
    },
    DraweroptionsTextView:{
    flex:1, 
    alignItems:'center', 
    justifyContent:'center',
    // backgroundColor:'#58D68D',
    padding:10,
    width:'80%',
    borderRadius:10,
    margin:5,
    flexDirection:'row'
    },
    DraweroptionsText:{
        fontSize: 14, 
        textAlign:'left', 
        fontFamily:'Poppins-Medium',
        color:"#fff"
    },
    drawerbubble:{
        height:200,
        width:130,
        left:150,
        bottom:35,
        backgroundColor:'transparent'
    },
    DrawerHelloView:{
        position:'absolute',
    alignSelf:'center',},
    DrawerHelloText:{
        left:170,
        bottom:160
    },
    linearGradient: {
        flex: 1,
      },
      separator:{
          borderWidth:0.1,
          backgroundColor:'transparent',
          width:'80%',
          justifyContent: 'center',
          alignSelf:'center',
          margin:10,
          padding:0.2
      }
})