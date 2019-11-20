import React from 'react';
import{
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
}from 'react-native';
//import cities from '../city.list.json';
export default class CityList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        };
    }
    
    render(){
        return(
            <View style = {styles.container}>
                {
                    this.props.data && this.props.data.length>0 ? (
                        <FlatList
                            data = {this.props.data}
                            renderItem = {({item}) => (
                                <TouchableOpacity onPress = {() => this.props.addCity(item.id)}>
                                    <Text style = {styles.result}>{item.name}{', '+item.sys.country}</Text>
                                </TouchableOpacity>
                                
                            )
                            }
                        />
                    ):(
                        <Text style = {styles.noResult}>No Search Results</Text>
                    )
                }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: 40
    },
    result: {
        padding: 20,
        fontSize: 15,
        color: 'orange',
    },
    noResult: {
        fontSize: 15,
        color: 'white'
    }
})