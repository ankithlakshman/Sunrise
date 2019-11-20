import React from 'react';
import{
    View, 
    Text, 
    StyleSheet
}from 'react-native';

const indexes = {
    days: ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], 
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
}
export default class DateDisplay extends React.Component{
    constructor(props){
        super(props);
        /*PROPS
            num = date key
            time = true false depending on whether to display time or date
            size = fontSize
        */
        this.state = {
            date: new Date(this.props.num*1000+this.props.timezone*1000)
        }
    }
    componentDidMount(){
        this.setState({
            hours: this.state.date.getUTCHours(), 
            minutes: this.state.date.getUTCMinutes(),
            day: indexes.days[this.state.date.getUTCDay()], 
            month: indexes.months[this.state.date.getUTCMonth()],
            num: this.state.date.getUTCDate()
        })
    }
    render(){
        if(this.state.time){
            return(
                <View style = {styles.container}>
                    <Text styles = {{fontSize: this.props.size || 20, color: 'white'}}>{this.state.hours+':'+this.state.minutes}</Text>
                </View>
            )
        }
        else{
            return(
                <View style = {styles.container}>
                    <Text style = {[styles.header, {fontSize: this.props.size || 20}]}>{this.state.day}</Text>
                    <Text style = {[styles.header, {fontSize: this.props.size || 20}]}>{this.state.month+', '+this.state.num}</Text>
                </View>
            );
        }
        
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column', 
        alignItems: 'flex-end',
        padding: 5
    }, 
    header: {
        color: 'white',
        
    }
})