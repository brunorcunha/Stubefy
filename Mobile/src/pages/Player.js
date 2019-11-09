import React, { Component } from 'react'
import {
  View,
  Text,
  StatusBar,
} from 'react-native'
import Header from './Header'
import AlbumArt from './AlbumArt'
import TrackDetails from './TrackDetails'
import SeekBar from './SeekBar'
import Controls from './Controls'
import Video from 'react-native-video'

export default class Player extends Component {
  constructor (props) {
    super(props)

    this.state = {
      paused: false,
      totalLength: 1,
      currentPosition: 0,
      selectedTrack: 0,
      repeatOn: false,
      shuffleOn: false
    }
  }

  setDuration (data) {
    this.setState({totalLength: Math.floor(data.duration)})
  }

  setTime (data) {
    this.setState({currentPosition: Math.floor(data.currentTime)})
  }

  seek (time) {
    time = Math.round(time)
    this.refs.audioElement && this.refs.audioElement.seek(time)
    this.setState({
      currentPosition: time,
      paused: false
    })
  }

  onBack () {
    if (this.state.currentPosition < 10 && this.state.selectedTrack > 0) {
      this.refs.audioElement && this.refs.audioElement.seek(0)
      this.setState({ isChanging: true })
      setTimeout(() => this.setState({
        currentPosition: 0,
        paused: false,
        totalLength: 1,
        isChanging: false,
        selectedTrack: this.state.selectedTrack - 1
      }), 0)
    } else {
      this.refs.audioElement.seek(0)
      this.setState({
        currentPosition: 0
      })
    }
  }

  onForward () {
    if (this.state.selectedTrack < this.props.tracks.length - 1) {
      this.refs.audioElement && this.refs.audioElement.seek(0)
      this.setState({ isChanging: true })
      setTimeout(() => this.setState({
        currentPosition: 0,
        totalLength: 1,
        paused: false,
        isChanging: false,
        selectedTrack: this.state.selectedTrack + 1
      }), 0)
    }
  }

  render () {
    const navigation = this.props.navigation
    const trackParam = navigation.getParam('track', null)
    const track = trackParam || this.props.tracks[this.state.selectedTrack]
    const video = this.state.isChanging ? null : (
      <Video 
        source={{uri: track.audioUrl}} 
        ref="audioElement"
        paused={this.state.paused}               
        resizeMode="cover"           
        repeat={true}                
        onLoadStart={this.loadStart} 
        onLoad={this.setDuration.bind(this)}    
        onProgress={this.setTime.bind(this)}    
        onEnd={this.onEnd}           
        onError={this.videoError}    
        style={styles.audioElement} 
        playInBackground={true}  
        playWhenInactive={true} 
        audioOnly={true} 
      />
    )

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Header 
          message="Reproduzindo do Youtube" 
          onSearchPress={() => navigation.navigate('Search')} 
        />
			  <AlbumArt url={track.albumArtUrl} />
        <TrackDetails title={track.title} artist={track.artist} />
        <SeekBar
          onSeek={this.seek.bind(this)}
          trackLength={this.state.totalLength}
          onSlidingStart={() => this.setState({paused: true})}
          currentPosition={this.state.currentPosition} 
        />
        <Controls
          onPressRepeat={() => this.setState({repeatOn : !this.state.repeatOn})}
          repeatOn={this.state.repeatOn}
          shuffleOn={this.state.shuffleOn}
          forwardDisabled={this.state.selectedTrack === this.props.tracks.length - 1}
          onPressShuffle={() => this.setState({shuffleOn: !this.state.shuffleOn})}
          onPressPlay={() => this.setState({paused: false})}
          onPressPause={() => this.setState({paused: true})}
          onBack={this.onBack.bind(this)}
          onForward={this.onForward.bind(this)}
          paused={this.state.paused}
        />
        {video}
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'rgb(4,4,4)'
  },
  audioElement: {
    height: 0,
    width: 0
  }
}