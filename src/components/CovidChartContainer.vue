<template>
  <div>
    <ul class="chart-links inline-block mt-2 mb-0">
      <li>
        <span class="chart-link pointer pr-2 pb-1" @click="updateChart('confirmed', $event.target)">Cases</span>
      </li>
      <li>
        <span class="chart-link pointer pr-2 pb-1" @click="updateChart('recovered', $event.target)">Recoveries</span>
      </li>
      <li>
        <span class="chart-link pointer pr-2 pb-1" @click="updateChart('deaths', $event.target)">Deaths</span>
      </li>
    </ul>
    <hr class="mt-0 mb-2" />
    <covid-chart
      v-if="loaded"
      :height="180"
      :chart-data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script>
import axios from "axios";
import CovidChart from "./CovidChart.vue";

const dateParams = (function() {
  const timeOffsetInMs = 8 * 60 * 60 * 1000; // UTC+8
  const now = new Date();
  const oneDayInMs = 24 * 60 * 60 * 1000;
  const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const lookbackDays = 42;
  return {
    endDate,
    lookbackDays,
    timeOffsetInMs,
    oneDayInMs,
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
          },
          stepSize: 4
        },
        ticks: {
          maxRotation: 0,
          minRotation: 0
        }
      }],
      yAxes: [{
        ticks: {
          callback: function(value, index, values) {
            return value.toLocaleString();
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

const fetchFromCovid19 = function(covidData) {
  return covidData.map((c) => ({
    confirmed: c.Confirmed,
    deaths: c.Deaths,
    recovered: c.Recovered,
    date: new Date(Date.parse(c.Date) + dateParams.timeOffsetInMs)
  }));
};

const fetchFromNinja = function(covidData) {
  const transformedData = [];
  for (let i = 0, max = dateParams.lookbackDays; i < max; i++) {
    const dt = new Date(dateParams.startDate.getTime() + (dateParams.oneDayInMs * i));
    const key = `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear().toString().substring(2)}`;
    transformedData.push({
      confirmed: covidData.timeline.cases[key],
      deaths: covidData.timeline.deaths[key],
      recovered: covidData.timeline.recovered[key],
      date: new Date(Date.parse(key) + dateParams.timeOffsetInMs)
    });
  }
  return transformedData;
};

const setChartData = function(cases) {
  return {
    labels: cases.map((c) => c.date),
    datasets: [{
      data: cases.map((c) => c.count),
      borderWidth: 1,
      backgroundColor: "rgba(0,0,0,.25)"
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
    await this.updateChart("confirmed");
  },
  methods: {
    updateChart: async function(dataType, chartLink) {
      const activeClasses = ["active", "underlined-hed", "text-bold"];
      if (chartLink) {
        document.querySelector(".chart-link.active").classList.remove(...activeClasses);
        chartLink.classList.add(...activeClasses);
      } else {
        document.querySelector(".chart-link:first-child").classList.add(...activeClasses);
      }

      this.loaded = false;

      let lcData = JSON.parse(localStorage.getItem("covidData") || null);
      const nowInMs = Date.now() + dateParams.timeOffsetInMs;
      let refreshData = false;
      if (lcData && lcData.expires) {
        refreshData = nowInMs > lcData.expires;
      } else {
        refreshData = true;
      }

      if (refreshData) {
        const covParams = new URLSearchParams();
        covParams.append("from", dateParams.startDate.toISOString().split("T")[0]);
        covParams.append("to", dateParams.endDate.toISOString().split("T")[0]);
        const covid19api = `https://api.covid19api.com/country/philippines?${covParams.toString()}`;

        const ninjaParams = new URLSearchParams();
        ninjaParams.append("lastdays", dateParams.lookbackDays);
        const ninjaApi = `https://corona.lmao.ninja/v2/historical/philippines?${ninjaParams.toString()}`;

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
        const covidData = Array.isArray(rawData) ? fetchFromCovid19(rawData) : fetchFromNinja(rawData);

        lcData = {
          cases: covidData,
          expires: nowInMs + (1 * 60 * 60 * 1000)
        };

        localStorage.setItem("covidData", JSON.stringify(lcData));
      }


      this.chartData = setChartData(lcData.cases.map((c) => ({count: c[dataType], date: c.date})));
      this.chartOptions = getChartOptions();
      this.loaded = true;
    }
  }
};
</script>

<style>
</style>
