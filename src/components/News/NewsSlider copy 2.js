import * as React from 'react';
import {
  Text, 
  View,
  SafeAreaView, Dimensions } from 'react-native';

import Carousel from 'react-native-snap-carousel';

const screenHeigh = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

export default class App extends React.Component {

 
    constructor(props){
        super(props);
        this.state = {
          activeIndex:0,
          carouselItems: [
          {
              title:"Item 1",
              text: "Text 1",
          },
          {
              title:"Item 2",
              text: "Text 2",
          },
          {
              title:"Item 3",
              text: "Text 3",
          },
          {
              title:"Item 4",
              text: "Text 4",
          },
          {
              title:"Item 5",
              text: "Text 5",
          },
        ]
      }
    }

    _renderItem({item,index}){
        return (
          <View style={{
              // backgroundColor:'floralwhite',
              // borderRadius: 5,
              // height: 250,
              // padding: 50,
              // marginLeft: 25,
              // marginRight: 25, 
            }}
              >
            <Text style={{fontSize: 30}}>{item.title}</Text>
            <Text>{item.text}</Text>
          </View>

        )
    }

    render() {
        return (
          <SafeAreaView style={{flex: 1, }}>
            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                <Carousel
                sliderHeight={screenHeigh}
                sliderWidth={screenWidth}
                  layout={"default"}
                  ref={ref => this.carousel = ref}
                  data={this.state.carouselItems}
                  // sliderWidth={300}
                  // itemWidth={300}
                  useScrollView={true}
                  itemHeight={screenHeigh}
                  vertical={true}
                  renderItem={this._renderItem}
                  currentIndex={2}
                  currentScrollPosition={2}
                  // onSnapToItem = { index => this.setState({activeIndex:index}) } 
                  // ref={(c) => { this._carousel = c; }}
              // data={this.state.entries}
              // renderItem={this._renderItem}
              // sliderWidth={sliderWidth}
              // itemWidth={itemWidth}
                  />
                  
            </View>
          </SafeAreaView>
        );
    }
}

