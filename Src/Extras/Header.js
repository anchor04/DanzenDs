import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {Entypo, FontAwesome5, MaterialCommunityIcons, MaterialIcons} from './AllIcons';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
        BackScreen:null
    };
  }
  componentDidMount(){
      // alert(JSON.stringify(this.props.WhiteHeader))
      // let BackScreen = this.props.route.params.WhiteHeader
      // this.setState({BackScreen})
  }

  render() {
    return (
      this.props.WhiteHeader !=  false?
        <View style={styles.Header}>
                           
        <View style={styles.BlackBox}>
            <TouchableOpacity onPress={()=> 
             this.props.navigation.goBack(null)}>
     <MaterialIcons name="arrow-back" size={30} color={'#000'} />
     </TouchableOpacity>
                </View>
     <View style={styles.HeaderView}>
   <Image source={require('../images/DanzenDSLogo.png')} resizeMode='contain' style={styles.Image}/>
    </View>

    <View style={styles.HomeBtn}>
    <TouchableOpacity onPress={()=> this.props.navigation.push('Dashboard')}>
     <FontAwesome5 name="home" style={styles.homeicon} />
     </TouchableOpacity>
    </View>
    </View>
    :
    <View style={[styles.Header,{backgroundColor:'#1e8449'}]}>
                           
        <View style={styles.BlackBox}>
            <TouchableOpacity onPress={()=> 
             this.props.navigation.goBack(null)}>
     <MaterialIcons name="arrow-back" size={30} color={'#000'} />
     </TouchableOpacity>
                </View>
     <View style={styles.HeaderView}>
   <Image source={require('../images/DanzenDSLogo.png')} resizeMode='contain' style={styles.Image}/>
    </View>

    <View style={styles.HomeBtn}>
    <TouchableOpacity onPress={()=> this.props.navigation.push('Dashboard')}>
     <FontAwesome5 name="home" style={styles.homeicon} />
     </TouchableOpacity>
    </View>
    </View>
    );
  }
}
const styles = StyleSheet.create({
    Header:{
        // marginTop:'5%',
        height:80,
        padding:10,
        justifyContent:'center',
        flexDirection:'row',
        backgroundColor: "transparent",
        
    },
    BlackBox:{
        flex:0.1,
        justifyContent:'center',
        alignItems:'center',
    },
    HeaderView:{
        flex:0.75,
        justifyContent:'center',
        alignItems:'center',
    },
    HomeBtn:{
      flex:0.1,
      justifyContent: 'center',
      alignItems:'center'
    },
    homeicon:{
      fontSize:25,
      color:'#000'
    },
    Image:{
      // height:0,
      width:160,
    },
    HeaderText:{
        fontSize:20,
        fontFamily:'Poppins-SemiBold',
        color:'#000'
    }
})

export default Header;
