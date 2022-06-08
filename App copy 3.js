import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as React from 'react';
import {Text} from 'react-native'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import App from './src/App';

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';

import { setAndroidToken, getAndroidToken } from './src/api';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1976D2',
    accent: 'yellow',
  },
};

function Home(){
  return <Text>home screen</Text>
}

function Settings(){
  return <Text>Settings</Text>
}

const prefix = Linking.makeUrl('/')
const Stack = createStackNavigator();

export default function Main() {

  const [expoPushToken, setExpoPushToken] = React.useState('');
  const [notification, setNotification] = React.useState(false);
  const [refComponent, setRefComponent] = React.useState(false);
  const [exitPressTime, setExitPressTime] = React.useState('');
  const [showPreference, setShowPreference] = React.useState(false);
  const [langState, setLangState] = React.useState('');
  const [categoryState, setCategoryState] = React.useState('');
  const notificationListener = React.useRef();
  const responseListener = React.useRef();
  const [data, setData] = React.useState(null);

  const linking ={
    prefixes:[prefix],
    config:{
      screen:{
        Home:'home',
        Settings:'settings'
      }
    }
  }

  React.useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      // console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  React.useEffect(async () => {
    await setTestDeviceIDAsync('EMULATOR');
  }, [])
  const handleDeepLink = (e)=>{
    console.log("e*******",e)
    let data = Linking.parse(e.url)
    console.log("data :", data)
  }
  React.useEffect(()=>{
    console.log('useEffect URL:')
    async function getInitialUrl(){
      console.log('initial URL:')
      const initialURL= await Linking.getInitialURL();
      if(initialURL)setData(Linking.parse(initialURL))
    }

    Linking.addEventListener('url',handleDeepLink)
    if(!data){
      getInitialUrl();
    }

    return ()=>Linking.removeEventListener('url');
    
  },[])

  return (
    <NavigationContainer Linking>
      <Stack.Navigator>
        <Stack.Screen name="home" component={Home}/>
        <Stack.Screen name="settings" component={Settings}/>
      </Stack.Navigator>
    </NavigationContainer>
    // <PaperProvider theme={theme}>
    //   {/* <AdMobBanner
    //     bannerSize="fullBanner"
    //     // adUnitID="ca-app-pub-9155008277126927/7669993848" // prod
    //     adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID
    //     servePersonalizedAds // true or false
    //     onDidFailToReceiveAdWithError={this.bannerError} /> */}
       
    //   <App />
    //   <Text>{data?JSON.stringify(data):'app not open'}</Text>
    // </PaperProvider>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getDevicePushTokenAsync()).data;
    await setAndroidToken(token)
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}