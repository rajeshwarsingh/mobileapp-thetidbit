import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph,Headline,Divider } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const MyComponent = ({newsItem}) => {

  const getCategoryLinkName = (categoryLinkName)=>{
      let cat = ''

      switch(newsItem.category){
        case 'investmentguru': cat='investment-guru';
        break;
        case 'labouradvisor': cat='labour-advisor';
        break;
        case 'bussiness':cat='bussiness';
        break;
        case 'tockanalysis':cat='tock-analysis';
        break;
        case 'startup': cat='startup';
        break;
        case 'miscellaneous':cat='miscellaneous';
        break;
        default:cat='';
      }
        return cat
  }

  return(
  <Card style={{width:350}}>
    <Card.Cover style={{height:300}} source={{ uri: newsItem.homeImg }} />
    <Card.Content>
      <Title><Headline style={{fontWeight: "bold" }}>{newsItem.homeTitle}</Headline></Title>
      <Paragraph style={{fontSize: 16 }}>{newsItem &&newsItem.summery?newsItem.summery.substr(0,190):''}</Paragraph>
    </Card.Content>
    
     <Card.Actions>
     <Button onPress={() => WebBrowser.openBrowserAsync(`https://www.thetidbit.in/${getCategoryLinkName(newsItem.category)}/${newsItem.title}`)}>Read More ...</Button>
    </Card.Actions> 
    <Divider />
  </Card>
)
  };

export default MyComponent;