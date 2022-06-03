import * as React from 'react';
import { View, Image } from 'react-native';
import { RadioButton, Text, Button, Headline, Subheading } from 'react-native-paper';
import logo from '../../assets/choose.jpg';

const LangRadioComponent = ({ setLangValue }) => {
  const [value, setValue] = React.useState('en');
  const onValueChange = newValue => {
    setLangValue(newValue)
    setValue(newValue)
  }

  return (
    <RadioButton.Group onValueChange={onValueChange} value={value}>
      <View style={{ flexDirection: "row", alignItems: 'center' }}>
        <View style={{ flex: 1 }}><Text>English</Text></View><View style={{ flex: 1 }}><RadioButton value="en" /></View>
      </View>
      <View style={{ flexDirection: "row", alignItems: 'center' }}>
        <View style={{ flex: 1 }}><Text>Hindi</Text></View><View style={{ flex: 1 }}><RadioButton value="hi" /></View>
      </View>
    </RadioButton.Group>
  );
};


const PreferenceComponent = ({ setPreference }) => {
  const [valueCat, setValueCat] = React.useState('general');
  const [valueLang, setValueLang] = React.useState('en');

  const handleCancel = () => {
    setPreference({ language: valueLang, category: valueCat })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setPreference({ language: valueLang, category: valueCat })
  }

  const onLangValueChange = newValue => {
    setValueLang(newValue)
  }

  return (
    <View style={{ margin: 5, paddingBottom: 10}}>
      <View style={{ margin: 15 }}><Headline>What you like us to show?</Headline></View>
      <View style={{ width: '100%', height: 100 }}>

        <Image source={logo} style={{ width: '100%', height: 100 }} />
      </View>
      <View style={{ margin: 15 }}><Text>It will help us to give you personalized news, That you loves.</Text></View>
      <View></View>

      <View style={{ margin: 15 }}>
        <View><Subheading>News Language</Subheading></View>
        <View style={{ margin: 15 }}><LangRadioComponent setLangValue={onLangValueChange} /></View>
      </View>
      <View style={{ margin: 15 }}>
        <View><Subheading>News you likes</Subheading></View>
        <View style={{ margin: 15 }}>
          <RadioButton.Group onValueChange={newValue => setValueCat(newValue)} value={valueCat}>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
              <View style={{ flex: 1 }}><Text>General</Text></View><View style={{ flex: 1 }}><RadioButton value="general" /></View>
            </View>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
              <View style={{ flex: 1 }}><Text>Business</Text></View><View style={{ flex: 1 }}><RadioButton value="business" /></View>
            </View>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
              <View style={{ flex: 1 }}><Text>Sports</Text></View><View style={{ flex: 1 }}><RadioButton value="sports" /></View>
            </View>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
              <View style={{ flex: 1 }}><Text>Entertainment</Text></View><View style={{ flex: 1 }}><RadioButton value="entertainment" /></View>
            </View>
          </RadioButton.Group>
        </View>
      </View>
      <View >
        <Button style={{ margin: 5 }} color='red' mode="contained" onPress={handleSubmit}> Submit</Button>
        <Button style={{ margin: 5 }} color='grey' mode="contained" onPress={handleCancel}> Cancel</Button>
      </View>
    </View>
  );
};

export default PreferenceComponent;