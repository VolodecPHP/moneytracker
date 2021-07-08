<template>
	<h2 class="default-modal-caption">Тут можна створити нову категорію, та додати до неї фільтри, або редагувати раніше створені категорії</h2>
	 <category-details v-for="(category, i) in categories" :key="i" :info="category" @handle-delete="deleteCategory" @handle-edit="editCategory"/>
	<add-category @add-new-category="saveCategory"/>
	<button class="btn-danger update-filters" @click="updateSettings()">Оновити категорії і фільтри</button>
</template>

<script>
import { confirmation } from '../api/confirmationPopup'
import AddCategory from './AddCategory.vue'
import CategoryDetails from './CategoryDetails.vue'
import {useCollection} from '../api/useCollection'

export default {
	components: {
		AddCategory,
		CategoryDetails
	},
	data() {
		return { 
			categories: []
		}
	},
	methods: {
		saveCategory(category) {
			this.categories.push(category)
		},
		deleteCategory(category) {
			this.categories = this.categories.filter(item => item !== category)
		},
		editCategory(name, category) {
			for(let i = 0; i < this.categories.length; i++ ) {
				if(this.categories[i].categoryName === name) {
					this.categories[i] = category
					return 
				}
			}
		},
		async updateSettings() {
			let result = await confirmation('оновити ваші категорії та фільтри, усі видалені фільтри та категорії залишаться доступними для перегляду, але не зможуть бути використаними для перегляду статистики')
			if(result) {
				const { addDoc } = useCollection('filtersConfig')
				await addDoc({ categories : this.categories }, 'configFile')
			}
		}
	},
	async mounted () {
		const { getDoc } = useCollection('filtersConfig')
		const loadedConfig = await getDoc('configFile')

		if(loadedConfig) {
			this.categories = loadedConfig.categories
			return
		}
	} 
}
</script>
