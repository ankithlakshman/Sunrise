import React from 'react'
import{
    View, 
    Text, 
    TouchableOpacity,
    Animated
}from 'react-native'

export default class AnimatedButton extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            scale: new Animated.Value(1)
        }
    }
    pressDown = () =>{
        Animated.spring(this.state.scale,  {
            toValue: 0.92,
            speed: 100, 
            useNativeDriver: true
        }).start();
    }
    pressUp = () =>{
        Animated.spring(this.state.scale, {
            toValue: 1,
            speed: 100,
            useNativeDriver: true
        }).start();
    }
    render(){
        const {
            label,
            color,
            onPress,
            labelColor,
            border,
            shadowOpacity,
            width, 
            height
          } = this.props;
        return(
            <TouchableOpacity
                style={{height: height||45, width: width||160}}
                onPress = {onPress}
                onPressIn = {this.pressDown}
                onPressOut = {this.pressUp}
                activeOpacity = {1}
            >
                <Animated.View
                    style = {{
                        transform: [{scale: this.state.scale}],
                        flex: 1,
                        backgroundColor: color,
                        borderWidth: border? border : 0,
                        borderColor: labelColor,
                        borderRadius: 8,
                        alignItems: 'center', 
                        justifyContent: 'center',
                        shadowOpacity: shadowOpacity? shadowOpacity: 0.1,
                        shadowOffset: { width: 0, height: 2 },
                    }}
                >
                    <Text style={{ fontSize: 17, fontWeight: "bold", color: labelColor }}>
                        {label}
                    </Text>
                </Animated.View>


            </TouchableOpacity>
        )
    }
}