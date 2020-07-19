<template>
    <covid-chart
      v-if="loaded"
      :height="180"
      :chartData="chartData"
      :chartOptions="chartOptions"
      :maxValue="maxCases" />
</template>

<script>
// https://api.covid19api.com/country/philippines?from=2020-06-01&to=2020-07-18
// https://corona.lmao.ninja/v2/historical/philippines?lastdays=30
/*
    Mortality Rate: Deaths / Confirmed  (Average)
    Recovery Rate: Recovered / Confirmed (Average)
*/
// world
// https://corona-virus-stats.herokuapp.com/api/v1/cases/general-stats
import axios from 'axios';
import CovidChart from './CovidChart';

export default {
  name: 'CovidChartContainer',
  components: { CovidChart },
  data: () => ({
    loaded: false,
    chartData: null,
    chartOptions: null,
    maxCases: 0
  }),
  async mounted () {
    this.loaded = false

    const now = new Date();
    const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lookbackDays = 42;
    const oneDayInMs = 24 * 60 * 60 * 1000;
    const startDate = new Date(endDate.getTime() - (lookbackDays * oneDayInMs));

    const covid19api = `https://api.covid19api.com/country/philippines?from=${startDate.toISOString()}&to=${endDate.toISOString()}`;
    const ninjaApi = `https://corona.lmao.ninja/v2/historical/philippines?lastdays=${lookbackDays}`;

    let barData = [];
    let lineData = [];
    try {
      const { data: covidData } = await Promise.race([axios.get(ninjaApi), axios.get(covid19api)]);
      if (Array.isArray(covidData)){
        covidData.forEach((d, i) => {
          let dt = new Date(startDate.getTime() + (oneDayInMs * i));
          lineData.push(d.Recovered / d.Confirmed);
          barData.push({
            x: dt,
            y: d.Confirmed
          });
        });
      } else {
        for(let i=0,max=lookbackDays; i<max; i++){
          let dt = new Date(startDate.getTime() + (oneDayInMs * i));
          let key = `${dt.getMonth()+1}/${dt.getDate()}/${dt.getFullYear().toString().substring(2)}`;
          lineData.push(covidData.timeline.recovered[key] / covidData.timeline.cases[key]);
          barData.push({
            x: dt,
            y: covidData.timeline.cases[key]
          });
        }

      }
    } catch {
      // noop
    }

    this.chartData = {
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

    this.chartOptions = {
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

    this.loaded = true;
    this.maxCases = lookbackDays;
  }
}
</script>

<style>
</style>