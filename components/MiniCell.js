import React from 'react';
import{
    View,
    Text, 
    Image,
    StyleSheet
} from 'react-native'

export default class MiniCell extends React.Component{
    constructor(props){
        //takes in a data prop which is obj from api 
        super(props);
        this.state = {
            data: this.props.data,
            date: new Date(this.props.data.dt*1000+this.props.timezone*1000)
        }
    }
    formatDate = (time) =>{
        if(time == 12){
            return time.toString()+"PM"
        }
        else if (time == 0){
            time = 2;
            return time.toString()+"AM"
        }
        if(time>12){
            time-=12;
            return time.toString()+"PM"
        }
        else{
            return time.toString()+"AM"
        }
    }
    convertTemp(num){
        return Math.round((num - 273) * 1.8 + 32);
    }

    render(){
        return(
            <View style = {styles.container}>
                <Text style = {styles.info}>{this.formatDate(this.state.date.getUTCHours())}</Text>
                <Image 
                    source = {{uri: 'http://openweathermap.org/img/wn/' + this.state.data.weather[0].icon + '@2x.png'}}
                    style = {styles.image}
                    />
                <Text style = {styles.info}>{this.convertTemp(this.state.data.main.temp)+'°'}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRightColor: 'orange', 
        borderLeftColor: 'orange', 
        borderRightWidth: 0, 
        borderLeftWidth: 0, 
        width: 50
    },
    image: {
        height: 40, 
        width: 40,
    },
    info: {
        color: 'white',
        fontSize: 15
    }
})