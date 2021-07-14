<template>
  <loader v-if="!answerFromDB" type="SQUARE" />
  <div class="card single-category-card" v-else>
    <div class="category-card-row">
      <label class="label-default">Короткий опис:</label>
      <input
        type="text"
        class="input-default"
				v-model="spendingsDescription"
      />
    </div>
    <div 
		v-for="(category, i) in categories"
		:key="i"
		class="category-card-row">
      <label class="label-default">{{ category.categoryName }}</label>
			<div v-for="filter in category.categoryFilters" :key="filter" class="filter-row">
				<input type="number" class="input-default" min="0" value="0" :id='category.categoryName+filter+"-input"' @input="handleInput(category.categoryName, filter)">
				<label :for='filter+"-input"'>{{ filter }}</label>
			</div>
			<div class="total">{{ category.categoryName }} - total : <span class="totalValue">{{ filtersTotal[category.categoryName] ? filtersTotal[category.categoryName].total : 0  }}</span></div>
		</div>
		<button class="btn-primary save-spendings" @click="saveSettings()">
			Зберегти
		</button>
  </div>
</template>
<script>
import { useCollection } from "../api/useCollection";
import Loader from "./Loader.vue";

export default {
	components: {
		Loader,
	},
  data() {
    return {
      categories: [],
			answerFromDB : false,
			filtersValue: {},
			filtersTotal : {},
			spendingsDescription : ''
    };
  },	methods: {
		async loadSettings() {
			this.answerFromDB = false;
			const { getDoc } = useCollection("filtersConfig");
			const loadedConfig = await getDoc("configFile");
			this.answerFromDB = true;

			if (loadedConfig) {
				this.categories = loadedConfig.categories;
			}
		},
	 	saveSettings() {
			let result = {}
			result.total = 0
			for(let key in this.filtersValue) {
				result[key] = JSON.parse(JSON.stringify(this.filtersValue[key]))
				result[key].total = JSON.parse(JSON.stringify(this.filtersTotal[key].total))
				result.total += result[key].total
			}
			result.description = this.spendingsDescription
			this.$emit('save-spend', result)
			this.filtersReset()
		},
		fillFilters(categories) {
			categories.map(category => {
				this.filtersValue[category.categoryName] = {}
				category.categoryFilters.forEach(filter => {
					this.filtersValue[category.categoryName][filter] = 0
				})
			})
		},
		filtersReset() {
			for(let key in this.filtersValue) {
				for(let nestedKey in this.filtersValue[key]) {
					document.getElementById(key+nestedKey+"-input").value = 0
					this.filtersValue[key][nestedKey] = 0
				}
			}
			this.spendingsDescription = ''
		},
		handleInput(categoryName, filter) {
			this.filtersValue[categoryName][filter] = document.getElementById(categoryName+filter+"-input").value
		},
		calcTotal(categoryName) {
			return Object.values(this.filtersValue[categoryName]).reduce((a,b) => Number(a) + Number(b))
		}
	},
	async mounted() {
		await this.loadSettings()		
		this.fillFilters(this.categories)
	},
	watch: {
		filtersValue: {
			handler: function() {
				for(let key in this.filtersValue) {
					if(!this.filtersTotal[key]) {
						this.filtersTotal[key] = {
							total: 0
						}
					}
					this.filtersTotal[key].total = this.calcTotal(key)
				}
			},
			deep : true
		}
	},
	emits: {
		'save-spend' : null
	}
}
</script>