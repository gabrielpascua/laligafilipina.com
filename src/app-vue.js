import Vue from "vue";
import VueRouter from "vue-router";
import DayName from "./components/common/DayName.vue";
import CopyrightYear from "./components/common/CopyrightYear.vue";
import CovidChartContainer from "./components/covid-chart/CovidChartContainer.vue";
import WeatherContainer from "./components/common/weather/WeatherContainer.vue";

Vue.use(VueRouter);

const commonComponents = {
  "dayName": DayName,
  "copyrightYear": CopyrightYear,
  "weatherContainer": WeatherContainer
};


new Vue({
  el: "#app",
  router: new VueRouter({
    routes: [{
      path: "/",
      components: {
        ...commonComponents,
        covidContainer: CovidChartContainer
      }
    }, {
      path: "/issues/:issueNumber/",
      components: {
        ...commonComponents,
        covidContainer: CovidChartContainer
      }
    }, {
      path: "*",
      components: commonComponents
    }],
    mode: "history"
  })
});
