import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    FlatList,
    StyleSheet,
    Image,
    ActivityIndicator,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import AnimatedButton from './AnimatedButton';
import DateDisplay from './DateDisplay';
import MiniCell from './MiniCell';
import DaysForecast from './DaysForecast';

const api = {
    key: '&appid=e4b4b3d7de16a6c1c7dbff8e03d667ad',
    uri: 'https://api.openweathermap.org/data/2.5/weather?id='
};

export default class WeatherPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            forecast: null,
            isLoading: true,
            timezone: 0
        }
    }
    convertTemp = (num) => {
        return Math.round((num - 273) * 1.8 + 32);
    }
    convertDate = (num) => {
        return new Date(num);
    }
    convertTime = (num) => {
        const temp = new Date(num * 1000);
        let hours = temp.getUTCHours();
        const minutes = temp.getUTCMinutes();
        if (hours == 12) {
            return hours.toString() + ':' + minutes.toString() + ' PM';
        }
        else if (hours == 24) {
            return hours.toString() + ':' + minutes.toString() + ' AM';
        }
        else if (hours > 12) {
            hours -= 12;
            return hours.toString() + ':' + minutes.toString() + ' PM';
        }
        else {
            return hours.toString() + ':' + minutes.toString() + ' AM';
        }
    }
    componentDidMount() {
        fetch('https://api.openweathermap.org/data/2.5/forecast?id=' + this.state.data.id + api.key)
            .then((response) => response.json())
            .then((responseJSON) => {
                this.setState({
                    forecast: responseJSON.list,
                    
                    timezone: responseJSON.city.timezone
                })
                console.log(this.state.forecast)
            
            let obj = {};
            for(let i=0; i<this.state.forecast.length; i++){
                let elem = this.state.forecast[i];
                let temp = new Date((elem.dt+this.state.timezone)*1000);
                let day = temp.getUTCDay();
                if(day in obj){
                    obj[day].tempMax = Math.max(obj[day].tempMax, elem.main.temp);
                    obj[day].tempMin = Math.min(obj[day].tempMin, elem.main.temp);
                    if(obj[day].icon.indexOf(elem.weather[0].icon) == -1){
                        obj[day].icon.push(elem.weather[0].icon)
                    }
                        
                }
                else{
                    obj[day] = {
                                date: day,
                                tempMax: elem.main.temp, 
                                tempMin: elem.main.temp, 
                                icon: [elem.weather[0].icon]};
                            }
            }
            console.log(obj)
            this.setState({
                fiveday: obj, 
                isLoading: false,
            })
        })
            

    }
    render() {
        const {
            name,
            weather,
            main,
            sys,
            coord,
            dt,
            wind,
            clouds,
            timezone
        } = this.state.data
        if (this.state.isLoading) {
            return (
                <LinearGradient colors={['#020024', '#090979', '#ff8200']} style={styles.gradient}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size='large' />
                    </View>
                </LinearGradient>
            )
        }
        return (
            <LinearGradient colors={['#020024', '#090979', '#ff8200']} style={styles.gradient}>
                <SafeAreaView style={styles.container}>


                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'}}>
                        <View>
                            <Text style={styles.city}>{name}</Text>
                            <Text style={styles.description}>{sys.country}</Text>
                        </View>
                        <View style={[styles.table, { width: 100, paddingBottom: 2 }]}>
                            <View style={styles.tablecell}>
                                <Text style={styles.info}>{'Lat: '}</Text>
                                <Text style={styles.info}>{coord.lat}</Text>
                            </View>
                            <View style={styles.tablecell}>
                                <Text style={styles.info}>{'Lon: '}</Text>
                                <Text style={styles.info}>{coord.lon}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.bar}>
                        <AnimatedButton
                            label='Radar'
                            color='orange'
                            width={100}
                            height={20}
                        />
                        <AnimatedButton
                            label='Hourly'
                            color='orange'
                            width={100}
                            height={20}
                        />
                        <AnimatedButton
                            label='Daily'
                            color='orange'
                            width={100}
                            height={20}
                        />
                    </View>

                    <FlatList
                        data={[this.state.data]}
                        renderItem={({ item }) => (
                            <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', paddingBottom: 10}}>
                        <View style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
                            <View style={{ flexDirection: 'row', paddingTop: 5, width: 200, alignItems: 'center' }}>
                                <Image
                                    style={{ height: 30, width: 30 }}
                                    source={{ uri: 'http://openweathermap.org/img/wn/' + weather[0].icon + '@2x.png' }}
                                />
                                <Text style={styles.subtemp}>{weather[0].description}</Text>

                            </View>

                            <Text style={styles.temp}>{this.convertTemp(main.temp)}{'°'}</Text>
                            <View style={{ flexDirection: 'row', paddingTop: 5, width: 200, alignItems: 'center' }}>
                                <View style={[{ width: 100 }, styles.table]}>
                                    <View style={styles.tablecell}>
                                        <Text style={styles.subtemp}>{'Max: '}</Text>
                                        <Text style={styles.subtemp}>{this.convertTemp(main.temp_max) + '°'}</Text>
                                    </View>
                                    <View style={styles.tablecell}>
                                        <Text style={styles.subtemp}>{'Min: '}</Text>
                                        <Text style={styles.subtemp}>{this.convertTemp(main.temp_min) + '°'}</Text>
                                    </View>
                                </View>
                            </View>

                        </View>
                        <View style={{ justifyContent: 'flex-end', width: 170, flexDirection: 'row' }}>
                            <DateDisplay num={dt} time={false} size={20} timezone={timezone} />
                        </View>
                    </View>
                            <View style={[styles.section, {width: '100%'}]}>
                                <Text style={styles.sectionheader}>Forecast</Text>
                                <FlatList
                                    horizontal
                                    data={this.state.forecast.slice(0, 11)}
                                    renderItem={({ item }) => <MiniCell data={item} timezone={this.state.timezone} />}
                                    style={{ padding: 10 }}
                                    snapToInterval={50}
                                    keyExtractor={item => item.dt}
                                />
                                <DaysForecast data = {this.state.fiveday}/>
                            </View>
                            <View style={styles.sectionsplit} />
                            <View style={styles.section}>
                                <Text style={styles.sectionheader}>Sun</Text>
                                <View style={styles.subsection}>
                                    <Image source={require('../assets/sun.png')} style={{ height: 100, width: 100, tintColor: 'orange' }} />
                                    <View style={styles.table}>
                                        <View style={styles.tablecell}>
                                            <Text style={styles.subtemp}>Sunrise: </Text>
                                            <Text style={styles.subtemp}>{this.convertTime(item.sys.sunrise + item.timezone)}</Text>
                                        </View>
                                        <View style={styles.tablecell}>
                                            <Text style={styles.subtemp}>Sunset: </Text>
                                            <Text style={styles.subtemp}>{this.convertTime(item.sys.sunset + item.timezone)}</Text>
                                        </View>
                                    </View>

                                </View>
                            </View>
                            <View style={styles.sectionsplit} />
                            <View style={styles.section}>
                                <Text style={styles.sectionheader}>Air</Text>
                                <View style={styles.subsection}>
                                    <Image source={require('../assets/wind.jpg')} style={{ height: 100, width: 100, backgroundColor: 'transparent', opacity: 0.4 }} />
                                    <View style={[styles.table, { width: 200 }]}>
                                        <View style={styles.tablecell}>
                                            <Text style={styles.subtemp}>Pressure: </Text>
                                            <Text style={styles.subtemp}>{item.main.pressure}</Text>
                                        </View>
                                        <View style={styles.tablecell}>
                                            <Text style={styles.subtemp}>Humidity: </Text>
                                            <Text style={styles.subtemp}>{item.main.humidity + '%'}</Text>
                                        </View>
                                        <View style={styles.tablecell}>
                                            <Text style={styles.subtemp}>Clouds: </Text>
                                            <Text style={styles.subtemp}>{item.clouds.all + '%'}</Text>
                                        </View>
                                        <View style={styles.tablecell}>
                                            <Text style={styles.subtemp}>Wind: </Text>
                                            <Text style={styles.subtemp}>{item.wind.speed + ' m/s'}</Text>
                                        </View>
                                        <View style={styles.tablecell}>
                                            <Text />
                                            <Text style={styles.subtemp}>{item.wind.deg + '°'}</Text>
                                        </View>

                                    </View>

                                </View>
                            </View>
                        </View>
                        )}
                    />

                </SafeAreaView>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        alignItems: 'center'
    },
    container: {
        flex: 1,
        paddingTop: 10,
        width: '90%',
    },
    city: {
        paddingTop: 10,
        fontSize: 30,
        color: 'orange',
        fontWeight: 'bold'
    },
    description: {
        paddingVertical: 5,
        fontSize: 15,
        color: 'white'
    },
    temp: {
        padding: 1,
        fontSize: 100,
        color: 'orange',
        fontWeight: '200'
    },
    info: {
        padding: 1,
        fontSize: 15,
        color: 'white'
    },
    bar: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.25)',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: 'orange',
        borderBottomColor: 'orange',
        alignItems: 'center',
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    section: {
        flexDirection: 'column',
        backgroundColor: 'rgba(0,0,0,0.25)',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: 'orange',
        borderBottomColor: 'orange',
        alignItems: 'center',
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    sectionheader: {
        padding: 3,
        fontSize: 25,
        color: 'orange',
        width: '100%'
    },
    subsection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
    },
    sectionsplit: {
        height: 15
    },
    subtemp: {
        color: 'white',
        padding: 1,
        fontSize: 18
    },
    table: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    tablecell: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },

})