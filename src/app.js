import Vue from "vue";
import DayName from "./components/DayName.vue";
import CopyrightYear from "./components/CopyrightYear.vue";

new Vue({
  el: "#app",
  components: {
    "day-name": DayName,
    "copyright-year": CopyrightYear
  }
});
