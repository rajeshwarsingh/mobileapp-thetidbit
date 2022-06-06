import React from 'react';
import {View} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
const App = ({data}) => {
    return (
      <View>
        <YoutubePlayer
      height={700}
        play={true}
        videoId={data.code}
        />
      </View>
    );
};

export default App