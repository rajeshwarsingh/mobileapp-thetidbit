import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import {  connect } from 'react-redux';
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import NewsRoute from './components/News'
import VideosRoute from './components/videos'
import BlogsRoute from './components/blogs'
import ToolsRoute from './components/tools'
import PreferenceComponent from './components/PreferenceComponent'

const MyComponent = (props) => {
  const [showPreference, setShowPreference] = React.useState(false);
  const [langState, setLangState] = React.useState('');

  const dispatch = useDispatch()

  const getData = async () => {

    try {
      // CHECK STORED PREFERENCE
      let prefData = await AsyncStorage.getItem('peference')

      prefData = prefData ? JSON.parse(prefData) : ''

      if (prefData && prefData.language) {
        dispatch({ type: 'set-cur-pref-lang', curPrefLang:prefData.language })
      } else {
        setShowPreference(true)
      }

    } catch (e) {
      console.log('Error in getdata component didmount :', e)
      setCategoryState('general')
    }
  }
  React.useEffect(()=>{
    getData()
  },[])

  React.useEffect(()=>{
    if(props.source && props.source.queryParams){
      let newsInx = props.source.queryParams.newsInx?props.source.queryParams.newsInx:0
       newsInx = parseInt(newsInx)
      dispatch({ type: 'set-cur-news-tab', curNewsIndex:newsInx })
    }
  },[])

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'news', title: 'News', icon: 'newspaper' },
    { key: 'videos', title: 'Videos', icon: 'video-stabilization' },
    { key: 'blogs', title: 'Blogs', icon: 'forum-outline' },
    { key: 'tools', title: 'Tools', icon: 'finance' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    news: NewsRoute,
    videos: VideosRoute,
    blogs: BlogsRoute,
    tools: ToolsRoute,
  });

  const setPreferenceComponentCall = async (preference) => {

    try {
      if (preference.language) {
        await AsyncStorage.setItem('peference', JSON.stringify({ language: preference.language }));
        dispatch({ type: 'set-cur-pref-lang', curPrefLang:preference.language }) 
      } else {
        setLangState('en')
      }
    } catch (error) {
      // Error saving data
      console.log('Error app setPreference**********:', error)
      setLangState('en')
    }

    setShowPreference(false)
  }

  return (
    <>
    {showPreference && <PreferenceComponent setPreference={setPreferenceComponentCall} />}
    {!showPreference &&<BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={(i)=>{
        setIndex(i);
        dispatch({ type: 'set-cur-tab', curTab:i });

      }}
      renderScene={renderScene}
      shifting={false}
      news={'one'}
    />}
    
    
    </>
  );
};

export default connect(null,null)(MyComponent)