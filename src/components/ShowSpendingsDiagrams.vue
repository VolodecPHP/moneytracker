<template>
	<div class="scroll-container">
		<div class="show-spendings-diagrams-wrapper">
			<chart-line :spendings="chartInfo"/>
			<chart-pie :spendings="chartInfoPie"/>
		</div>
	</div>
</template>

<script>
import ChartLine from "./ChartLine.vue";
import ChartPie from "./ChartPie.vue";

export default {
  components: {
    ChartLine,
		ChartPie
  },
  props: {
    dates: {
      type: Array,
      required: true,
      default: [],
    },
  },
  data() {
    return {
      disabledSpendings: [],
      disabledKeys: ["description", "total"],
    };
  },
  computed: {
    chartInfo() {
      let res = [];

      this.$props.dates.forEach((date) => {
        let total = 0;

        date.spendings.forEach((spending) => {
          Object.keys(spending).forEach((key) => {
            if (!this.disabledKeys.includes(key)) {
              Object.keys(spending[key]).forEach((nestedKey) => {
                if (
                  !this.disabledSpendings.includes(nestedKey) &&
                  nestedKey !== "total"
                ) {
                  total += Number(spending[key][nestedKey]);
                }
              });
            }
          });
        });

        res.push({ id: date.id, spending: total });
      });

      return res;
    },
		chartInfoPie() {      
			let res = new Map();

      this.$props.dates.forEach((date) => {
        date.spendings.forEach((spending) => {
          Object.keys(spending).forEach((key) => {
            if (!this.disabledKeys.includes(key)) {
              Object.keys(spending[key]).forEach((nestedKey) => {
                if (!this.disabledSpendings.includes(nestedKey) && nestedKey !== "total") {
									if(res.has(nestedKey)) {
										res.set(nestedKey, Number(spending[key][nestedKey]) + res.get(nestedKey))
									} else {
										res.set(nestedKey, Number(spending[key][nestedKey]))
									}
                }
              });
            }
          });
        });
      });

			let chartData = []

			res.forEach((value,key) => {
				chartData.push({
					name : key,
					y : value
				})
			})

      return chartData;
		}
  },
};
</script>

<style></style>
