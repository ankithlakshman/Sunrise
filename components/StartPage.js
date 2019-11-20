import React from 'react';
import{
    View,
    Text,
    StyleSheet, 
    ActivityIndicator
}from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

export default class StartPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <LinearGradient colors ={['#020024','#090979', '#ff8200' ]} style = {styles.gradient}>
                <View style = {styles.container}>
                    <Text style = {styles.title}>Sunrise</Text>
                    <ActivityIndicator size = 'large'/>
                </View>
            </LinearGradient>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '50%',
        alignItems: 'center'
      },
      title: {
        paddingVertical: 30, 
        fontSize: 40, 
        fontWeight: 'bold',
        color: 'orange',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 10
      },
      gradient: {
          flex: 1
      }
})