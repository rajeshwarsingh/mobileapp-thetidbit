import * as React from 'react';
import { Text, View,Dimensions } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph,Headline } from 'react-native-paper';
import VidPlayer from './vidPlayer'
const screenHeigh = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const MyComponent = ({newsItem,curVidInx,vidInx}) => {

  return (
  <Card style={{width:screenWidth, height:screenHeigh}}>
    <VidPlayer curVidInx={curVidInx} vidInx={vidInx} newsItem={newsItem} style={{ height:700}}/>
    <Card.Content>
      <Title><Headline style={{fontWeight: "bold" }}>{newsItem.name}</Headline></Title>
    </Card.Content>
  </Card>
)

};

export default MyComponent;