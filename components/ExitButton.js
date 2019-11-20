import React from 'react';
import{
    TouchableOpacity,
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class ExitButton extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style = {styles.holder}>
                <TouchableOpacity style = {styles.container} onPress = {this.props.onPress}>
                    <Text style = {styles.text}>X</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'rgba(255,160,0,0.66)',
        borderRadius: 100,
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',

    },
    holder: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '80%',
        paddingTop: 10,
    }
});