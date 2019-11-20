import React from 'react';
import{
    View,
    Text,
    StyleSheet, 
    Image
}from 'react-native'

export default class DaysForecast extends React.Component{
    constructor(props){
        super(props);
    }
    convertTemp = (num) => {
        return Math.round((num - 273) * 1.8 + 32);
    }
    render(){
        const data = this.props.data
        const days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const elems = [];
        for(let key in data){
            let images = [];

            for(let img in data[key].icon){
                images.push(
                    <Image style = {{height: 25, width: 25}} source = {{uri: 'http://openweathermap.org/img/wn/' + data[key].icon[img]+ '@2x.png'}}/>
                )
            }
            elems.push(
                <View style = {styles.elemcontainer}>
                        <Text style = {styles.datetext}>{days[key]}</Text>
                        <View style = {styles.imagecontainer}>
                            {images}
                        </View>
                        <View style = {styles.tempcontainer}>
                            <Text style = {[styles.temptext, {color: 'orange'}]}>{this.convertTemp(data[key].tempMax)}</Text>
                            <Text style = {[styles.temptext, {color: '#1E90FF'}]}>{' '+this.convertTemp(data[key].tempMin)}</Text>
                        </View>
                </View>
            )
        }
        return(
            <View style = {styles.container}>
                {elems}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        width: '100%'
    }, 
    elemcontainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        padding: 3,
        borderBottomWidth: 1, 
        borderColor: 'orange', 
        width: '100%',
    }, 
    datetext: {
        color: 'white', 
        fontSize: 20, 
        padding: 1
    }, 
    imagecontainer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center'
    }, 
    tempcontainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center'
    }, 
    temptext: {
        color: 'white', 
        fontSize: 20
    }
})