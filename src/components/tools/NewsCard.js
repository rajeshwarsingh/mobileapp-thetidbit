import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph,Headline } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const MyComponent = ({tools, newsItem, navigation}) => {

  return(
  <Card onPress={() => navigation.navigate('Details',{ title:'blog1', link:`https://www.thetidbit.in/calculator/${tools.route}` })} style={{margin:5,width:400, height:150}}>
    <Card.Cover style={{height:100}} source={{ uri: tools.img }} />
    <Card.Content>
      <Title><Headline style={{fontWeight: "bold" }}>{tools.name}</Headline></Title>
      <Paragraph></Paragraph>
    </Card.Content>
  </Card>
);

  }

export default MyComponent;