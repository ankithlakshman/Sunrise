import React from 'react'
import{
    View,
    StyleSheet,
}from 'react-native';

import AnimatedButton from './AnimatedButton';
import CitySelection from './CitySelection';
import LinearGradient from 'react-native-linear-gradient';

export default class NoGroupPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            modalVisible: false
        }
        this.openSelector.bind(this);
        this.closeSelector.bind(this);
    }
    openSelector = () =>{
        this.setState({
            modalVisible: true
        })
    }
    closeSelector = () =>{
        this.setState({
            modalVisible: false
        })
    }
    render(){
        return(
            <LinearGradient colors ={['#020024','#090979', '#ff8200' ]} style = {styles.gradient} >
            <View style = {styles.container}>
                <CitySelection 
                    visible = {this.state.modalVisible} 
                    close = {this.closeSelector} 
                    addCity = {this.props.addCity}/>
                <AnimatedButton 
                    label = 'Add a City' 
                    width = {160} 
                    height = {45} 
                    color = 'rgba(0,0,0,0.3)' 
                    labelColor = 'orange'
                    onPress = {this.openSelector}
                    />
            </View>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }, 
    gradient: {
        flex:1,
    }
  })