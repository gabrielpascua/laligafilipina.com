<template>
  <div class="flex">
    <sinovac-doughnut-chart :chartdata="sinovacData" :options="sinovacOptions" class="col-4 pl-1 pr-1" />
    <sinovac-doughnut-chart :chartdata="pfizerData" :options="pfizerOptions" class="col-4 pl-1 pr-1" />
    <sinovac-doughnut-chart :chartdata="modernaData" :options="modernaOptions" class="col-4 pl-1 pr-1" />
    <sinovac-doughnut-chart :chartdata="janssenData" :options="janssenOptions" class="col-4 pl-1 pr-1" />
  </div>
</template>

<script>
import SinovacDoughnutChart from "./SinovacDoughnutChart.vue";

export default {
  name: "SinovacDoughnutContainer",
  components: {SinovacDoughnutChart},
  data: function() {
    return {
      sinovacData: getSinovacData(),
      sinovacOptions: {cutoutPercentage: 75, centerText: "Sinovac", legend: {display: false}},
      pfizerData: getPfizerData(),
      pfizerOptions: {cutoutPercentage: 75, centerText: "Pfizer", legend: {display: false}},
      modernaData: getModernaData(),
      modernaOptions: {cutoutPercentage: 75, centerText: "Moderna", legend: {display: false}},
      janssenData: getJanssenData(),
      janssenOptions: {cutoutPercentage: 75, centerText: "Janssen", legend: {display: false}},
    };
  },
  mounted: async function() {},
  methods: {},
  computed: {}
};

function getSinovacData() {
  return {
    datasets: [{
      data: [30, 44, 55],
      backgroundColor: ["#faf8d3", "blue", "red"],
      weight: 1,
    }],
    labels: [
      "Red",
      "Yellow",
      "Blue"
    ]
  };
}

function getPfizerData() {
  return {
    datasets: [{
      data: [12, 24, 35],
      backgroundColor: ["#faf8d3", "blue", "red"],
      weight: 2,
    }],
    labels: [
      "Red",
      "Yellow",
      "Blue"
    ]
  };
}

function getModernaData() {
  return {
    datasets: [{
      data: [50, 100, 150],
      backgroundColor: ["#faf8d3", "blue", "red"],
      weight: 2,
    }],
    labels: [
      "Red",
      "Yellow",
      "Blue"
    ]
  };
}

function getJanssenData() {
  return {
    datasets: [{
      data: [50, 100, 150],
      backgroundColor: ["#faf8d3", "blue", "red"],
      weight: 2,
    }],
    labels: [
      "Red",
      "Yellow",
      "Blue"
    ]
  };
}
</script>

<style>
</style>
