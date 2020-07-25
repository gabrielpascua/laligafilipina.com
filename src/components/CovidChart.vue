<script>
import {Bar, mixins} from "vue-chartjs";
const {reactiveProp} = mixins;

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default: null
    }
  },
  mounted: function() {
    this.renderChart(this.chartData, this.options);
  },
  watch: {
    chartData() {
      // Update chart to refresh tooltips
      // when a new set of data and options is set
      this.renderChart(this.chartData, this.options);
    }
  }
};
</script>
