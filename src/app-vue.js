import {Vue} from "./app-dependencies";
import DayName from "./components/common/DayName.vue";
import CopyrightYear from "./components/common/CopyrightYear.vue";
import CovidChartContainer from "./components/covid-chart/CovidChartContainer.vue";
import WeatherContainer from "./components/common/weather/WeatherContainer.vue";

new Vue({
  el: "#app",
  components: {
    "day-name": DayName,
    "copyright-year": CopyrightYear,
    "covid-chart-container": CovidChartContainer,
    "weather-container": WeatherContainer
  }
});
