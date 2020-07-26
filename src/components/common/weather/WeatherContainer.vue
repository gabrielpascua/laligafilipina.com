<template>
  <weather v-if="loaded" :temperature="temperature" :description="description" />
</template>

<script>
import axios from "axios";
import descriptions from "./weather-descriptions";
import Weather from "./Weather.vue";

const getTimeSeries = async function() {
  const {data} = await axios("https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=12.8797&lon=121.7740");
  const localizedData = {
    timeseries: data.properties.timeseries,
    expires: Date.now() + (24 * 60 * 60 * 1000)
  };
  localStorage.setItem("weather", JSON.stringify(localizedData));
  return localizedData;
};

const getWeatherData = async function() {
  let data = JSON.parse(localStorage.getItem("weather") || null) || {};

  if (!data.timeseries) {
    data = await getTimeSeries();
  } else if (Date.now() > data.expires) {
    data = await getTimeSeries();
  }

  const now = new Date().toISOString();
  const [date, time] = now.split("T");
  const timeKey = `${date}T${time.split(":")[0]}:00:00Z`;

  let weatherData = data.timeseries.find((t) => t.time === timeKey);
  if (!weatherData) {
    data = await getTimeSeries();
    weatherData = data.timeseries.find((t) => t.time === timeKey);
  }

  return {
    temperature: weatherData.data.instant.details.air_temperature.toFixed(0),
    description: descriptions[weatherData.data.next_1_hours.summary.symbol_code.split("_")[0]]
  };
};

export default {
  name: "WeatherContainer",
  components: {Weather},
  data: function() {
    return {
      loaded: false,
      temperature: "",
      description: ""
    };
  },
  async mounted() {
    this.loaded = false;
    try {
      const {temperature, description} = await getWeatherData();
      this.temperature = temperature;
      this.description = description;
      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
  }
};
</script>
