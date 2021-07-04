<template>
	<h2 class="default-modal-caption">Тут можна створити нову категорію, та додати до неї фільтри, або редагувати раніше створені категорії</h2>
	 <category-details v-for="(category, i) in categories" :key="i" :info="category"/>
	<add-category @add-new-category="saveCategory"/>
</template>

<script>
import AddCategory from './AddCategory.vue'
import CategoryDetails from './CategoryDetails.vue'

export default {
	components: {
		AddCategory,
		CategoryDetails
	},
	data() {
		return { 
			categories: [
				{
					categoryName : 'nametest',
					categoryFilters : ['filter1', 'filter2', 'filter3']
				}
			]
		}
	},
	methods: {
		saveCategory(category) {
			this.categories.push(category)
		}
	}
}
</script>
