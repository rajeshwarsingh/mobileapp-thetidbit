import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph,Headline } from 'react-native-paper';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
// import Share from './share'
import { Share } from 'react-native';

import ExpoShareing from './share'

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const MyComponent = ({newsInx,newsItem,navigation}) => {

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
        `Please install this app and stay safe , AppLink : https://www.thetidbit.in/sharenews?newsInx=${newsInx}`,
        url:"https://blog.addthiscdn.com/wp-content/uploads/2015/11/share.png"
      });
      if (result.action === Share.sharedAction) {
        
        if (result.activityType) {

          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  
  return (
  <Card style={{width:400, height:700}}>
    <Card.Cover style={{height:300}} source={{ uri: newsItem.url }} />
    {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
    <Card.Content>
      <Title><Headline style={{fontWeight: "bold" }}>{newsItem.name}</Headline></Title>
      
      <Paragraph style={{fontSize: 16 }}>{newsItem.description}</Paragraph>
      <Paragraph></Paragraph>
      <Paragraph>Author : {newsItem.author} / Published At : {(new Date(newsItem.publishedAt)).toLocaleString()}</Paragraph>
    </Card.Content>
    
    <Card.Actions>
    {/* <Button onPress={() => navigation.navigate('Details',{ title:'blog1', link:newsItem.link})}>Read More ...</Button> */}
    <Button onPress={() => WebBrowser.openBrowserAsync(newsItem.link)}>Read More ...</Button>
      {/* <Button>Share</Button> */}
      <Button onPress={onShare} title="Share" >Share</Button>
      {/* <ExpoShareing newsItem={newsItem}/> */}
    </Card.Actions>
  </Card>
);
}

export default MyComponent;