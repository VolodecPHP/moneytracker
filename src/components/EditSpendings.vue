<template>
  <h2 class="default-modal-caption">
    Тут можна редагувати витрати за певну дату
  </h2>
  <div class="card single-category-card">
    <div class="category-card-row">
      <label class="label-default">Виберіть дату витрат:</label>
      <input type="date" class="input-default" v-model="spendingsDate" />
    </div>
  </div>  
  <loader v-if="fetchingSpendings" width="100%" height="300px" type="SPINNER" />
	<div class="card edit-cards-wrapper" v-else-if="allSpendings.length">
		<template v-for="spending in allSpendings" :key="spending" >
			<button @click="openEditingWindow(spending)" class="card edit-card">
				{{ normalizeTitle(spending.description) }}
			</button>
		</template>
  </div>
	<div class="no-spendings-title" v-else>
		В цей день у вас немає витрат
	</div>
	<edit-single-spending :spending="currentSpending"/>
</template>

<script>
import { useCollection } from "../api/useCollection";
import Loader from "./Loader.vue";
import EditSingleSpending from "./EditSingleSpending.vue";

export default {
	components : {
		Loader,
		EditSingleSpending
	},
	data() {
		return {
			allSpendings : [],
			spendingsDate : '',
			fetchingSpendings : false,
			currentSpending : {}
		}
	},
	methods: {
		async loadSpendings() {
			this.fetchingSpendings = true
      const { getDoc } = useCollection("spendings");
			const res = await getDoc(this.spendingsDate)
			if(!res) {
				this.allSpendings = []
			} else {
				this.allSpendings = res.spendings
			}
			this.fetchingSpendings = false
		},
		normalizeTitle(str) {
			return str.length >= 20 ? str.slice(0,17) + '...' : str
		},
		openEditingWindow(spending) {
			if(this.currentSpending !== spending) {
				this.currentSpending = spending
				return
			}

			this.currentSpending = {}
		}
	},
	mounted() {
    const current = new Date();
    const year = current.getFullYear();
    const month = current.getMonth() >= 10 ? current.getMonth() : "0" + current.getMonth();
    const day = current.getDate() >= 10 ? current.getDate() : "0" + current.getDate();
    this.spendingsDate = year + "-" + month + "-" + day;
		this.loadSpendings()
	},
	watch: {
		spendingsDate() {
			this.loadSpendings()
			this.currentSpending = { }
		}
	}
};
</script>

<style></style>
