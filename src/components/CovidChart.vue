<script>
import { Bar } from 'vue-chartjs'

// https://api.covid19api.com/country/philippines?from=2020-06-01&to=2020-07-18
// https://corona.lmao.ninja/v2/historical/philippines?lastdays=30
/*
    Mortality Rate: Deaths / Confirmed  (Average)
    Recovery Rate: Recovered / Confirmed (Average)
*/
// world
// https://corona-virus-stats.herokuapp.com/api/v1/cases/general-stats

export default {
  extends: Bar,
  props: {
    chartData: {
      type: Object,
      default: null
    },
    chartOptions: {
      type: Object,
      default: null
    },
    maxValue: {
      type: Number,
      default: 0
    }
  },
  mounted () {
    const xchartoptions = {
        scales: {
            xAxes: [{
                gridLines: {
                    offsetGridLines: true
                },
                type: 'time',
                time: {
                    displayFormats: {
                        quarter: 'MMM YYYY',
                        day: 'MMM DD'
                    }
                },
                ticks: {
                    maxRotation: 0,
                    minRotation: 0,
                    callback: function(value, index, values) {
                        return (index % 7 === 0) ? value : '';
                    }
                }
            }],
            yAxes: [{
                ticks: {
                    stepSize: (this.maxValue / 5)
                }
            }]
        },
        legend: {
            display: false
        },
        responsive: true
    };

    this.renderChart(this.chartData, this.chartOptions);
  }
}
</script>

<style>
</style>