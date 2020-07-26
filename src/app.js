import Vue from "vue";
import DayName from "./components/common/DayName.vue";
import CopyrightYear from "./components/common/CopyrightYear.vue";
import CovidChartContainer from "./components/covid-chart/CovidChartContainer.vue";

new Vue({
  el: "#app",
  components: {
    "day-name": DayName,
    "copyright-year": CopyrightYear,
    "covid-chart-container": CovidChartContainer
  }
});
