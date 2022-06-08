import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import {  connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import NewsRoute from './components/News'
import VideosRoute from './components/videos'
import BlogsRoute from './components/blogs'
import ToolsRoute from './components/tools' 
import setCurNewsIndex from '../src/store/action/action'
import { useDispatch } from 'react-redux'

const MyComponent = (props) => {
  const dispatch = useDispatch()

  console.log(dispatch)
  React.useEffect(()=>{
    if(props.source && props.source.queryParams){
      
      let newsInx = props.source.queryParams.newsinx?props.source.queryParams.newsinx:0
      dispatch({ type: 'set-cur-news-tab', curNewsIndex:newsInx })
    }
    
    // setCurNewsIndex(1)
    // setIndex(0)
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

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      shifting={false}
      news={'one'}
    />
  );
};

// let StaticCounterContainer = connect(state => ({ count: state.count }))(
//   StaticCounter
// );

function mapStateToProps(state) {
  console.log("state@@@@@@@@@@@",state)
  return { }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setCurNewsIndex: (curNewsIndex) => dispatch(setCurNewsIndex(curNewsIndex))
//   }
// }

export default connect(mapStateToProps,null)(MyComponent)
// export default MyComponent;