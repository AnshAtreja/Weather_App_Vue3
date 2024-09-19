export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("en-GB", options);
}

export function combineDescription(conditions, description) {
  return `${conditions}. ${description}`;
}

export const formatHour = (dateTime, dayDate) => {
  const fullDateTime = `${dayDate}T${dateTime}`;
  const date = new Date(fullDateTime);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export function convertFtoC(fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9;
}

export function getWeatherIcon(icon) {
    const iconMap = {
        "snow": "wi wi-snow",
        "fog": "wi wi-fog",
        "rain": "wi wi-rain",
        "wind": "wi wi-strong-wind",
        "cloudy": "wi wi-cloudy",
        "partly-cloudy-day": "wi wi-day-cloudy",
        "partly-cloudy-night": "wi wi-night-alt-cloudy",
        "clear-day": "wi wi-day-sunny",
        "clear-night": "wi wi-night-clear"
    };

    return iconMap[icon] || "wi wi-na"; 
}