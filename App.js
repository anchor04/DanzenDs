import React, { useEffect,useState, useRef }  from 'react'; 
 import 'react-native-gesture-handler';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  AppState,
  AsyncStorage
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './Src/Extras/TabBar';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import DrawerContent from './Src/Drawer';
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";
import {   
  LoginStack,
  TictactoeStack,
  GamesListStack,
  DashboardStack,
  NewsReadStack,
  // DrawerStack,
  GameBoardStack,
  HomeScreenStack,
  DanzenGame5Stack,
  ProfileStack,
  Top20Stack,
  GameScreenStack,
  WelcomeScreenStack,
  BooksStack,
  RewardsStack,
  ArticlesScreenStack,
  NewsStack,
  QuizScreenStack,
  AboutUsStack,
  TimerScreenStack,
  NotificationsStack,
  SolitairStack,
  WelcomeGame4Stack,
  Game4MainStack,
  FinishGame4Stack,
  PDFViewewStack,
  PDFViewrArticlesStack,
  CongratsQuizStack
 } from './Src/Navigation/Stacks';
 import { createStore } from 'redux';
 import {Provider} from 'react-redux';
 import { TimeInApi, TimeOutApi } from './Src/Extras/AllApis';
import gamesList from './Src/gamesList';


 const encodeFormData = (data) => {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
}

 const initialState = {
  user: null,
  score: 0,
  abc:0,
  ScreenId:null,
  GAMEID:null
};

  async function TimeIn(id, gameId) {

  
    let UserId = await AsyncStorage.getItem('UserId')
    // alert(id)
    const Params = {
      ScreenId:id,
      GameId: gameId,
      UserId: UserId
    }
  const body = encodeFormData(Params);
  console.log(body)
  console.log("123123908z98")

    fetch(`${TimeInApi}`, {
      method:'POST',
    headers:{
      Accept: 'application/json',
      'Content-Type':'application/x-www-form-urlencoded'
    },
    body: body
  })
  .then((response) => response.json())
  .then(responseJson =>  {
    console.log(responseJson)
    console.log('TimeInApi')

    })
  }

  async function TimeOutFn(userid) {
    // alert(userid)

    let UserId = await AsyncStorage.getItem('UserId')
    const Params = {
      UserId: UserId
    }
  const body = encodeFormData(Params);
  console.log(body)
  console.log("123123908z98asdaqwe")

    fetch(`${TimeOutApi}`, {
      method:'POST',
    headers:{
      Accept: 'application/json',
      'Content-Type':'application/x-www-form-urlencoded'
    },
    body: body
  })
  .then((response) => response.json())
  .then(responseJson =>  {
    console.log(responseJson)
    console.log('TimeOutApi')
    })
  }

  // function TimeOut() {
  //   console.log('function chaling 2')
  // }

  
 const reducer = (state = initialState, action) =>{
  switch(action.type){
             
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    case 'UPDATE_SCORE':
      return {
        ...state,
        score: state.score + action.score,
      };
      case 'UPDATE_Timeout_UserId':
        return {
          ...state,
          UserId: action.UserId,
        };
        case 'UPDATE_TimeIn_ScreenId':
          return {
            ...state,
            ScreenId: action.state,
          };
          case 'UPDATE_TimeIn_gameId':
            return {
              ...state,
              GAMEID: action.state,
            };
        
}
  return state;
  
}
const store = createStore(reducer);

export {
  store
};
store.subscribe(() => {
  that.forceUpdate()
});


const Drawer = createDrawerNavigator();





function DrawerStack({ navigation }) {
  return (
   <DrawerContent navigation={navigation}/>
  );
}

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

createNotificationListeners = async () => {

messaging().onMessage(async remoteMessage => {
    const {notification} = remoteMessage;
    const {
      body,
      title
    } = notification;

    console.log(remoteMessage)

    PushNotification.localNotificationSchedule({
      date: new Date(Date.now() + (1 * 1000)), 
      title:  title, 
      message:  body,
      playSound: true,
      soundName: 'default', 
    });

  })
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
    <Drawer.Screen name="dashboard" component={DashboardStack} />
    {/* <Stack.Screen name="Drawershow" component={Drawer} /> */}

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
      {/* <Stack.Screen 
      name="LoginScreen" 
      component={Login} 
      screenOptions={{gestureEnabled:false, headerShown: false }}
      component={DraweS}
      /> */}

    <Stack.Screen name="LoginScreen" component={LoginStack} />
    <Stack.Screen name="tictactoe" component={TictactoeStack} />
    <Stack.Screen name="GameBoard" component={GameBoardStack} />
    <Stack.Screen name="gamesList" component={GamesListStack} />
    <Stack.Screen name="HomeScreen" component={HomeScreenStack} />
    <Stack.Screen name="GameScreen" component={GameScreenStack} />
    <Stack.Screen name="Profile" component={ProfileStack} />
    <Stack.Screen name="WelcomeScreen" component={WelcomeScreenStack} />
    <Stack.Screen name="Books" component={BooksStack} />
    <Stack.Screen name="QuizScreen" component={QuizScreenStack} />
    <Stack.Screen name="PDFViewew" component={PDFViewewStack} />
    <Stack.Screen name="PDFViewarticles" component={PDFViewrArticlesStack} />
    <Stack.Screen name="NewsScreen" component={NewsStack} />
    <Stack.Screen name="Reward" component={RewardsStack} />
    <Stack.Screen name="ArticlesScreen" component={ArticlesScreenStack} />
    <Stack.Screen name="AboutUsPage" component={AboutUsStack} />
    <Stack.Screen name="TimerScreenshow" component={TimerScreenStack} />
    <Stack.Screen name="CongratsScreen" component={CongratsQuizStack} />
    <Stack.Screen name="NotsScreen" component={NotificationsStack} />
    <Stack.Screen name="WelcomeGame4Screen" component={WelcomeGame4Stack} />
    <Stack.Screen name="Game4MainScreen" component={Game4MainStack} />
    <Stack.Screen name="FinishGame4Screen" component={FinishGame4Stack} />
    <Stack.Screen name="NewsReadScreen" component={NewsReadStack} />
    <Stack.Screen name="Top20Screen" component={Top20Stack} />
    <Stack.Screen name="DanzenGame5Screen" component={DanzenGame5Stack} />
    <Stack.Screen name="SolitairGame" component={SolitairStack} />

    
    
    
    
    

      <Stack.Screen
      name="Dashboard"
      component={DraweS}
      options={{ headerShown: false }}
      />
      

    </Stack.Navigator>

    </>
  );
}

const AppStateExample = () => {



    createNotificationListeners();

    messaging().getToken()
    .then(token => {
      
      // console.log(`DeviceId:${token}`)
      // console.log(token)
      // console.log(`DeviceISDASD`)
      // alert(token)
    });


    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        nextAppState === "active"
      ) {
        let ScreenID = store.getState().ScreenId;
        let gameID = store.getState().GAMEID;

        TimeIn(ScreenID, gameID)
        console.log("App has come to the foreground!");
      }
      else {
        TimeOutFn(null);
        console.log("App has come to the background!");
      }
      




    });


    requestUserPermission();

    return () => {
      subscription.remove();
    };
    console.log(`Current state is: ${appStateVisible}`)


}

export default function App() {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef();
  AppStateExample();

  return (
    <Provider store={store}>
    <NavigationContainer
    ref={navigationRef}
    onReady={()=> {
      // routeNameRef.current = navigationRef.getCurrentRoute().name},
    navigationRef.getCurrentRoute().name}}
    onStateChange={async ()=> {
      const previousRouteName = routeNameRef.current;
      const currentRouteName = navigationRef.getCurrentRoute().name;
      
      // if(currentRouteName == 'Books' ){
      //   TimeIn(1, null)
      // store.dispatch({type:'UPDATE_TimeIn_ScreenId', state:1});
      // }
    
      // else if(currentRouteName == 'ArticlesScreen'  ){
      //   TimeIn(2, null)
      //   store.dispatch({type:'UPDATE_TimeIn_ScreenId', state:2});
      // }
      if(currentRouteName == 'PDFViewew'){
        TimeIn(1, null)
      store.dispatch({type:'UPDATE_TimeIn_ScreenId', state:1});
      }
      else if(currentRouteName == 'PDFViewarticles'){
        TimeIn(2, null)
        store.dispatch({type:'UPDATE_TimeIn_ScreenId', state:2});
      }
      else if(currentRouteName == 'QuizScreen'){
        TimeIn(4, null)
        store.dispatch({type:'UPDATE_TimeIn_ScreenId', state:4});
      }
      else if(currentRouteName == 'NewsScreen'){
        TimeIn(5, null)
        store.dispatch({type:'UPDATE_TimeIn_ScreenId', state:5});
      }
      else if(currentRouteName == 'tictactoe'){
        TimeIn(null, 1)
        store.dispatch({type:'UPDATE_TimeIn_gameId', state:1});
      }
      else if(currentRouteName == 'GameBoard'){
        TimeIn(null, 2)
        store.dispatch({type:'UPDATE_TimeIn_gameId', state:2});
      }
      else if(currentRouteName == 'GameScreen'){
        TimeIn(null, 3)
        store.dispatch({type:'UPDATE_TimeIn_gameId', state:3});
      }
      else if(currentRouteName == 'Game4MainScreen'){
        TimeIn(null, 4)
        store.dispatch({type:'UPDATE_TimeIn_gameId', state:4});
      }
      else{
        TimeOutFn(null)
      }
     
    console.log(currentRouteName)
      routeNameRef.current = currentRouteName;
    }}>
      <MyStack />
    </NavigationContainer>
    </Provider>
        );
      }

 

