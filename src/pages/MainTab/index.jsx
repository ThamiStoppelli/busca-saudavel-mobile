import {  View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import About from './About';
import Favorite from './Favorite';
import Home from './Home';
import User from './User';

import homeOff from '../../../assets/menu/home-off.png';
import homeOn from '../../../assets/menu/home-on.png';
import heartOff from '../../../assets/menu/heart-off.png';
import heartOn from '../../../assets/menu/heart-on.png';
import aboutOff from '../../../assets/menu/about-off.png';
import aboutOn from '../../../assets/menu/about-on.png';
import userOff from '../../../assets/menu/user-off.png';
import userOn from '../../../assets/menu/user-on.png';

const Tab = createBottomTabNavigator()

export default function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          backgroundColor: '#7FA492',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          display: 'flex',
          height:  74,
          alignItems: 'space-between',
          zIndex: 1
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 15, color: 'white' }}>
              <Image
                source={focused ? homeOn : homeOff}
                resizeMode="contain"
                style={{ width: 30, height: 30 }}
              />
            </View>
          )
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 15, color: 'white' }}>
              <Image
                source={focused ? heartOn : heartOff}
                resizeMode="contain"
                style={{ width: 30, height: 30 }}
              />
            </View>
          )
        }}
      />
      <Tab.Screen
        name="About"
        component={About}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 15, color: 'white' }}>
              <Image
                source={focused ? aboutOn : aboutOff}
                resizeMode="contain"
                style={{ width: 30, height: 30 }}
              />
            </View>
          )
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 15, color: 'white' }}>
              <Image
                source={focused ? userOn : userOff}
                resizeMode="contain"
                style={{ width: 30, height: 30 }}
              />
            </View>
          )
        }}
      />
    </Tab.Navigator>
  )    
}