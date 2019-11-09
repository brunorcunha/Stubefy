import React, { Component } from 'react'
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import logo from '../assets/logo.png'

const Header = ({
  message,
  onMenuPress,
  onSearchPress,
  onMessagePress,
}) => ( 
  <View style={styles.container}>
    <TouchableOpacity onPress={onMenuPress}>
      <Icon style={styles.button} name="menu" size={30} color="#fff" />
    </TouchableOpacity>
    <TouchableOpacity onPress={onMenuPress} style={styles.message}>
      <Image         
        source={logo}
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={onSearchPress}>
      <Icon style={styles.button} name="magnify" size={30} color="#fff" />
    </TouchableOpacity>
  </View>
)

export default Header

const styles = StyleSheet.create({
  container: {
    height: 72,
    paddingTop: 20,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row'
  },
  message: {
    flex: 1,
    alignItems: 'center'
  },
  button: {
    opacity: 0.72
  }
})