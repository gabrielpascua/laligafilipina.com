

<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  mounted () {
    let barData = [];
    let lineData = [];
    let baseDate = Date.parse('2020-01-01');
    let oneDay = 24 * 60 * 60 * 1000;
    const maxValue = 2000;
    for(let i=0,max=42; i<max; i++){
        lineData.push(Math.random() * Math.floor(1000));
        barData.push({
            x: new Date(baseDate + (oneDay * i)),
            y: Math.floor(Math.random() * Math.floor(2000))
        });
    };

    let barDataset = {
        labels: barData.map(c => c.x),
        datasets: [{
            data: barData.map(c => c.y),
            borderWidth: 1,
            backgroundColor: 'rgba(0,0,0,.125)'
        },{
            data: lineData,
            type: 'line',
            backgroundColor: 'transparent',
            borderColor: 'rgba(228,228,0,.75)',
            borderWidth: 2
        }]
    };

    const chartoptions = {
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
                        return (index % 8 === 0) ? value : '';
                    }
                }
            }],
            yAxes: [{
                ticks: {
                    stepSize: (maxValue / 5)
                }
            }]
        },
        legend: {
            display: false
        },
        responsive: true
    };

    this.renderChart(barDataset, chartoptions);
  }
}
</script>

<style>
</style>