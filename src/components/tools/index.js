import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, SafeAreaView, ScrollView, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Appbar, Menu } from 'react-native-paper';
import NewsCard from './NewsCard'
import Browser from './Browser';

const tools =[
  {
    name:'Market Mood',
    route:'mmi',
    img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmJQ0tXzIpwyzZbNOrq_gSjL7Js--pVAfRNQ&usqp=CAU',
    desc:""
  },
  {
    name:'Investment',
    route:'investment',
    img:'https://www.lehnerinvestments.com/wp-content/uploads/2021/10/Growing_Graph_Plant-780x438.jpg',
    desc:""
  },
  {
    name:'Homeloan',
    route:'homeloan',
    img:'https://img.staticmb.com/mbcontent//images/uploads/2022/3/home-loan-closure-checklist.jpg',
    desc:""
  },
  {
    name:'Age Calculator',
    route:'age',
    img:'https://play-lh.googleusercontent.com/my-QwEVsbjuC2ItmR_CWj1OkpkyF4lSzf4YNVZXCpnjIlUJIjNp7fe11HORCKjMhZQ',
    desc:""
  }
]

var styles = {
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    margin:10,
    height:620
  },
  container: {
    flex: 1
  },

  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
}
const Stack = createStackNavigator();

function CustomNavigationBar({ navigation, back }) {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Appbar.Header style={{height:0}}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
    </Appbar.Header>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: (props) => <CustomNavigationBar style={{padding:0, margin:0}} {...props} />,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={Browser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {

  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
    <View style={{ flex: 1 }}>
     <NewsCard navigation={navigation} tools={tools[0]} />
     <NewsCard navigation={navigation} tools={tools[1]} />
     <NewsCard navigation={navigation} tools={tools[2]} />
     <NewsCard navigation={navigation} tools={tools[3]} />
    </View>
      </ScrollView>
    </SafeAreaView>
  )
}