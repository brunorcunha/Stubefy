import React, { Component } from 'react'

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native'

import Slider from '@react-native-community/slider'

export default function SeekBar ({}) {
  return (
    <View style={styles.container}>
      <Slider maximumTrackTintColor="#fff" />
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.text}>
          00:00
        </Text>
        <View style={{flex: 1}} />
        <Text style={[styles.text, {width: 40}]}>
          00:00
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  slider: {
    marginTop: -12,
  },
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  track: {
    height: 2,
    borderRadius: 1,
  },
  thumb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  text: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 12,
    textAlign:'center',
  }
})