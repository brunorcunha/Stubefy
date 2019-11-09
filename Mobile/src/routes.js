import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import Main from './pages/Main'
import Search from './pages/Search'

export default createAppContainer(
  createSwitchNavigator({
    Main,
    Search
  })
)
