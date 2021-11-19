
 import 'react-native-gesture-handler';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import Login from './Src/login';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import emptyScreen from './Src/emptyScreen';



function DrawerStack({ navigation }) {
  return (
   <DrawerContent navigation={navigation}/>
  );
}



const Stack = createStackNavigator();

function DraweS() {
  return (
    <Drawer.Navigator
    drawerContent={DrawerStack}
    screenOptions={{
      headerShown: false
    }}
    // detachInactiveScreens={true}
    >
    <Drawer.Screen name="LoginScreen" component={Login} />
    <Drawer.Screen name="emptyScreen" component={emptyScreen} />
    {/* <Drawer.Screen name="CaptainPortal" component={CaptainPortalStack} />
    <Drawer.Screen name="Bonus" component={BonusStack} />
    <Drawer.Screen name="ReferCaptain" component={ReferCaptainStack} />
    <Drawer.Screen name="ChangePassword" component={ChangePasswordStack} />
    <Drawer.Screen name="StatementList" component={StatementListStack} />
    <Drawer.Screen name="StatementDetail" component={StatementDetailStack} />
    <Drawer.Screen name="RRideTypes" component={RRideTypesStack} /> */}

    
  </Drawer.Navigator>

  );
}


function MyStack() {
  return (
    <>
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled:false
    }}
    // detachInactiveScreens={true}
    >
      <Stack.Screen 
      name="LoginScreen" 
      component={Login} 
      screenOptions={{gestureEnabled:false}}
      />
      <Stack.Screen name="emptyScreen" component={emptyScreen} />
      {/* <Stack.Screen name="RegisterOne" component={RegisterOneStack} />
      <Stack.Screen name="EnterPassword" component={WelcomeBackStack} />
      <Stack.Screen
      name="Dashboard"
      component={DraweS}
      options={{ headerShown: false }}
      />
      <Stack.Screen name="Profile" component={ProfileStack} />
      <Stack.Screen name="Trips" component={TripsStack} />
      <Stack.Screen name="TripEarning" component={TripEarningStack} />
      <Stack.Screen name="DriverRating" component={DriverRatingStack} />
      <Stack.Screen name="AvailableHours" component={AvailableHoursStack} />
      <Stack.Screen name="AcceptRate" component={AcceptRateStack} />
      <Stack.Screen name="CompletionRate" component={CompletionRateStack} />
      <Stack.Screen name="Incentives" component={BonusStack} />
      <Stack.Screen name="bonusDetail" component={BonusDetailStack} />
      <Stack.Screen name="RegisterTwo" component={RegisterTwoStack} /> */}
    </Stack.Navigator>

    </>
  );
}



export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>

        );
      }


