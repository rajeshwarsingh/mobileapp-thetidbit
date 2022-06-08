import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Appbar, Menu } from 'react-native-paper';
import { WebView } from 'react-native-webview'
import NewsSLider from './NewsSlider'
import Browser from './Browser';
import { useSelector } from 'react-redux'
const Stack = createStackNavigator();

function CustomNavigationBar({ navigation, back }) {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Appbar.Header style={{height:0}}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="Blogs" />
    </Appbar.Header>
  );
}

export default function App() {
  const counter = useSelector((state) => state.news)
  console.log("counter1:",counter)
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={Browser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  return (<View style={{ flex: 1 }}>
    <NewsSLider navigation={navigation} />
  </View>
  );
}