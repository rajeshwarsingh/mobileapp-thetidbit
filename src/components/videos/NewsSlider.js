
import React, { useEffect, useState } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import axios from "axios";
import Swiper from 'react-native-swiper';
import NewsCard from './NewsCard';

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
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
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})

export default function SwiperComponent({ news = [] }) {

  const [indexChanged, setIndexChanged] = useState(0)
  const [swiperIndex, setSwiperIndex] = useState([])

  const newsSlid = news.map((newsItem, i) => {
    return <View key={i} testID="Hello" style={styles.slide1}>
      <Text style={styles.text}>
        <NewsCard curVidInx={indexChanged} vidInx={i} newsItem={newsItem} />
      </Text>
    </View>
  })

  return (
    <View style={{ flex: 1 }}>
      {news.length >0 &&<Swiper
        style={styles.wrapper}
        onIndexChanged={inx => setIndexChanged(inx)}
        showsPagination={false}
        horizontal={false}
        loop={false}>
        {newsSlid}
      </Swiper>}
    </View>
  )

}