<template>
	<div class="card" v-if="Object.keys($props.spending).length">
    <div class="category-card-row">
      <label class="label-default">Короткий опис:</label>
      <input type="text" class="input-default" v-model="currentSpending.description" />
    </div>
		<template v-for="key in Object.keys(currentSpending).sort()" :key="key" >
			<div v-if="!$options.invalidKeys.includes(key)" class="category-card-row">
				<div class="spending-name">
					{{ key }}
				</div>
				<template v-for="filter in Object.keys(currentSpending[key])" :key="filter">
					<div v-if="!$options.invalidKeys.includes(filter)" class="filter-row">
						<label>
							<input type="number" class="input-default" min="0" :value="currentSpending[key][filter]" @input="handleInputEdit(key,filter,$event)">
							{{ filter }}
						</label>
					</div>
				</template>
			</div>
    </template>		
		<div class="category-card-row category-card-row-three-buttons">
    	<button class="btn-warning" @click="discardChanges()">Скасувати</button>
    	<button class="btn-danger" @click="deleteCategory()">Видалити</button>
    	<button class="btn-primary" @click="saveChanges()">Зберегти</button>
		</div>
	</div>	
</template>

<script>
export default {
	props: {
		spending : {
			type : Object,
			required : true
		}
	},
	data() {
		return {
			currentSpending : {}
		}
	},
	invalidKeys : ["description", "total"],
	watch: {
		spending() {
			this.currentSpending = Object.assign({}, this.spending );
		}
	},
	methods: {
		handleInputEdit(key,filter,event) {
			this.currentSpending[key][filter] = event.target.value
		}
	}
}
</script>

<style>

</style>