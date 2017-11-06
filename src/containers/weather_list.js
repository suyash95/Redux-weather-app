import React , {Component} from 'react';
import {connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {
    renderWeather(CityData){
        const name = CityData.city.name;
        const temps = CityData.list.map(weather => weather.main.temp - 273.15);
        const pressure = CityData.list.map(weather => weather.main.pressure);
        const humidity = CityData.list.map(weather => weather.main.humidity);
        const {lon,lat} = CityData.city.coord;
        return (
            <tr key ={name}>
                <td><GoogleMap lon={lon} lat={lat} /></td>
                <td>
                    <Chart data = {temps} color = "blue" units="°C" />
                </td>
                <td>
                    <Chart data = {pressure} color = "red" units="hPa" />
                </td>
                <td>
                    <Chart data = {humidity} color = "green" units="%"/>
                </td>
            </tr>
        );
    }
    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Tempreture (°C) </th>
                        <th>Pressure (hPa)</th>
                        <th>Humidity (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.weather.map(this.renderWeather)}
                </tbody>
            </table>    
        );
    }

}

function mapStateToProps(state){
    return { weather : state.weather};
}

export default connect (mapStateToProps)(WeatherList);