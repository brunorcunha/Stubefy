import React from 'react'
import { YellowBox } from 'react-native'

import './config/Reactotron'

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
])

import Routes from './routes'

export default function App () {
  return <Routes />
}
