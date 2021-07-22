<template>
  <div class="spendings-diagram-wrapper">
    <loader v-if="!answerFromDB" type="BOUNCER" />
    <div class="enabled-filters-wrapper" v-else>
      <div
        v-for="(category, index) in categories"
        :key="index"
        class="card category-row"
      >
        <label class="category-name">
          {{ category.categoryName }}
          <input
            type="checkbox"
            @change="disableCategory($event)"
            checked
						:id="'disabled-'+category.categoryName"
            class="category-input"
          />
        </label>
        <div class="filters">
          <label
            v-for="(filter, index) in category.categoryFilters"
            :key="index"
            class="filter-row"
          >
            {{ filter }}
            <input
              type="checkbox"
              @change="disableFilter($event)"
              checked
							:id="'disabled-'+category.categoryName+'-'+filter"
              class="filter-input"
            />
          </label>
        </div>
      </div>
    </div>
    <div class="scroll-container">
      <div class="show-spendings-diagrams-wrapper">
        <chart-line :spendings="chartInfo" />
        <chart-pie :spendings="chartInfoPie" />
      </div>
    </div>
  </div>
</template>

<script>
import ChartLine from "./ChartLine.vue";
import ChartPie from "./ChartPie.vue";
import { useCollection } from "../api/useCollection";
import Loader from "./Loader.vue";

export default {
  components: {
    ChartLine,
    ChartPie,
    Loader,
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
      disabledFilters: new Set(),
      disabledCategories: new Set(),
      categories: [],
      answerFromDB: false,
    };
  },
  computed: {
    chartInfo() {
      let res = [];

      this.$props.dates.forEach((date) => {
        let total = 0;

        date.spendings.forEach((spending) => {
          Object.keys(spending).forEach((key) => {
            if (
              !this.disabledCategories.has(key) &&
              key !== "description" &&
              key !== "total"
            ) {
              console.log();
              Object.keys(spending[key]).forEach((nestedKey) => {
                if (
                  !this.disabledFilters.has(nestedKey) &&
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
            if (
              !this.disabledCategories.has(key) &&
              key !== "description" &&
              key !== "total"
            ) {
              Object.keys(spending[key]).forEach((nestedKey) => {
                if (
                  !this.disabledFilters.has(nestedKey) &&
                  nestedKey !== "total"
                ) {
                  if (res.has(nestedKey)) {
                    res.set(
                      nestedKey,
                      Number(spending[key][nestedKey]) + res.get(nestedKey)
                    );
                  } else {
                    res.set(nestedKey, Number(spending[key][nestedKey]));
                  }
                }
              });
            }
          });
        });
      });

      let chartData = [];

      res.forEach((value, key) => {
        chartData.push({
          name: key,
          y: value,
        });
      });

      return chartData;
    },
  },
  async mounted() {
    const { getDoc } = useCollection("filtersConfig");
    const loadedConfig = await getDoc("configFile");
    this.answerFromDB = true;

    if (loadedConfig) {
      this.categories = loadedConfig.categories;
      return;
    }
  },
  methods: {
    disableCategory(event) {
			let name = event.target.id.split('-')[1]

      if (!event.target.checked) {
        this.disabledCategories.add(name);

        event.target.closest(".category-row").querySelectorAll(".filter-input").forEach((input) => {
					let inputName = input.id.split('-')[2]
					this.disabledFilters.add(inputName)
					input.checked = false;
				});
        return;
      }

      this.disabledCategories.delete(name);

      event.target.closest(".category-row").querySelectorAll(".filter-input").forEach((input) => {					
				let inputName = input.id.split('-')[2]
				this.disabledFilters.delete(inputName)
				input.checked = true;
			});
    },

    disableFilter(event) {
			let name =  event.target.id.split('-')[2]
			
			if(!event.target.checked) {
				this.disabledFilters.add(name)
				return
			}
      
			this.disabledFilters.delete(name);
    },
  },
};
</script>

<style></style>
