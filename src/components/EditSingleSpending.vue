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
				<div class="total">
          {{ key }} - total :
          <span class="totalValue">{{ currentSpending[key].total }}</span>
        </div>
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
import { confirmation } from "../api/confirmationPopup";

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
			this.currentSpending = JSON.parse(JSON.stringify(this.$props.spending));
		}
	},
	methods: {
		handleInputEdit(key,filter,event) {
			this.currentSpending[key][filter] = event.target.value
			this.calcTotal(key)
		},
		calcTotal(categoryName) {
      this.currentSpending[categoryName].total = Object.values(this.currentSpending[categoryName]).reduce((a,b) => Number(a) + Number(b)) - this.currentSpending[categoryName].total
			this.currentSpending.total = 0
			Object.keys(this.currentSpending).filter(value => !this.$options.invalidKeys.includes(value)).forEach(obj => {
				this.currentSpending.total += this.currentSpending[obj].total
			})
    },
		async discardChanges() {
			const answer = await confirmation('скасувати, всі внесені зміни буде втрачено')
			if(answer) {
				this.currentSpending = JSON.parse(JSON.stringify(this.$props.spending));
				this.$emit('cancel')
			}
		},
		async deleteCategory() {
			const answer = await confirmation('видалити витрати, без можливості відновлення')

			if(answer) {
				this.$emit('delete')
			}
		},
		async saveChanges() {
			const answer = await confirmation('зберегти, попередні дані буде втрачено')

			if(answer) {
				this.$emit('save', this.currentSpending)
			}
		}
	},
	emits: {
		'cancel' : null,
		'save' : null,
		'delete' : null
	}
}
</script>

<style>

</style>