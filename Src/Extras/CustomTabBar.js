import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons, Entypo, AntDesign, Feather, MaterialIcons, MaterialCommunityIcons} from './AllIcons'

        //pie-chart

class CustomTabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {route} = this.props
    return (
  
        <View style={styles.CustomMain}>
        <View style={styles.barItemsView}>
        <TouchableOpacity onPress={()=> {this.props.navigation.push('NotsScreen')}}>
        <Entypo name="bell" size={24} color={'#fff'}/>
        </TouchableOpacity>
        </View>
        <View style={styles.barItemCenterView}>
        <TouchableOpacity onPress={()=> {this.props.navigation.push('TimerScreenshow')}}>
        <AntDesign name ='piechart' size={24} color={'#fff'}/>
        </TouchableOpacity>
        </View>
        <View style={styles.barItemsView}>
        <TouchableOpacity onPress={()=> {this.props.navigation.push('AboutUsPage')}}>
        <Entypo name="info" size={24} color={'#fff'}/>
        </TouchableOpacity>
        </View>
        <View style={styles.barItemsView}>
        <TouchableOpacity onPress={()=> {this.props.navigation.push('Top20Screen')}}>
        <MaterialCommunityIcons name="trophy-award" size={24} color={'#fff'}/>
        </TouchableOpacity>
        </View>
        </View>
       

    );
  }
}

const styles = StyleSheet.create({
  CustomMain:{
    flex:1,
    width:'100%',
    alignSelf: 'center',
    flexDirection:'row',

  },
  barItemsView:{
    padding:15,
    borderRadius:15,
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  barItemCenterView:{
    padding:15,
    borderRadius:15,
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default CustomTabBar;
