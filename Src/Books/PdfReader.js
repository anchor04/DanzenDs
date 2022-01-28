import React from 'react';
import { SafeAreaView } from 'react-native';
import { StyleSheet, Dimensions, View, ActivityIndicator, BackHandler, Text } from 'react-native';
// import PDFView from 'react-native-view-pdf';
const { height, width } = Dimensions.get('window');
import Spinner from 'react-native-spinkit';
import Pdf from 'react-native-pdf';
import Header from '../Extras/Header';
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';


// const resources = {
//     // file: Platform.OS === 'ios' ? 'downloadedDocument.pdf' : '/sdcard/Download/downloadedDocument.pdf',
//     // url: 'http://www.africau.edu/images/default/sample.pdf',
//     url: `${this.props.route.params.PdfCover}`,
//     // base64: 'JVBERi0xLjMKJcfs...',
//   };

export default class PDFViewew extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      PdfCover:null,
      Loader:true,
      FullScreenLoader:true

  }
}
    componentDidMount(){
      let PdfCover = this.props.route.params.PdfCover.toString();
      this.setState({PdfCover});
      // alert(JSON.stringify(this.props.route.params.FullScreenLoader))
    }

    
    render() {
        // const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf'};
            const resourceType = 'url';

  const{ PdfCover } = this.state;
      console.log(PdfCover)
      console.log("PdfCover")
 const source = { uri: PdfCover, cache: true };

    return (
      <SafeAreaView style={{flex:1, backgroundColor: "#fff"}}>
        <>
      {/* <View style={{ flex: 1 }}> */}
        {/* <PDFView
          fadeInDuration={250.0}
          style={{ flex: 1 }}
          resource={PdfCover}
          // resource={this.state.PdfCover}
          // resourceType={PdfCover}
          onLoad={() => {this.setState({FullScreenLoader:false})}}
          onError={(error) => console.log('Cannot render PDF', error)}
        /> */}
        <Header 
        navigation={this.props.navigation} />

          <Pdf
            source={source}
            enablePaging={true}
            renderActivityIndicator={(progress)=> console.log(progress)}
            onLoadProgress={(percentage)=> this.setState({percentage})}
            fitWidth={true}
            fitPolicy={0}
            horizontal={true}
            onLoadComplete={() => {
                this.setState({FullScreenLoader:false})
            }}
            onPageChanged={(page,numberOfPages) => {
                console.log(`Current page: ${page}`);
            }}
            onError={(error) => {
                console.log(error);
                console.log("12937889i");
            }}
          
            style={styles.pdf}/>
        {this.state.FullScreenLoader == true?

            <View style={{flex:100, justifyContent: 'center', alignItems: 'center',}}>

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
<Progress.Bar progress={this.state.percentage} width={100} color={'#1e8449'} />

            </View>
            :
            null
          }
      {/* </View> */}

   

  
      </>
      </SafeAreaView>
    );
    }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // marginTop: 25,
},
pdf: {
    flex:1,
    width:width,
    height:height,
    backgroundColor: 'green',
}
});