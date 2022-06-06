import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

import NewsRoute from './components/News'
import VideosRoute from './components/videos'
import BlogsRoute from './components/blogs'
import ToolsRoute from './components/tools'

const MyComponent = () => {
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

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      shifting={false}
    />
  );
};

export default MyComponent;