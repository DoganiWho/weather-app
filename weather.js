import axios from "axios";

// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&windspeed_unit=ms&timeformat=unixtime&timezone=auto

export function getWeather (lat, lon, timezone) {
    axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
            latitude: lat,
            longitude: lon, 
            timezone,
        }
    }).then(({data}) => {
        return {
            current: parseCurrentWeather(data), 
            daily: parseDailyWeather(data),
            hourly: parseHourlyWeather(data),
        }
    })
}

/* CONTINUE HERE, Transforming API Data */
function parseCurrentWeather ({current_weather, data}) {} 
// function parseDailyWeather (data) {}
// function parseHourlyWeather (data) {}