<template>
  <h2 class="default-modal-caption">
    Виберіть дату та заповніть поля, відповідно до ваших витрат
  </h2>
  <loader v-if="!answerFromDB" type="SQUARE" />
  <div class="card single-category-card" v-else>
    <div class="category-card-row">
      <label class="label-default">Виберіть дату витрат:</label>
      <input
        type="date"
        class="input-default"
      />
    </div>
    <div 
		v-for="(category, i) in categories"
		:key="i"
		class="category-card-row">
      <label class="label-default">{{ category.categoryName }}</label>
			<template v-if="category.categoryType === 'Number'">
				<div v-for="filter in category.categoryFilters" :key="filter" class="filter-row">
					<input type="number" class="input-default" min="0" value="0">
					<span>{{ filter }}</span>
				</div>
			</template>
			<template v-else>
				<div v-for="filter in category.categoryFilters" :key="filter" class="filter-row">
					<input type="radio" name="filter">
					<span>{{ filter }}</span>
				</div>
			</template>
		</div>
  </div>
</template>

<script>
import { useCollection } from "../api/useCollection";
import Loader from "./Loader.vue";

export default {
	components: {
		Loader
	},
  data() {
    return {
      categories: [],
			answerFromDB : false
    };
  },
  mounted() {
		this.loadSettings()
  },
	methods: {
		async loadSettings() {
			this.answerFromDB = false;
			const { getDoc } = useCollection("filtersConfig");
			const loadedConfig = await getDoc("configFile");
			this.answerFromDB = true;

			if (loadedConfig) {
				this.categories = loadedConfig.categories;
				return;
			}
		}
	}
};
</script>

<style></style>
