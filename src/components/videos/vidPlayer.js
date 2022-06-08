import * as React from 'react';
import { View, StyleSheet, Button,Dimensions } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';

const screenHeigh = Dimensions.get('window').height

export default function App({newsItem, curVidInx,vidInx}) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  React.useEffect(()=>{

  },[])
  return (
    <View >
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: newsItem.url,
        }}
        shouldPlay={(curVidInx===vidInx)}
        isMuted={false}
        rate={1.0}
        volume={1.0}
        useNativeControls
        resizeMode="cover"
        isLooping={true}
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    // alignSelf: 'center',
    // width: 320,
    height: screenHeigh,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
