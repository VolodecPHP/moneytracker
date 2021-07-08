<template>
	<h2 class="default-modal-caption">Тут можна створити нову категорію, та додати до неї фільтри, або редагувати раніше створені категорії</h2>
	<loader v-if="!answerFromDB" type="BOUNCER"/>
	<category-details v-for="(category, i) in categories" :key="i" :info="category" @handle-delete="deleteCategory" @handle-edit="editCategory" v-else/>
	<add-category @add-new-category="saveCategory"/>
	<button class="btn-danger update-filters" @click="updateSettings()">Оновити категорії і фільтри</button>
	<loader v-if="savingSettings" size="100-100" type="SPINNER"/>
</template>

<script>
import { confirmation } from '../api/confirmationPopup'
import AddCategory from './AddCategory.vue'
import CategoryDetails from './CategoryDetails.vue'
import Loader from './Loader.vue'
import {useCollection} from '../api/useCollection'

export default {
	components: {
		AddCategory,
		CategoryDetails,
		Loader
	},
	data() {
		return { 
			categories: [],
			answerFromDB : false,
			savingSettings : false,
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
				this.savingSettings = true
				const { addDoc } = useCollection('filtersConfig')
				await addDoc({ categories : this.categories }, 'configFile')
				this.savingSettings = false
			}
		}
	},
	async mounted () {
		const { getDoc } = useCollection('filtersConfig')
		const loadedConfig = await getDoc('configFile')
		this.answerFromDB = true

		if(loadedConfig) {
			this.categories = loadedConfig.categories
			return
		}
	} 
}
</script>
