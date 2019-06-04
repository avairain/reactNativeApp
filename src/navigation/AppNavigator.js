import React from 'react';
import { Text } from 'react-native'
import { createAppContainer, createStackNavigator, createDrawerNavigator } from 'react-navigation'

import { DrawerLayout, DrawerLayout1 } from '../components/LeftExmList/index'
import MainTabNavigator from './MainTabNavigator';

export default createAppContainer(createStackNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  DrawerLayout: createDrawerNavigator({
    Drawer: {
      screen: DrawerLayout
    },
    Drawer1: {
      screen: DrawerLayout1
    }
  })
}))
