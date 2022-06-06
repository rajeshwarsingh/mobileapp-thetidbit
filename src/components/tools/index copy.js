import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Text, View } from 'react-native'
import Swiper from 'react-native-swiper'
import NewsCard from './NewsCard'

const tools =[
  {
    name:'Market Mood',
    img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmJQ0tXzIpwyzZbNOrq_gSjL7Js--pVAfRNQ&usqp=CAU',
    desc:""
  },
  {
    name:'Investment',
    img:'https://www.lehnerinvestments.com/wp-content/uploads/2021/10/Growing_Graph_Plant-780x438.jpg',
    desc:""
  },
  {
    name:'Homeloan',
    img:'https://img.staticmb.com/mbcontent//images/uploads/2022/3/home-loan-closure-checklist.jpg',
    desc:""
  },
  {
    name:'Age Calculator',
    img:'https://play-lh.googleusercontent.com/my-QwEVsbjuC2ItmR_CWj1OkpkyF4lSzf4YNVZXCpnjIlUJIjNp7fe11HORCKjMhZQ',
    desc:""
  }
]

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

export default function NewsSlider() {

  const [news, setNews] = useState([])


  const newsSlid = tools.map((newsItem, i) => {
    return <View><NewsCard tools={tools} /></View>
  })

  return (
    <View style={{ flex: 1 }}>
     <NewsCard tools={tools[0]} />
     <NewsCard tools={tools[1]} />
     <NewsCard tools={tools[2]} />
     <NewsCard tools={tools[3]} />
    </View>
  )
}