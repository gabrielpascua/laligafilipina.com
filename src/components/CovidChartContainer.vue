<template>
  <div>
    <ul class="chart-links inline-block mt-2 mb-0">
      <li>
        <span class="chart-link pointer pr-2 pb-1" @click="updateChart(['deaths', 'recovered', 'confirmed'], $event.target)">
          <i style="background-color: rgb(224, 224, 224); padding: 0 0.35rem; font-size: 0.75rem; margin-right: .25rem;">&nbsp;</i>
          Cases
        </span>
      </li>
      <li>
        <span class="chart-link pointer pr-2 pb-1" @click="updateChart(['recovered', 'confirmed'], $event.target)">
          <i style="background-color: rgb(181, 223, 185); padding: 0 0.35rem; font-size: 0.75rem; margin-right: .25rem;">&nbsp;</i>
          Recoveries
        </span>
      </li>
      <li>
        <span class="chart-link pointer pr-2 pb-1" @click="updateChart(['deaths', 'confirmed'], $event.target)">
          <i style="background-color: rgba(0, 0, 0, .5); padding: 0 0.35rem; font-size: 0.75rem; margin-right: .25rem;">&nbsp;</i>
          Deaths
        </span>
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
        },
        stacked: true
      }],
      yAxes: [{
        ticks: {
          callback: function(value, index, values) {
            return value.toLocaleString();
          }
        },
        stacked: true
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
  const colorDictionary = {
    confirmed: "rgba(0,0,0,.08)",
    deaths: "rgba(0, 0, 0, 0.4)",
    recovered: "rgba(0, 156, 19, 0.3)"
  };

  return {
    labels: cases.find((c) => c.type === "confirmed").data.map((c) => c.date),
    datasets: cases.map((ct, i) => {
      if (ct.type === "confirmed") {
        return {
          data: ct.data.map((c) => c.count),
          borderWidth: 1,
          backgroundColor: colorDictionary[ct.type],
        };
      } else {
        return {
          type: "bar",
          data: ct.data,
          borderWidth: 1,
          backgroundColor: colorDictionary[ct.type]
        };
      }
    })
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
    await this.updateChart(["deaths", "recovered", "confirmed"]);
  },
  methods: {
    updateChart: async function(dataTypes, chartLink) {
      if (chartLink && chartLink.nodeName === "I") {
        chartLink = chartLink.parentNode;
      }

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

      const maxSubtract = dataTypes.length - 1; //confirmed is always last
      const chartData = dataTypes.map((dt) => {
        if (dt === "confirmed") {
          return {
            type: dt,
            data: lcData.cases.map((c) => {
              let count = c[dt];
              for (let i = 0; i < maxSubtract; i++) {
                count -= c[dataTypes[i]];
              }
              return {count, date: c.date};
            })
          };
        } else {
          return {
            type: dt,
            data: lcData.cases.map((c) => c[dt])
          };
        }
      });

      this.chartData = setChartData(chartData);
      this.chartOptions = getChartOptions();
      this.loaded = true;
    }
  }
};
</script>

<style>
</style>
