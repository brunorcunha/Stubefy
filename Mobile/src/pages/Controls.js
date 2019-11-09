import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native'

const Controls = ({
  paused,
  shuffleOn,
  repeatOn,
  onPressPlay,
  onPressPause,
  onBack,
  onForward,
  onPressShuffle,
  onPressRepeat,
  forwardDisabled,
}) => (
  <View style={styles.container}>
    <TouchableOpacity activeOpacity={0.0} onPress={onPressShuffle}>
        <Icon style={[styles.secondaryControl, shuffleOn ? [] : styles.off]} name="shuffle-variant" size={25} color="#fff" />
    </TouchableOpacity>
    <View style={{width: 40}} />
    <TouchableOpacity onPress={onBack}>
      <Icon name="skip-previous" size={40} color="#fff" />
    </TouchableOpacity>
    <View style={{width: 20}} />
    {!paused ?
      <TouchableOpacity onPress={onPressPause}>
        <View style={styles.playButton}>
          <Icon name="pause" size={50} color="#fff" />
        </View>
      </TouchableOpacity> :
      <TouchableOpacity onPress={onPressPlay}>
        <View style={styles.playButton}>
          <Icon name="play" size={50} color="#fff" />
        </View>
      </TouchableOpacity>
    }
    <View style={{width: 20}} />
    <TouchableOpacity onPress={onForward} disabled={forwardDisabled}>
        <Icon style={[forwardDisabled && {opacity: 0.3}]} name="skip-next" size={40} color="#fff" />
    </TouchableOpacity>
    <View style={{width: 40}} />
    <TouchableOpacity activeOpacity={0.0} onPress={onPressRepeat}>
      <Icon style={[styles.secondaryControl, repeatOn ? [] : styles.off]} name="repeat" size={25} color="#fff" />
    </TouchableOpacity>
  </View>
)

export default Controls

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  playButton: {
    height: 72,
    width: 72,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 72 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryControl: {
  },
  off: {
    opacity: 0.30,
  }
})