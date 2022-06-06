import React, { useEffect, useState } from 'react'
import axios from "axios";
import { StyleSheet,View, Text, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import Swiper from 'react-native-swiper'
import NewsCard from './NewsCard'

var styles = {
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#9DD6EB',
    margin:10,
    // height:620
  },
  container: {
    flex: 1
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

  let url = `https://thetidbit-mw.herokuapp.com/blogs/getFeaturedBlogs`
 
   try {
    const res = await fetch(url)
    const data = await res.json()
    setNews(data.blogs)
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
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <View style={{flex:1,margin:10,textAlign:'center'}}>
          
        {newsSlid}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}