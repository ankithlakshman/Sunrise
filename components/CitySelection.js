import React from 'react';
import{
    View,
    Text, 
    Modal,
    SafeAreaView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
}from 'react-native';

import CityList from './CityList'
import ExitButton from './ExitButton'
const api = {
    key: '&appid=e4b4b3d7de16a6c1c7dbff8e03d667ad',
    uri: 'https://api.openweathermap.org/data/2.5/weather?q='
  };
export default class CitySelection extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: this.props.visible,
            isLoading: false
        }
    }
    updateData(input){
        this.setState({
            isLoading: true
        })
        fetch('https://api.openweathermap.org/data/2.5/find?q='+input+api.key)
            .then((response) => response.json())
            .then((responseJSON) => {
                this.setState({
                    data: responseJSON.list
                });
                console.log(responseJSON);
            })
        this.setState({
            isLoading: false
        })
    }
    render(){
        return(
            <Modal
                animationType = 'slide'
                visible = {this.props.visible}
                animated
                useNativeDriver
                transparent = {true}
            >
                <SafeAreaView style = {styles.container}>
                    <ExitButton onPress = {this.props.close}/>
                    <Text style = {styles.title}>Please Select a City:</Text>
                    
                    <TextInput
                        style = {styles.input}
                        clearButtonMode = 'always'
                        selectionColor = 'white'
                        keyboardAppearance = 'dark'
                        onChangeText = {(text) => {
                            console.log(text)
                            this.updateData(text);
                        }}
                    />
                    {
                        this.state.isLoading ? (
                            <ActivityIndicator/>
                        ):(
                            <CityList data = {this.state.data} addCity = {this.props.addCity}/>
                        )
                    }
                    
                </SafeAreaView>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 30,
        backgroundColor:'rgba(0,0,0,0.50)',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 15,
        color: 'white'
    },
    input: {
        height: 40,
        borderBottomColor: 'orange',
        borderBottomWidth: 1,
        width: '80%',
        color: 'white'
    }, 
})