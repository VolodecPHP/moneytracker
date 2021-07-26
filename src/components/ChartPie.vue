<template>
  <div class="card chart-wrapper chart-pie-wrapper">
    <vue-highcharts
      type="chart"
      :options="chartOptions"
      :redrawOnUpdate="true"
      :oneToOneUpdate="false"
      :animateOnUpdate="true"
    />
  </div>
</template>

<script>
import VueHighcharts from "vue3-highcharts";

export default {
  components: {
    VueHighcharts,
  },
  data() {
    return {
      chartData: [],
    };
  },
  computed: {
    chartOptions() {
      return {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie",
        },
        title: {
          text: "Статистика витрат",
          style: {
            fontSize: "18px",
            fontWeight: "500",
            color: "#222",
          },
        },

        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b>: {point.percentage:.1f} %",
            },
          },
        },
        series: [
          {
            name: "Витрачено",
            colorByPoint: true,
            data: this.chartData,
          },
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 767,
              },
              chartOptions: {
                plotOptions: {
                  pie: {
                    dataLabels: {
											distance : 0
                    },
                  },
                },
              },
            },
          ],
        },
      };
    },
  },
  props: {
    spendings: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.chartData = this.$props.spendings;
  },
  watch: {
    $props: {
      handler() {
        this.chartData = this.$props.spendings;
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style></style>
