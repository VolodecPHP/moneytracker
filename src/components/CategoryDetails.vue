<template>
	<div 
	class="card single-category-card"
	:class="{'disabled' : !isEditing}">
    <div class="category-card-row">
			<label class="label-default">Назва категорії:</label>
			<input type="text" class="input-default" v-model="categoryName" :disabled="!isEditing">
		</div>
		<div class="category-card-row">
			<label class="label-default">Фільтри:</label>
			<input v-if="isEditing" type="text" class="input-default" v-model="currentFilter" :disabled="!isEditing" @keydown.enter="addFilter()">      
			<button v-if="isEditing" class="button-add" @click="addFilter()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            fill="currentColor"
            d="M384 250v12c0 6.6-5.4 12-12 12h-98v98c0 6.6-5.4 12-12 12h-12c-6.6 0-12-5.4-12-12v-98h-98c-6.6 0-12-5.4-12-12v-12c0-6.6 5.4-12 12-12h98v-98c0-6.6 5.4-12 12-12h12c6.6 0 12 5.4 12 12v98h98c6.6 0 12 5.4 12 12zm120 6c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-32 0c0-119.9-97.3-216-216-216-119.9 0-216 97.3-216 216 0 119.9 97.3 216 216 216 119.9 0 216-97.3 216-216z"
            class=""
          ></path>
        </svg>
      </button>
		</div>
		<div class="category-filters-wrapper">
			<div 
			v-for="filter in categoryFilters" :key="filter"
			class="filter"
			@click="handleRemove(filter)">
				{{ filter }}
			</div>
		</div>
		<div v-if="isEditing" class="category-card-row category-card-row-three-buttons">
    	<button class="btn-warning" @click="discardChanges()">Скасувати</button>
    	<button class="btn-danger" @click="deleteCategory()">Видалити</button>
    	<button class="btn-primary" @click="saveChanges()">Зберегти</button>
		</div>
    <button v-if="!isEditing" class="btn-primary edit-category-button" @click="isEditing = true">Редагувати</button>
	</div>
</template>

<script>
import { confirmation } from '../api/confirmationPopup'

export default {
	props: {
		info : {
			type : Object,
			required : true
		}
	},
	emits: {
		'handle-delete': null,
		'handle-edit': null
	},
	data() {
		return {
			categoryName : this.$props.info.categoryName,
			categoryFilters : new Set(this.$props.info.categoryFilters),
			isEditing : false,
			currentFilter : ''
		}
	},
	methods: {
		handleRemove(filter) {
			if(this.isEditing) {
				this.categoryFilters.delete(filter)
			}
		},
		addFilter() {
			if(this.currentFilter.length) {
				this.categoryFilters.add(this.currentFilter)
			}
			this.currentFilter = ''
		},
		discardChanges() {
			this.categoryName = this.$props.info.categoryName
			this.categoryFilters = new Set(this.$props.info.categoryFilters)
			this.currentFilter = ''
			this.isEditing = false
		},
		async deleteCategory() {
			let result = await confirmation('назавжди видалити цю категорію і її фільтри')
			if(result) {
				this.$emit('handle-delete', this.$props.info)
			}
			this.isEditing = false
		},
		async saveChanges() {
			let result = await confirmation('зберегти зміни, попередні дані буде втрачено')
			if(result) {
				this.$emit('handle-edit', this.info.categoryName ,{
					categoryName : this.categoryName,
					categoryFilters : Array.from(this.categoryFilters)
				})
				this.isEditing = false
			}
			
		}
	},
	watch: {
    $props: {
      handler() {			
				this.categoryName = this.$props.info.categoryName
				this.categoryFilters = new Set(this.$props.info.categoryFilters)
      },
      deep: true,
      immediate: true,
    },
	}
}
</script>

<style>

</style>