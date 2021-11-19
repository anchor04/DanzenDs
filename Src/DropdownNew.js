import React, {useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';

const data = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
    {label: 'Item 4', value: '4'},
    {label: 'Item 5', value: '5'},
    {label: 'Item 6', value: '6'},
    {label: 'Item 7', value: '7'},
    {label: 'Item 8', value: '8'},
];


export default class DropdownScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dropdown:null,
            selected:[],
        };
    }
    componentDidMount(){
    };


   renderItem(item){
        return (
        <View style={styles.item}>
            <Text style={styles.textItem}>{item.label}</Text>
            {/* <Image style={styles.icon} source={require('./assets/tick.png')} /> */}
        </View>
        );
    };

    render(){
        return(
        <View style={styles.container}>
            <Dropdown
                style={styles.dropdown}
                containerStyle={styles.shadow}
                data={data}
                search
                searchPlaceholder="Search"
                labelField="label"
                valueField="value"
                label="Dropdown"
                placeholder="Select item"
                value={this.state.dropdown}
                onChange={item => {
                this.setState({dropdown:item.value});
                    console.log('selected', item);
                }}
                // renderLeftIcon={() => (
                //     <Image style={styles.icon} source={require('./assets/account.png')} />
                // )}
            renderItem={item => renderItem(item)}
                textError="Error"
            />
        </View>
    );
};
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 40,
    },
    dropdown: {
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        marginTop: 20,
    },
    icon: {
        marginRight: 5,
        width: 18,
        height: 18,
    },
    item: {
        paddingVertical: 17,
        paddingHorizontal: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
});