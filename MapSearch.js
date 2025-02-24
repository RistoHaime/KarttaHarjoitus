import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState,  } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const latitudeDelta = 0.0322
const longitudeDelta = 0.0221

export default function MapSearch() {
 

  const mapRef = React.createRef();

  const [data, setData] = useState([ 24.934302, 60.200692])
  const [name, setName] = useState("haaga-helia")
  const [search, setSearch] = useState("");
  const [coordinates, setCoordinates] = useState([{ 
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta,
    longitudeDelta,
    }]
  )
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
  .then(responseData => {setData(responseData.bbox), setName(responseData.features[0].properties.label)})
  }

React.useEffect(() => {
setCoordinates({latitude: data[1], longitude: data[0]})
mapRef.current.animateToRegion({
  latitude: data[1],
  longitude: data[0],
  latitudeDelta,
  longitudeDelta
})
},[data])
 
return (
 <View style={{flex: 1, flexDirection: 'column',}}>
<MapView
  style={{ width: '100%', height: '75%' , marginTop: '10'}}
  initialRegion={{latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta,
    longitudeDelta,}}
    ref={mapRef}
  >
  <Marker 
  coordinate={coordinates}
  title={name}/>

<StatusBar style="auto" />
</MapView>

      <View > 
        <Button title='Search' onPress={getSearchResult}/>
        <TextInput placeholder='search' onChangeText={text => setSearch(text)} value={search}/>
          
         </View>
</View> 
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