import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Text, View } from 'react-native'
import Swiper from 'react-native-swiper'
import NewsCard from './NewsCard'

var styles = {
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
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

export default function NewsSlider({navigation}) {

  const [news, setNews] = useState([])

  useEffect(async () => {
    
    let url = `https://thetidbit-mw.herokuapp.com/news/getCategoryNews`

    var options = {
      method: 'GET',
      url: url,
      params: { q: 'general' }
    };

    try {
      let response = await axios.request(options);
      if (response.status === 200) {
        setNews(response.data)
      }
    } catch (e) {
      console.log("error in newsslide:", e)
    }

  }, [])

  const newsSlid = news.map((newsItem, i) => {
    return <View key={i} testID="Hello" style={styles.slide1}>
      <Text style={styles.text}><NewsCard navigation={navigation} newsItem={newsItem} /></Text>
    </View>
  })

  return (
    <View style={styles.container}>
      <Swiper showsPagination={false} horizontal={false} style={styles.wrapper} loop={false}>
        {newsSlid}
      </Swiper>
    </View>
  )
}