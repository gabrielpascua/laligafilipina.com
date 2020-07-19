import Vue from "vue";
import DayName from "./components/DayName.vue";
import CopyrightYear from "./components/CopyrightYear.vue";
import CovidChartContainer from "./components/CovidChartContainer.vue";

new Vue({
  el: "#app",
  components: {
    "day-name": DayName,
    "copyright-year": CopyrightYear,
    "covid-chart-container": CovidChartContainer
  }
});
