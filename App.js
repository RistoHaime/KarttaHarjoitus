import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState,  } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapSearch from './MapSearch';
import AreaMap from './AreaMap';


const Tab = createBottomTabNavigator();
export default function App() {
 

 
 
return (
 <NavigationContainer>
  <Tab.Navigator>
  <Tab.Screen name="MapSearch" component={MapSearch}/>
  <Tab.Screen name="AreaMap" component={AreaMap} />
  </Tab.Navigator>
 </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



// {"bbox": [24.932362, 60.169018, 24.932362, 60.169018], "features": [{"geometry": [Object], "properties": [Object], "type": "Feature"}], "geocoding": {"attribution": "http://pelias-api:8080/attribution", "engine": {"author": "Mapzen", "name": "Pelias", "version": "1.0"}, "query": {"boundary.country": [Array], "lang": "fi", "parsed_text": [Object], "private": false, "querySize": 20, "size": 1, 
// "text": "kamppi"}, "timestamp": 1739847083458, "version": "0.2"}, "type": "FeatureCollection"