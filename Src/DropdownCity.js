import React, {useState, useEffect} from 'react';
    import {StyleSheet, View, Text, Image, Modal} from 'react-native';
    import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import {GetCities} from '../Src/Extras/AllApis';


    const data = [
        // {label: 'Karachi', value: '1'},
        // {label: 'Lahore', value: '2'},
        // {label: 'Hyderabad', value: '3'},
        // {label: 'Islamabad', value: '4'},
        // {label: 'Quetta', value: '5'},
        // {label: 'Peshawar', value: '6'},
        // {label: 'Multan', value: '7'},
        // {label: 'Sukkhar', value: '8'},
    ];

    const GetCitiesArray = () => {
      fetch(`${GetCities}`, {
          method:'GET',
          headers:{
          Accept:'application/json'
        }})
        .then((res)=>res.json())
        .then((json)=>{

        //   let {Result} = ;
          let {Code, Message, Data} = json;
          if(Code == '00'){
            //   alert(JSON.stringify(Data[0]._id))
            if(Data != null){
            Data.map((val)=>{
            var object = {label: val.Name, value: val._id}
            data.push(object);
            })
          }
    }
  })
}

    const DropdownCity = _props => {
        const [dropdown, setDropdown] = useState(null);
        const [selected, setSelected] = useState([]);

        const _renderItem = item => {
            return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
                {/* <Image style={styles.icon} source={require('./assets/tick.png')} /> */}
            </View>
            );
        };
        useEffect(() => {
            // Update the document title using the browser API
            GetCitiesArray();
          });
        return (
            <View style={styles.container}>
                <Dropdown
                    style={styles.dropdown}
                    containerStyle={styles.shadow}
                    data={data}
                    search
                    searchPlaceholder="Search"
                    inputSearchStyle={{color:'#000', fontFamily:"Poppins-Bold"}}
                    labelField="label"
                    valueField="value"
                    label="Dropdown"
                    placeholder="Select City"
                    placeholderStyle={{fontFamily:'Poppins-SemiBold', color:'#000000'}}
                selectedTextStyle={{fontFamily:'Poppins-SemiBold', color:'#000000'}}
                    value={dropdown}
                    onChange={item => {
                    setDropdown(item.value);
                        // console.log('selected', item);
                        alert(JSON.stringify(item.value))
                    }}
                    // renderLeftIcon={() => (
                    //     <Image style={styles.icon} source={require('./assets/account.png')} />
                    // )}
                    renderItem={item => _renderItem(item)}
                    textError="Error"
                />

            </View>
        );
    };

    export default DropdownCity;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
            padding: 26,
            borderRadius:10,
            margin:5,
            marginBottom:1

        },
        dropdown: {
            backgroundColor: 'white',
            borderBottomColor: 'gray',
            color:'#000000'
            // borderBottomWidth: 0.5,
            // marginTop: 5,
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
            color:'#000000'
        },
        shadow: {
            shadowColor: '#000000',
            shadowOffset: {
            width: 0,
            height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
        },
    });