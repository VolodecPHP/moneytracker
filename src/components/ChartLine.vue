<template>
  <div class="card chart-wrapper chart-line-wrapper">
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
      seriesData: [],
      categories: [],
    };
  },
  computed: {
    chartOptions() {
      return {
        chart: {
          type: "areaspline",
          spacingBottom: 15,
          spacingTop: 20,
          spacingLeft: 10,
          spacingRight: 10,
          styledMode: true,
          scrollablePlotArea: {
            minWidth: this.seriesData.length * 10,
            scrollPositionX: 1,
          },
        },
        title: {
          text: "Статистика витрат",
          style: {
            fontSize: "18px",
            fontWeight: "500",
            color: "#222",
          },
        },
        xAxis: {
          categories: this.categories,
          labels: {
            style: {
              color: "#222",
            },
          },
          tickmarkPlacement: "on",
          startOnTick: true,
        },
        yAxis: {
          title: {
            text: "Витрати",
          },
        },
        legend: {
          itemMarginLeft: 20,
          itemMarginRight: 20,
          reversed: true,
          backgroundColor: "#F5F5F5",
          borderRadius: 6,
          padding: 14,
          margin: 32,
          itemStyle: {
            align: "center",
            color: "#222",
          },
        },
        plotOptions: {
          series: {
            pointPlacement: "on",
            marker: {
              enabled: true,
              symbol: "circle",
              radius: 2,
            },
          },
        },
        defs: {
          "clicks-chart-gradient": {
            tagName: "linearGradient",
            id: "clicks-chart-gradient",
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [
              {
                tagName: "stop",
                offset: 0,
              },
              {
                tagName: "stop",
                offset: 1,
              },
            ],
          },
        },
        series: [
          {
            name: "Витрати",
            data: this.seriesData,
          },
        ],
      };
    },
  },
  props: {
    spendings: {
      type: Array,
      required: true,
    },
  },
  watch: {
    $props: {
      handler() {
        this.categories = [];
        this.seriesData = [];

        this.fillEmptyDates();
      },

      deep: true,
      immediate: true,
    },
  },
  methods: {
    daysBetween(startDate, endDate) {
      return (endDate - startDate) / (24 * 60 * 60 * 1000);
    },
    getNextDate(d, n) {
      let date = new Date(d.getTime() + n * 24 * 60 * 60 * 1000);
      let day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
      let month =
        date.getMonth() >= 10
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1);
      return day + "-" + month;
    },
    categoriesPushNormalizedDate(date) {
      this.categories.push(
        date
          .split("-")
          .reverse()
          .slice(0, 2)
          .join("-")
      );
    },
    fillEmptyDates() {
      this.$props.spendings.forEach((spending, index) => {
        if (index >= this.$props.spendings.length - 1) {
          this.categoriesPushNormalizedDate(spending.id);
          this.seriesData.push(spending.spending);

          return;
        }

        let date = new Date(spending.id);
        let nextDate = new Date(this.$props.spendings[index + 1].id);
        let diff = this.daysBetween(date, nextDate);

        this.categoriesPushNormalizedDate(spending.id);

        this.seriesData.push(spending.spending);

        for (let i = 1; i < diff; i++) {
          this.categories.push(this.getNextDate(date, i));
          this.seriesData.push(0);
        }

        return;
      });
    },
  },
	mounted() {
		for(let i = 0; i <= 200; i++) {
			this.seriesData.push(Math.random() * 1000)
			this.categories.push(i)
		}
	}
};

// REFACTORED
</script>

<style scoped></style>
