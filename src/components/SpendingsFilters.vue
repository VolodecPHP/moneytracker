<template>
  <loader v-if="!answerFromDB" type="SQUARE" />

  <div class="card single-category-card" v-else>
    <div class="category-card-row">
      <label class="label-default">Короткий опис:</label>
      <input type="text" class="input-default" v-model="spendingsDescription" />
    </div>

    <template v-if="valuesLoaded">
      <div
        v-for="(category, i) in categories"
        :key="i"
        class="category-card-row"
      >
        <label class="label-default">{{ category.categoryName }}</label>

        <div
          v-for="filter in category.categoryFilters"
          :key="filter"
          class="filter-row"
        >
          <label>
            <input
              type="number"
              class="input-default"
              min="0"
              :value="filtersValue[category.categoryName][filter]"
              @input="handleInput(category.categoryName, filter, $event)"
            />
            {{ filter }}
          </label>
        </div>

        <div class="total">
          {{ category.categoryName }} - total :
          <span class="totalValue">{{
            filtersValue[category.categoryName].total
          }}</span>
        </div>
      </div>
    </template>

    <button class="btn-primary save-spendings" @click="saveSettings()">
      Зберегти
    </button>
  </div>
</template>
<script>
import { useCollection } from "../api/useCollection";
import Loader from "./Loader.vue";
import getUser from "../api/getUser";

export default {
  components: {
    Loader,
  },
  data() {
    return {
      categories: [],
      answerFromDB: false,
      filtersValue: {},
      spendingsDescription: "",
      valuesLoaded: false,
    };
  },
  methods: {
    async loadSettings() {
			let user = getUser()
      this.answerFromDB = false;
      const { getDoc } = useCollection(user.uid);
      const loadedConfig = await getDoc("configFile");
      this.answerFromDB = true;

      if (loadedConfig) {
        this.categories = loadedConfig.categories;
      }
    },
    saveSettings() {
      let result = {};
      result.total = 0;
      for (let key in this.filtersValue) {
        result[key] = JSON.parse(JSON.stringify(this.filtersValue[key]));
        result.total += result[key].total;
      }
      result.description = this.spendingsDescription;
      this.$emit("save-spend", result);
      this.filtersReset();
    },
    fillFilters(categories) {
      categories.map((category) => {
        this.filtersValue[category.categoryName] = {
          total: 0,
        };
        category.categoryFilters.forEach((filter) => {
          this.filtersValue[category.categoryName][filter] = 0;
        });
      });
    },
    filtersReset() {
      for (let key in this.filtersValue) {
        for (let nestedKey in this.filtersValue[key]) {
          this.filtersValue[key][nestedKey] = 0;
        }
      }
      this.spendingsDescription = "";
    },
    handleInput(name, filter, event) {
      this.filtersValue[name][filter] = event.target.value;
      this.calcTotal(name);
    },
    calcTotal(categoryName) {
      this.filtersValue[categoryName].total =
        Object.values(this.filtersValue[categoryName]).reduce(
          (a, b) => Number(a) + Number(b)
        ) - this.filtersValue[categoryName].total;
    },
  },
  async mounted() {
    await this.loadSettings();
    this.fillFilters(this.categories);
    this.valuesLoaded = true;
  },
  emits: {
    "save-spend": null,
  },
  props: {
    date: {
      type: String,
      required: false,
    },
  },
  watch: {
    date() {
      this.filtersReset();
    },
  },
};
</script>
