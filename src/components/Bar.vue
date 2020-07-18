

<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  mounted () {
    let chartdata = [];
    for(let i=0,max=60; i<max; i++){
        chartdata.push({
            x: (i%10) === 0 ? `d${i+1}` : '',
            y: Math.floor(Math.random() * Math.floor(20))
        });
    };

    let chartdataset = {
        labels: chartdata.map(c => c.x),
        datasets: [{
            data: chartdata.map(c => c.y),
            borderWidth: 1
        }]
    };

    const chartoptions = {
        scales: {
            xAxes: [{
                gridLines: {
                    offsetGridLines: true
                }
            }]
        },
        responsive: true,
        height: 300
    };

    this.renderChart(chartdataset, chartoptions);
  }
}
</script>

<style>
</style>