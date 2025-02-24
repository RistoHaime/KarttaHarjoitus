import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState,  } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const latitudeDelta = 0.0322
const longitudeDelta = 0.0221

export default function AreaMap() {
 

  const mapRef = React.createRef();

  const [data, setData] = useState([ 24.934302, 60.200692])
  const [search, setSearch] = useState("");
  const [currentRegion, setCurrentRegion] = useState([]);
const [bikeStations, setBikeStations] = useState([]);
 const BIKE_STATIONS = "https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.geojson"          
  const url = "https://api.digitransit.fi/geocoding/v1/search?text="
  const digiKey = "16532c5b6caf4d5e9aff391b177386e1"
  const getSearchResult = () => {
    const response =  fetch(url+ search + "&size=1", {
      method: 'GET',
      // Request headers
      headers: {
          'Cache-Control': 'no-cache',
          'digitransit-subscription-key': digiKey,}
  })
  .then(response =>  { 
    if (!response.ok)
      throw new Error("Error in fetch: " + response.statusText);  
    
    return response.json();
  })
  .then(responseData => {setData(responseData.bbox)})
  }

  async function getBikeStations() {
    const response = await fetch(BIKE_STATIONS);
    if (!response.ok){
      console.log(response)
      throw new Error(`REceived status code ${response.status}`);
    }
    const json = await response.json();
    return json.features;
  }
React.useEffect(() => {
mapRef.current.animateToRegion({
  latitude: data[1],
  longitude: data[0],
  latitudeDelta,
  longitudeDelta
})
},[data])
React.useEffect(() =>{
  getBikeStations().then(stations => setBikeStations(stations))
  },[])
  const handleRegionChangeComplete = (region) => {
    console.log('Current Region:', region)
   setCurrentRegion(region);
  {results}
  };
  const results =  bikeStations.filter(filterList);
   function filterList(station){
    return station.geometry.coordinates[1] - currentRegion.latitude < 0.01 
    && station.geometry.coordinates[1] - currentRegion.latitude > -0.01 
    && station.geometry.coordinates[0] - currentRegion.longitude < 0.01 
    && station.geometry.coordinates[0] - currentRegion.longitude > -0.01;
   }
return (
 <View style={{flex: 1, flexDirection: 'column',}}>
<MapView
  style={{ width: '100%', height: '75%' , marginTop: '10'}}
  initialRegion={{latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta,
    longitudeDelta,}}
    ref={mapRef}
    onRegionChangeComplete={handleRegionChangeComplete}
  >
 {results.map((station) =>
  <Marker coordinate={{latitude: station.geometry.coordinates[1], longitude: station.geometry.coordinates[0]}}/>
)
}
<StatusBar style="auto" />
</MapView>
      <View > 
        <Button title='Search' onPress={getSearchResult}/>
        <TextInput placeholder='search' onChangeText={text => setSearch(text)} value={search}/>
         </View>
</View> 
  );
}



           



 