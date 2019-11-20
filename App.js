import React from 'react';
import {
  View, 
  Text,
  StyleSheet,
  ActivityIndicator, 
  FlatList,
}from 'react-native';

import NoGroupPage from './components/NoGroupPage';
import StartPage from './components/StartPage';
import WeatherPage from './components/WeatherPage'

const api = {
  key: '&appid=e4b4b3d7de16a6c1c7dbff8e03d667ad',
  uri: 'https://api.openweathermap.org/data/2.5/weather?id='
};
export default class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      isLoading: true,
      data: null,
      savedCities: [],
    }
  }
  fetchdata(){
    console.log(this.state.savedCities[0])
    fetch(api.uri+this.state.savedCities[0]+api.key)
      .then((response) => response.json())
      .then(responseJson => {
        this.setState({
          data: responseJson,
        })
        console.log(responseJson)
      });
  }
  componentDidMount(){
    if(this.state.savedCities.length > 1){
      this.fetchdata();
    }
    this.setState({
      isLoading: false
    })
  }
  addCity = (id) => {
    this.state.savedCities.push(id);
    this.setState({
      savedCities: this.state.savedCities
    })
    console.log(this.state.savedCities)
  }
  render(){
    if(this.state.isLoading){
      //If the app is currently loading
      return(
        <StartPage/>
      )
    }
    else if(this.state.savedCities.length == 0){
      //If there are no saved cities
      return(
        <NoGroupPage addCity = {this.addCity}/>
      )
    }
    else{
      if(!this.state.data){
        this.fetchdata();
        return(
          <View style = {homestyles.container}>
            <Text>Your city is Loading...</Text>
            <ActivityIndicator size = 'small'/>
          </View>
        )
      }
      else{
        return(
          <WeatherPage data = {this.state.data}/>
        )
      }
      
    }
    
  }
}

const homestyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '50%',
    alignItems: 'center'
  },
})

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
  }
})

