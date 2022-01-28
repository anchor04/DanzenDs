import React from 'react';
import { SafeAreaView } from 'react-native';
import { StyleSheet, Dimensions, View, ActivityIndicator, BackHandler, Text } from 'react-native';
// const { height, width } = Dimensions.get('window');
import Spinner from 'react-native-spinkit';
import Pdf from 'react-native-pdf';
import Header from '../Extras/Header';
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';

const { height, width } = Dimensions.get('window');


export default class PdfReaderArticles extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          PdfCover:null,
          Loader:true,
          FullScreenLoader:true
    
      }
    }
        componentDidMount(){
        //   let PdfCover = this.props.route.params.PdfCover.toString();
          let PdfCover = this.props.route.params.PdfCover;
          this.setState({PdfCover});
          // alert(JSON.stringify(this.props.route.params.PdfCover))
          // console.log(this.props.route.params.PdfCover)
        }
    
        
        render() {
            // const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',cache: true };
                // const resourceType = 'url';
        const{ PdfCover } = this.state;

      const source = { uri: PdfCover, cache: true };
    //   const PdfCovers = { uri: this.state.PdfCover, cache: true }
          console.log(source)
          console.log("PdfCover")
        return (
          <SafeAreaView style={{flex:1, backgroundColor: "#fff"}}>
            <>
            <Header 
        navigation={this.props.navigation} />


           
             <Pdf
                    source={source}
                    enablePaging={true}
                    renderActivityIndicator={(progress)=> console.log(progress)}
                    onLoadProgress={(percentage)=> this.setState({percentage})}
                    fitPolicy={0}
                    horizontal={true}
                    onLoadComplete={()=> this.setState({FullScreenLoader:false})}
                    onPageChanged={(page,numberOfPages) => {
                        console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                        // alert(error)
                    }}
                  
                    style={styles.pdf}/>

    
       

          </>
          {this.state.FullScreenLoader == true?
<>

<View style={{flex:100, justifyContent: 'center', alignItems: 'center', alignSelf:'center'}}>
  {/* <Text>
    {this.state.percentage}
  </Text> */}
<Progress.Bar progress={this.state.percentage} width={100} color={'#1e8449'} />

   <FastImage
  style={{ height:200,width:200}}
  source={{
      uri: 'https://i.ibb.co/JKBwMQr/Thinking.gif',
      priority: FastImage.priority.high,
      cache: FastImage.cacheControl.immutable
  }}
  resizeMode={FastImage.resizeMode.contain}
  onLoadEnd={()=>this.setState({gifLoading:false})}
/>
</View>
</>
:
null
}
          </SafeAreaView>
        );
        }
    }
    
    const styles = StyleSheet.create({
        container: {
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        pdf: {
            flex:1,
            width:width,
            height:height,
           backgroundColor: '#fff',

        }
    });
