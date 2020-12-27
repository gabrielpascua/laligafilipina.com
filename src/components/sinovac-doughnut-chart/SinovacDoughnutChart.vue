<script>
/* Center Text */
/* https://stackoverflow.com/questions/20966817/how-to-add-text-inside-the-doughnut-chart-using-chart-js */

import {Doughnut} from "vue-chartjs";

export default {
  extends: Doughnut,
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  }
};
</script>
