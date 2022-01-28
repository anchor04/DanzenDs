import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from '../Games/HangMan/HomeScreen';
import gamesList from '../gamesList';
import Rewards from '../Rewards';
import Dummy from './Dummy';

const BTab = createBottomTabNavigator();

const Tabs=()=>{

    return(
        <BTab.Navigator>
            {/* <Tab.Screen name='Games' component={gamesList}/> */}
            {/* <Tab.Screen name='RewardScreen' component={Rewards}/> */}
            <BTab.Screen name='DummyScrren' component={Dummy}/>

        </BTab.Navigator>
    )
}

export default Tabs;