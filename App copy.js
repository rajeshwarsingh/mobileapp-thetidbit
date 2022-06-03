

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform, BackHandler, Alert, AsyncStorage, Modal, StyleSheet, Pressable } from 'react-native';
import { WebView } from 'react-native-webview'
import RadioGroup from 'react-native-radio-buttons-group';

import { setAndroidToken, getAndroidToken } from './src/api'

function PreferenceForm() {

  return <><Text>div this is form</Text></>
}


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const radioButtonsDataLang = [{
  id: '1', // acts as primary key, should be unique and non-empty string
  label: 'English',
  value: 'en'
}, {
  id: '2',
  label: 'Hindi',
  value: 'hi'
}]

const radioBtnDataCategory = [{
  id: '1', // acts as primary key, should be unique and non-empty string
  label: 'General',
  value: 'general'
}, {
  id: '2',
  label: 'Business',
  value: 'business'
}, {
  id: '3', // acts as primary key, should be unique and non-empty string
  label: 'Sports',
  value: 'sports'
}, {
  id: '4', // acts as primary key, should be unique and non-empty string
  label: 'Fun',
  value: 'entertainment'
}]

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [refComponent, setRefComponent] = useState(false);
  const [exitPressTime, setExitPressTime] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [radioButtonsLang, setRadioButtonsLang] = useState(radioButtonsDataLang)
  const [radioButtonsCat, setRadioButtonsCat] = useState(radioBtnDataCategory)
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);

    };
  }, []);

  useEffect(() => {
    const backAction = () => {
      let refCom = refComponent

      if (refComponent) {
        refCom = false
      } else {
        refCom = true
      }

      setRefComponent(refCom)

      //SHOW ALERT TO EXIT APP

      // Alert.alert("Hold on!", "want to goback", [
      //   {
      //     text: "Back",
      //     onPress: () => setRefComponent(refCom),
      //     style: "cancel"
      //   },
      //   { text: "YES", onPress: () => BackHandler.exitApp() }
      // ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    setModalVisible(true)
  }, [])

  const onNavigationStateChange = (navState) => {

    let time = new Date().getTime() - new Date((exitPressTime ? exitPressTime : new Date()).getTime())
    console.log('time :', time)
    if (time < 1000) {
      BackHandler.exitApp()
    }

    // setExitPressTime
    // console.log(time)



    setExitPressTime(new Date());
    let refCom = refComponent
    console.log('before refcom1: ', refCom)
    if (refComponent) {
      refCom = false
    } else {
      refCom = true
    }
    console.log('refcom: ', refCom)
    setRefComponent(refCom)
    // this.setState({
    //   canGoBack: navState.canGoBack
    // });
  }

  function onPressRadioButtonLang(radioButtonsArray) {
    setRadioButtonsLang(radioButtonsArray);
  }

  function onPressRadioButtonCat(radioButtonsArray) {
    setRadioButtonsCat(radioButtonsArray);
  }

  function onPressLearnMore(e) {
    // Alert
  }

  return (
    <>
      <PreferenceForm></PreferenceForm>
      {/* MODALPOPUP */}
      <View >
            <View style={styles.modalView}>
              <View><Text>what you love to show?</Text></View>
              <View><Text style={styles.modalText}>It will help us to give you personalized news, That you loved.</Text></View>
              <View><Text style={styles.modalText}>News Language</Text></View>
              <View style={{paddingLeft:50,marginLeft:50}}>
                <RadioGroup
                // containerStyle={{paddingLeft:50, margin:30}}
                  radioButtons={radioButtonsLang}
                  onPress={onPressRadioButtonLang}
                  layout='row'
                />
                <Text style={styles.modalText}>{"\n"}{"\n"}News you likes</Text>
                <RadioGroup
                  // containerStyle={{paddingLeft:50,margin:30}}
                  radioButtons={radioButtonsCat}
                  onPress={onPressRadioButtonCat}
                  layout='row'
                />

                <View style={styles.container}>
                  <View style={styles.buttonModal} ><Button
                    onPress={onPressLearnMore}
                    title="cancel"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                  /></View>
                  <View style={styles.buttonModal} ><Button
                    onPress={onPressLearnMore}
                    title="Submit"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                  /></View>
                </View>
              </View>
              {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable> */}

              {/* <Text style={styles.modalText}>Hide Modal</Text> */}







            </View>
          </View>
      {/* MODALPOPUP */}
      {/* {refComponent && <WebView 
      // style={styles.container}
      source={{ uri: 'https://thetidbit.in/' }}
      onNavigationStateChange= {onNavigationStateChange.bind(this)}
    />} */}
      {/* {!refComponent && <WebView 
      // style={styles.container}
      source={{ uri: 'https://thetidbit.in/' }}
    />} */}
    </>
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
    token = (await Notifications.getExpoPushTokenAsync()).data;
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    // width: 350,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
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
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "left"
  },
  container: {
    // flex: 1,
    // flexDirection: 'row',
    // // justifyContent: 'space-between',
    // margin:20,
    // padding:10
  },
  buttonModal: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "oldlace",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    // minWidth: "48%",
    textAlign: "center",
  }
});
