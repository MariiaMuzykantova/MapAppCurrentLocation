import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { MapView } from 'expo';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      address: '',
      region: {
        latitude: 60.200692,
        longitude: 24.934302,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
      }
    };
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      err => {
        alert("Fetching the current position is failed")
      }
    );
  }


  showLocation = () => {

    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.address + '&key=AIzaSyBxKK48nvrjoyS08u8HnGAiRZxHIy1yb0c'
    fetch(url)
      .then((respon) => respon.json())
      .then((responseData) => {
        const lat = responseData.results[0].geometry.location.lat;
        const lng = responseData.results[0].geometry.location.lng;

        this.setState({
          region: {
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0221
          }
        })
      });
    // add code here to get nearby restaurants from different api

  }
  onChangeRegion(region) {
    this.setState({ region })
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 1, height: 300, width: 300 }}
          onRegionChange={this.state.onRegionChange}
          region={this.state.region}
        >
          <MapView.Marker
            coordinate={{
              latitude: this.state.region.latitude,
              longitude: this.state.region.longitude
            }}
          />
        </MapView>
        <TextInput placeholder='Enter address'
          onChangeText={(address) => this.setState({ address })}
          value={this.state.address}
        />
        <Button title="SHOW" onPress={this.showLocation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
