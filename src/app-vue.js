import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import DayName from "./components/common/DayName.vue";
import CopyrightYear from "./components/common/CopyrightYear.vue";
import WeatherContainer from "./components/common/weather/WeatherContainer.vue";

const components = {
    "dayName": DayName,
    "copyrightYear": CopyrightYear,
    "weatherContainer": WeatherContainer
};

const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: "/",
        components
    }, {
        path: "/issues/:issueNumber/",
        components
    }, {
        path: "/:catchAll(.*)",
        components
    }]
});


createApp({})
    .use(router)
    .mount("#app");