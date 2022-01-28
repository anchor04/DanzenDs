import React, { Component } from 'react';
import { View, Text, Image, SafeAreaView, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Header  from './Extras/Header';
import RenderHtml from 'react-native-render-html';

const {width} = Dimensions.get('window');


class NewsRead extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
    let HtmlContent = this.props.route.params.htmlContent;
    this.setState({HtmlContent})
  }

  render(){
    const source = {
        html: this.state.HtmlContent
      };
      return(
          <SafeAreaView styles={{flex:1, backgroundColor: "#fff"}}>
              <Header
                   navigation={this.props.navigation}/>
             <View style={styles.MainContainer}>
            <RenderHtml 
            contentWidth={width}
            source={source} />
            </View>
          </SafeAreaView>
      )
  }
}
export default NewsRead;

const styles = StyleSheet.create({
    MainContainer:{
        margin:10,
        justifyContent: 'center',
        alignItems:'center',
      },
})