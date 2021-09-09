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
          spacingBottom: 15,
          spacingTop: 20,
          spacingLeft: 10,
          spacingRight: 10,
          styledMode: true,
        	type: 'column'
        },
        title: {
          text: "Статистика витрат",
          style: {
            fontSize: "18px",
            fontWeight: "500",
          },
        },
				yAxis: [{
						title: {
							text: null
						},
				}],
				xAxis: {
          categories: this.sortedData.map(data => data.name),
          labels: {
            style: {
              color: "#222",
            },
          },
          tickmarkPlacement: "on",
          startOnTick: true,
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
            name: 'Витрати за категорією',
            colorByPoint: true,
            data: this.sortedData,
          },
        ],

        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 767,
              },
              chartOptions: {
								chart: {
									type: 'bar'
								},
              },
            },
          ],
        },
      };
    },
		sortedData() {
			return this.chartData.sort((a,b) => {
				if(Number(a.y) > Number(b.y)) {
					return -1
				} 

				if(Number(a.y) < Number(b.y)) {
					return 1
				} 

				return 0
			})
		}
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

// REFACTORED
</script>

<style></style>
