import Vue from "vue";
import DayName from "./components/DayName.vue";
import CopyrightYear from "./components/CopyrightYear.vue";
import Bar from "./components/Bar.vue";

new Vue({
  el: "#app",
  components: {
    "day-name": DayName,
    "copyright-year": CopyrightYear,
    "bar-chart": Bar
  }
});
