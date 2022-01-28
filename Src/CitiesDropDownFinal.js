import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, Modal, FlatList, Dimensions,Alert, Pressable, ScrollView} from 'react-native';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
const {height, width} = Dimensions.get('window')


export default class CustomCitiesScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dropdown:null,
            selected:[],
            modalVisible:false
        };
    
    }
    componentDidMount(){
    //    let modalVis = this.props.Parent.state.modalVisible

       console.log(this.props.Parent.state.ModalEnable)
       console.log('Parent')
    };
   
    



    render(){
        const {
            modalVisible,
            
        } = this.state;
        const {
            
        data
        } = this.props;
        return(
            <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.props.Parent.state.ModalEnable == 1? true : false}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <FlatList
                  keyboardShouldPersistTaps={'always'}
                  //  updateCellsBatchingPeriod={100}
                       maxToRenderPerBatch={250}
                       removeClippedSubviews={true}
                       initialNumToRender={30}
                       showsVerticalScrollIndicator={false}
                       data={data}
                       renderItem={({item}) =>
                        (
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {this.props.Parent.setState({ModalEnable:0}),
                    this.props.Parent.setState({SelectedCityId:item.value, SelectedCityName:item.label})
              }}>
                    <Text style={styles.textStyle}>{item.label}</Text>
                  </Pressable>
                        )}
                        />
                </View>
              </View>
            </Modal>
          </View>

    );
};
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        // marginTop: 22
      },
      modalView: {
        // margin: 20,
        height:height,
        width:width,
        backgroundColor: "#fff",
        borderTopLeftRadius:20,
        borderTopRightRadius: 20,
        padding: 40,
        // alignItems: "center",
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#d6d6d6",
        margin: 10,
      },
      textStyle: {
        color: "#000",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
    });