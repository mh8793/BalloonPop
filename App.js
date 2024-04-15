// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from './src/components/StartScreen';
import GameScreen from './src/components/GameScreen';
import EndScreen from './src/components/EndScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartScreen">
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="GameScreen" component={GameScreen} />
        <Stack.Screen name="EndScreen" component={EndScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}