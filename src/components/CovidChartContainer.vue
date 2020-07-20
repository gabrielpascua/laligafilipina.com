<template>
    <covid-chart
      v-if="loaded"
      :height="180"
      :chartData="chartData"
      :chartOptions="chartOptions"
    />
</template>

<script>
import axios from "axios";
import CovidChart from "./CovidChart.vue";

const dateParams = (function() {
  const now = new Date();
  const oneDayInMs = 24 * 60 * 60 * 1000;
  const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const lookbackDays = 42;
  return {
    endDate: endDate,
    lookbackDays: lookbackDays,
    oneDayInMs: oneDayInMs,
    startDate: new Date(endDate.getTime() - (lookbackDays * oneDayInMs))
  };
})();

const getChartOptions = function() {
  return {
    scales: {
      xAxes: [{
        gridLines: {
          offsetGridLines: true
        },
        type: "time",
        time: {
          displayFormats: {
            quarter: "MMM YYYY",
            day: "MMM DD"
          }
        },
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          callback: function(value, index, values) {
            return (index % 3 === 0) ? value : "";
          }
        }
      }]
    },
    legend: {
      display: false
    },
    responsive: true
  };
};

const transformCovid19 = function(covidData) {
  const barData = [];
  const lineData = [];
  for (let i = 0, max = covidData.length; i < max; i++) {
    const d = covidData[i];
    const dt = new Date(dateParams.startDate.getTime() + (dateParams.oneDayInMs * i));
    lineData.push(d.Recovered / d.Confirmed);
    barData.push({
      x: dt,
      y: d.Confirmed
    });
  }

  return {barData:barData, lineData:lineData};
};

const transformNinja = function(covidData) {
  const barData = [];
  const lineData = [];
  for (let i = 0, max = dateParams.lookbackDays; i < max; i++) {
    const dt = new Date(dateParams.startDate.getTime() + (dateParams.oneDayInMs * i));
    const key = `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear().toString().substring(2)}`;
    lineData.push(covidData.timeline.recovered[key] / covidData.timeline.cases[key]);
    barData.push({
      x: dt,
      y: covidData.timeline.cases[key]
    });
  }

  return {barData:barData, lineData:lineData};
};

const setChartData = function(standardData) {
  return {
    labels: standardData.barData.map((c) => c.x),
    datasets: [{
      data: standardData.barData.map((c) => c.y),
      borderWidth: 1,
      backgroundColor: "rgba(0,0,0,.125)"
    }, {
      data: standardData.lineData,
      type: "line",
      backgroundColor: "transparent",
      borderColor: "rgba(228,228,0,.75)",
      borderWidth: 2
    }]
  };
};

export default {
  name: "CovidChartContainer",
  components: {CovidChart},
  data: function() {
    return {
      loaded: false,
      chartData: null,
      chartOptions: null
    };
  },
  mounted: async function() {
    this.loaded = false;

    const covid19api = `https://api.covid19api.com/country/philippines?from=${dateParams.startDate.toISOString()}&to=${dateParams.endDate.toISOString()}`;
    const ninjaApi = `https://corona.lmao.ninja/v2/historical/philippines?lastdays=${dateParams.lookbackDays}`;

    let requestData;
    try {
      requestData = await axios.get(covid19api);
      if (!requestData) {
        throw new Error("retry other source");
      }
    } catch (error) {
      requestData = await axios.get(ninjaApi);
    }

    requestData = requestData || {};
    const rawData = requestData.data;
    const covidData = Array.isArray(rawData) ? transformCovid19(rawData) : transformNinja(rawData);

    this.chartData = setChartData(covidData);
    this.chartOptions = getChartOptions();
    this.loaded = true;
  }
};
</script>

<style>
</style>
