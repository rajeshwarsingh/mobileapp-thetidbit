import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Button, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';

import App from './src/App';
import { setAndroidToken, getAndroidToken } from './src/api';

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

  const _handleOpenWithLinking = () => {
    Linking.openURL('https://docs.expo.io/');
  };

  const _handleOpenWithWebBrowser = () => {
    WebBrowser.openBrowserAsync('https://expo.dev');
  };

  return (
    <PaperProvider theme={theme}>
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-9155008277126927/7669993848" // prod
        // adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID
        servePersonalizedAds // true or false
        onDidFailToReceiveAdWithError={this.bannerError} />

        <Button
          title="Open URL with ReactNative.Linking"
          onPress={()=>Linking.openURL('https://docs.expo.io/')}
          style={styles.button}
        />
        <Button
          title="Open URL with Expo.WebBrowser"
          onPress={()=>WebBrowser.openBrowserAsync('https://docs.expo.io/')}
          style={styles.button}
        />


      <App />
    </PaperProvider>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  button: {
    marginVertical: 10,
  },
});