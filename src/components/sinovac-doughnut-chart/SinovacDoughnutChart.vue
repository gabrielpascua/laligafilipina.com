<script>
/* Center Text */
/* https://stackoverflow.com/questions/20966817/how-to-add-text-inside-the-doughnut-chart-using-chart-js */

import {Doughnut} from "vue-chartjs";
import {Chart} from "chart.js";

// https://stackoverflow.com/questions/43925652/multipe-doughnut-charts-on-one-page-with-text-in-center-using-chart-js
Chart.pluginService.register({
  beforeDraw: function(chart) {
    const width = chart.chart.width;
    const height = chart.chart.height;
    const fontSize = 14;
    const ctx = chart.chart.ctx;

    ctx.restore();
    ctx.font = fontSize + "px sans-serif";
    ctx.textBaseline = "middle";

    const text = chart.config.options.centerText;
    const textX = Math.round((width - ctx.measureText(text).width) / 2);
    const textY = height / 2;

    ctx.fillText(text, textX, textY);
    ctx.save();
  }
});

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
