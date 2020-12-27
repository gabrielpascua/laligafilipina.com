<template>
  <div>
    <sinovac-doughnut-chart :chartdata="sinovacData" :options="sinovacOptions" />
    <sinovac-doughnut-chart :chartdata="pfizerData" :options="pfizerOptions" />
    <sinovac-doughnut-chart :chartdata="modernaData" :options="modernaOptions" />
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
      sinovacOptions: {cutoutPercentage: 75},
      pfizerData: getPfizerData(),
      pfizerOptions: {},
      modernaData: getModernaData(),
      modernaOptions: {}
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
      backgroundColor: ["#dadaef", "yellow", "orange"],
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
      backgroundColor: ["green", "pink", "cyan"],
      weight: 3,
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
