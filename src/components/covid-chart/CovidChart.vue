<script>
import {Bar} from "vue-chartjs";
// import { Chart as ChartJS } from "chart.js";

// ChartJS.register()

// export default {
//   extends: Bar,
//   props: {
//     options: {
//       type: Object,
//       default: null
//     }
//   },
//   mounted: function() {
//     this.renderChart(this.chartData, this.options);
//   },
//   watch: {
//     chartData() {
//       // Update chart to refresh tooltips
//       // when a new set of data and options is set
//       this.renderChart(this.chartData, this.options);
//     }
//   }
// };
export default {
  name: 'CovidChart',
  components: { Bar },
  computed: {
    chartData() { this.renderChart(this.chartData, this.options); }
  }
}
</script>