import './style.css';
import { getWeather } from "./weather.js";
import { ICON_MAP } from "./iconMap.js";

/* TODO: get current location data*/

navigator.geolocation.getCurrentPosition(positionSuccess, positionError) 

function positionSuccess({ coords }) {
    getWeather(
        coords.latitude,
        coords.longitude,
        Intl.DateTimeFormat().resolvedOptions().timeZone
    )
        .then(renderWeather)
        .catch(e => {
            console.error(e) 
            alert("Could not render weather")
        });
}

function positionError() {
    alert(
        'There was an error getting your current location. Please allow us to use your location and refresh the page.'
    )
}




function renderWeather({ current, daily, hourly }) {
    renderCurrentWeather(current);
    renderDailyWeather(daily);
    renderHourlyWeather(hourly);
    document.body.classList.remove('blurred');
}

function setValue( selector, value, {parent = document} = {}) {
    parent.querySelector(`[data-${selector}]`).textContent = value;
}

function getIconURL(iconCode) {
    return `./public/icons/${ICON_MAP.get(iconCode)}.svg`
}

const currentIcon = document.querySelector('[data-current-icon]');

function renderCurrentWeather(current) {
    currentIcon.src = getIconURL(current.iconCode)
    setValue('current-temp', current.currentTemp);
    setValue('current-high', current.highTemp);
    setValue('current-low', current.lowTemp);
    setValue('current-fl-high', current.highFeelsLike);
    setValue('current-fl-low', current.lowFeelsLike);
    setValue('current-wind', current.windSpeed);
    setValue('current-pecip', current.precip);

}
const DAY_FORMATTER = Intl.DateTimeFormat(undefined, { weekday: "long" });

const dailySection = document.querySelector('[data-daily-section]');
const dayCardTemplate = document.querySelector('#day-card-template');
function renderDailyWeather(daily) {
    dailySection.innerHTML = ''
    daily.forEach(day => {
        const element = dayCardTemplate.content.cloneNode(true)
        setValue('temp', day.maxTemp, {parent: element})
        setValue('date', DAY_FORMATTER.format(day.timestamp), {parent: element})
        element.querySelector('[data-icon]').src = getIconURL(day.iconCode)
        dailySection.append(element)
    })
}


const HOUR_FORMATTER = Intl.DateTimeFormat(undefined, { hour: "numeric" });

const hourlySection = document.querySelector('[data-hour-section]');
const hourRowTemplate = document.querySelector('#hour-row-template');
function renderHourlyWeather(hourly) {
    hourlySection.innerHTML = ''
    hourly.forEach(hour => {
        const element = hourRowTemplate.content.cloneNode(true)
        setValue('temp', hour.temp, {parent: element})
        setValue('fl-temp', hour.feelsLike, {parent: element})
        setValue('wind', hour.windSpeed, {parent: element})
        setValue('precip', hour.precip, {parent: element})
        setValue('day', DAY_FORMATTER.format(hour.timestamp), {parent: element})
        setValue('time', HOUR_FORMATTER.format(hour.timestamp), {parent: element})
        element.querySelector('[data-icon]').src = getIconURL(hour.iconCode)
        hourlySection.append(element)
    })
}