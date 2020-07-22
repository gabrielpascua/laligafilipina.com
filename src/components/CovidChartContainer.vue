<template>
  <div>
    <ul class="inline-block mt-2 mb-0">
      <li>
        <a href="#" class="underlined-hed pr-2 pb-1"><b>Confirmed</b></a>
      </li>
      <li>
        <a href="#" class="pr-2 text-faded pb-1">Recovered</a>
      </li>
      <li>
        <a href="#" class="pr-2 text-faded pb-1">Deaths</a>
      </li>
    </ul>
    <hr class="mt-0 mb-2" />
    <covid-chart
      v-if="loaded"
      :height="180"
      :chartData="chartData"
      :chartOptions="chartOptions"
    />
  </div>
</template>

<script>
import axios from "axios";
import CovidChart from "./CovidChart.vue";

const dateParams = (function() {
  const now = new Date();
  const oneDayInMs = 24 * 60 * 60 * 1000;
  const timeOffsetInMs = 8 * 60 * 60 * 1000; // UTC+8
  const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const lookbackDays = 42;
  return {
    endDate: endDate,
    lookbackDays: lookbackDays,
    timeOffsetInMs: timeOffsetInMs,
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
  const recoveredData = [];
  const deathData = [];
  for (let i = 0, max = covidData.length; i < max; i++) {
    const d = covidData[i];
    recoveredData.push(d.Recovered);
    deathData.push(d.Deaths);
    barData.push({
      x: new Date(Date.parse(d.Date) + dateParams.timeOffsetInMs),
      y: d.Confirmed
    });
  }

  return {barData, recoveredData, deathData};
};

const transformNinja = function(covidData) {
  const barData = [];
  const recoveredData = [];
  const deathData = [];
  for (let i = 0, max = dateParams.lookbackDays; i < max; i++) {
    const dt = new Date(dateParams.startDate.getTime() + (dateParams.oneDayInMs * i));
    const key = `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear().toString().substring(2)}`;
    recoveredData.push(covidData.timeline.recovered[key]);
    deathData.push(covidData.timeline.deaths[key]);
    barData.push({
      x: new Date(Date.parse(key) + dateParams.timeOffsetInMs),
      y: covidData.timeline.cases[key]
    });
  }

  return {barData, recoveredData, deathData};
};

const setChartData = function(standardData) {
  return {
    labels: standardData.barData.map((c) => c.x),
    datasets: [{
      data: standardData.barData.map((c) => c.y),
      borderWidth: 1,
      backgroundColor: "rgba(0,0,0,.125)"
    }, {
      data: standardData.recoveredData,
      type: "line",
      backgroundColor: "transparent",
      borderColor: "rgba(19,189,0,0.75)",
      borderWidth: 2,
      pointRadius: 0
    }, {
      data: standardData.deathData,
      type: "line",
      backgroundColor: "transparent",
      borderColor: "rgba(255, 99, 132, 0.75)",
      borderWidth: 2,
      pointRadius: 0
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

    const {data: rawData} = requestData;
    const covidData = Array.isArray(rawData) ? transformCovid19(rawData) : transformNinja(rawData);

    this.chartData = setChartData(covidData);
    this.chartOptions = getChartOptions();
    this.loaded = true;
  }
};
</script>

<style>
</style>
