import React from 'react';
import { SafeAreaView } from 'react-native';
import { StyleSheet, Dimensions, View, ActivityIndicator, BackHandler } from 'react-native';
// import '#000000' from 'react-native-view-pdf';
const { height, width } = Dimensions.get('window');
import Spinner from 'react-native-spinkit';

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
        return (
          <SafeAreaView style={{flex:1}}>
            <>
          <View style={{ flex: 1 }}>
            {/* <'#000000'
              fadeInDuration={250.0}
              style={{ flex: 1 }}
              resource={PdfCover}
              // resource={this.state.PdfCover}
              // resourceType={PdfCover}
              onLoad={() => {this.setState({FullScreenLoader:false})}}
              onError={(error) => console.log('Cannot render PDF', error)}
            /> */}
          </View>
    
       
    
          {this.state.FullScreenLoader == true?
          <View style={{flex:1, zIndex:99, justifyContent: 'center', alignItems:'center', backgroundColor: "#fff",}}>
          <Spinner size={100} type={"ChasingDots"} color={'#1e8449'}/> 
          </View>
             :
             null
             }
          </>
          </SafeAreaView>
        );
        }
    }
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 25,
        },
        pdf: {
            flex:1,
            width:Dimensions.get('window').width,
            height:Dimensions.get('window').height,
        }
    });
