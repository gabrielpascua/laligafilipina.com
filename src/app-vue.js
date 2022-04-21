import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import DayName from "./components/common/DayName.vue";
import CopyrightYear from "./components/common/CopyrightYear.vue";
import CovidChartContainer from "./components/covid-chart/CovidChartContainer.vue";
import WeatherContainer from "./components/common/weather/WeatherContainer.vue";

const commonComponents = {
    "dayName": DayName,
    "copyrightYear": CopyrightYear,
    "weatherContainer": WeatherContainer
};

const router = createRouter({
    history: createWebHistory(),
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
        path: "/*/350-thousand-coronavirus-cases-issue-20003",
        components: {
            ...commonComponents,
            covidContainer: CovidChartContainer
        }
    }, {
        path: "/.*",
        components: commonComponents
    }]
});


createApp({})
    .use(router)
    .mount("#app");