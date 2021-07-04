<template>
  <div class="card add-category-card">
    <div class="category-card-row">
      <label class="label-default">Назва категоії:</label>
      <input type="text" class="input-default" v-model="categoryName"/>
    </div>
    <div class="category-card-row">
      <label class="label-default">Фільри цієї категорії:</label>
      <input type="text" class="input-default" v-model="currentFilter" @keydown.enter="addFilter()"/>
      <button class="button-add" @click="addFilter()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            fill="currentColor"
            d="M384 250v12c0 6.6-5.4 12-12 12h-98v98c0 6.6-5.4 12-12 12h-12c-6.6 0-12-5.4-12-12v-98h-98c-6.6 0-12-5.4-12-12v-12c0-6.6 5.4-12 12-12h98v-98c0-6.6 5.4-12 12-12h12c6.6 0 12 5.4 12 12v98h98c6.6 0 12 5.4 12 12zm120 6c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-32 0c0-119.9-97.3-216-216-216-119.9 0-216 97.3-216 216 0 119.9 97.3 216 216 216 119.9 0 216-97.3 216-216z"
            class=""
          ></path>
        </svg>
      </button>
    </div>
		<div class="category-card-row category-card-row-single-item">
    	<button class="btn-primary" @click="saveCategory()">Зберегти</button>
		</div>
		<div class="category-filters-wrapper">
			<div 
			v-for="filter in categoryFilters" :key="filter"
			class="filter"
			@click="handleRemove(filter)">
				{{ filter }}
			</div>
		</div>
  </div>
</template>

<script>
export default {
	data() {
		return {
			categoryName : '',
			currentFilter : '',
			categoryFilters : new Set(),
		}
	},
	emits : {
		'add-new-category' : null
	},

	methods: {
		addFilter() {
			if(this.currentFilter.length) {
				this.categoryFilters.add(this.currentFilter)
			}
			this.currentFilter = ''
		},
		handleRemove(filter) {
			this.categoryFilters.delete(filter)
		},
		saveCategory() {
			this.$emit('add-new-category', {
				categoryName : this.categoryName,
				categoryFilters : Array.from(this.categoryFilters)
			})
			this.categoryName = ''
			this.currentFilter = ''
			this.categoryFilters = new Set()
		}
	}
};
</script>
