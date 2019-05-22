import React from 'react';
import { Text } from 'react-native'
import { createAppContainer, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
let a =  class extends React.Component{
  render(){
    return <Text>123</Text>
  }
};

export default createAppContainer(createStackNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
}));

/* 
function () {
  return (
    <Text>123</Text>
  )
} */
