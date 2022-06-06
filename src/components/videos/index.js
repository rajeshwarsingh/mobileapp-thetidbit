import React, { useEffect, useState } from 'react';
import axios from "axios";
import NewsSLider from './NewsSlider'
import { Text, View } from 'react-native'

var styles = {
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
}

export default function Video () {
    const [news, setNews] = useState([])
    useEffect(async () => {

    let url = `https://thetidbit-mw.herokuapp.com/videos`

    var options = {
      method: 'GET',
      url: url
    };

    try {
      let response = await axios.request(options);

      if (response.status === 200) {
        setNews(response.data.videos)
      }
    } catch (e) {
      console.log("error in newsslide1:", e)
    }

  }, [])
    return (<View style={{ flex: 1 }}>
    <NewsSLider news={news} />
</View>
)
    }