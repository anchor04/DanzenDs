import * as React from 'react';
import Dashboard from '../dashboard';
import DrawerContent from '../Drawer';
import GameBoard from '../Games/Game2/GameBoard';
import HomeScreen from '../Games/HangMan/HomeScreen';
import GameScreen from '../Games/HangMan/GameScreen';
import Login from '../login';
import Tictactoe from '../Games/tictactoe';
import GamesList from '../gamesList';
import Profile from '../Profile';
import QuizWelcomeScreen from '../Quiz/Components/WelcomeScreen';
import CongratsQuiz from '../Quiz/Components/CongratsQuiz';
import Books from '../Books/Books';
import QuizScreen from '../Quiz/Components/QuizScreen';
import PDFViewew from '../Books/PdfReader';
import PDFViewrArticles from '../Articles/PdfReaderArticles';
import News from '../News';
import Rewards from '../Rewards'
import Articles from '../Articles/Articles';
import AboutUs from '../AboutUs';
import TimerScreen from '../TimerScreen';
import Notifications from '../Notifications';
import WelcomeGame4 from '../Games/Guesstheperson/WelcomeGame4';
import Game4Main from '../Games/Guesstheperson/Game4Main';
import FinishGame4 from '../Games/Guesstheperson/FinishGame4';
import NewsRead from '../NewRead';
import Top20 from '../Top20';
import Game5 from '../Games/Game5Danzen/gamemainapp';
import Solitair from '../Games/Solitair/main'

function LoginStack({ navigation, route }) {
    return <Login
      navigation={navigation}
      route={route}
      />;
  }

  function NotificationsStack({ navigation, route }) {
    return <Notifications
      navigation={navigation}
      route={route}
      />;
  }
  
  function SolitairStack({ navigation, route }) {
    return <Solitair
      navigation={navigation}
      route={route}
      />;
  }

  function DanzenGame5Stack({ navigation, route }) {
    return <Game5
      navigation={navigation}
      route={route}
      />;
  }

  function NewsReadStack({ navigation, route }) {
    return <NewsRead
      navigation={navigation}
      route={route}
      />;
  }

  function Top20Stack({ navigation, route }) {
    return <Top20
      navigation={navigation}
      route={route}
      />;
  }


  function WelcomeGame4Stack({ navigation, route }) {
    return <WelcomeGame4
      navigation={navigation}
      route={route}
      />;
  } 
  function Game4MainStack({ navigation, route }) {
    return <Game4Main
      navigation={navigation}
      route={route}
      />;
  } 
  function FinishGame4Stack({ navigation, route }) {
    return <FinishGame4
      navigation={navigation}
      route={route}
      />;
  } 
  function CongratsQuizStack({ navigation, route }) {
    return <CongratsQuiz
      navigation={navigation}
      route={route}
      />;
  }

  function PDFViewewStack({ navigation, route }) {
    return <PDFViewew
      navigation={navigation}
      route={route}
      />;
  }

  function PDFViewrArticlesStack({ navigation, route }) {
    return <PDFViewrArticles
      navigation={navigation}
      route={route}
      />;
  }

  

  function AboutUsStack({ navigation, route }) {
    return <AboutUs
      navigation={navigation}
      route={route}
      />;
  }

  function TimerScreenStack({ navigation, route }) {
    return <TimerScreen
      navigation={navigation}
      route={route}
      />;
  }

  function quizScreenStack({ navigation, route }) {
    return <quizScreen
      navigation={navigation}
      route={route}
      />;
  }
  function ArticlesScreenStack({ navigation, route }) {
    return <Articles
      navigation={navigation}
      route={route}
      />;
  }

  function NewsStack({ navigation, route }) {
    return <News
      navigation={navigation}
      route={route}
      />;
  }
  function DashboardStack({ navigation, route }) {
    return <Dashboard
      navigation={navigation}
      route={route}
      />;
  }
  function ProfileStack({ navigation, route }) {
    return <Profile
      navigation={navigation}
      route={route}
      />;
  }
  function RewardsStack({ navigation, route }) {
    return <Rewards
      navigation={navigation}
      route={route}
      />;
  }
  function TictactoeStack({ navigation, route }) {
    return <Tictactoe
      navigation={navigation}
      route={route}
      />;
  }
  function GamesListStack({ navigation, route }) {
    return <GamesList
      navigation={navigation}
      route={route}
      />;
  }

  function DrawerStack({ navigation, route }) {
    return <DrawerContent
      navigation={navigation}
      route={route}
      />;
  }
  function GameBoardStack({ navigation, route }) {
    return <GameBoard
      navigation={navigation}
      route={route}
      />;
  }
  function HomeScreenStack({ navigation, route }) {
    return <HomeScreen
      navigation={navigation}
      route={route}
      />;
  }

  function GameScreenStack({ navigation, route }) {
    return <GameScreen
      navigation={navigation}
      route={route}
      />;
  }

  function WelcomeScreenStack({ navigation, route }) {
    return <QuizWelcomeScreen
      navigation={navigation}
      route={route}
      />;
  }
  function QuizScreenStack({ navigation, route }) {
    return <QuizScreen
      navigation={navigation}
      route={route}
      />;
  }
  function BooksStack({ navigation, route }) {
    return <Books
      navigation={navigation}
      route={route}
      />;
  }

  export{
    LoginStack,
    TictactoeStack,
    GamesListStack,
    DashboardStack,
    DrawerStack,
    RewardsStack,
    GameBoardStack,
    HomeScreenStack,
    GameScreenStack,
    ProfileStack,
    WelcomeScreenStack,
    BooksStack,
    QuizScreenStack,
    PDFViewewStack,
    PDFViewrArticlesStack,
    NewsStack,
    quizScreenStack,
    ArticlesScreenStack,
    AboutUsStack,
    TimerScreenStack,
    CongratsQuizStack,
    NotificationsStack,
    SolitairStack,
    NewsReadStack,
    WelcomeGame4Stack,
    Game4MainStack,
    FinishGame4Stack,
    Top20Stack,
    DanzenGame5Stack
    }