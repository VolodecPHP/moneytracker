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
			<button @click="openEditingWindow(spending)" 
			class="card edit-card"
			:class="{ 'edit-card--active' : spending === currentSpending}">
				<div class="title">{{ spending.description }}</div>
			</button>
		</template>
  </div>
	<div class="no-spendings-title" v-else>
		В цей день у вас немає витрат
	</div>
	<edit-single-spending :spending="currentSpending" @cancel="discaredChanges" @save="saveChanges" @delete="deleteSpending"/>
  <button class="btn-danger update-filters" @click="updateData()">
    Оновити дані за цю дату
  </button>
  <loader v-if="savingData" size="100-100" type="SPINNER" />
</template>

<script>
import { useCollection } from "../api/useCollection";
import Loader from "./Loader.vue";
import EditSingleSpending from "./EditSingleSpending.vue";
import { confirmation } from "../api/confirmationPopup";
import getUser from "../api/getUser";

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
			currentSpending : {},
			savingData : false,
			uid : ''
		}
	},
	methods: {
		async loadSpendings() {
			this.fetchingSpendings = true
      const { getDoc } = useCollection(this.uid);
			const res = await getDoc(this.spendingsDate)
			if(!res) {
				this.allSpendings = []
			} else {
				this.allSpendings = res.spendings
			}
			this.fetchingSpendings = false
		},
		openEditingWindow(spending) {
			if(this.currentSpending !== spending) {
				this.currentSpending = spending
				return
			}

			this.currentSpending = {}
		},
		discaredChanges() {
			this.currentSpending = {}
		},
		saveChanges(spending) {
			let index = this.allSpendings.indexOf(this.currentSpending)
			this.allSpendings[index] = spending
		},
		deleteSpending() {
      this.allSpendings = this.allSpendings.filter((item) => item !== this.currentSpending);
			this.currentSpending = {}
		},
		async updateData() {
      let result = await confirmation(
        "оновити ваші дані, ці зміни НЕМОЖЛИВО буде відмінити"
      );
      if (result) {
        this.savingData = true;
        const { addDoc } = useCollection(this.uid);
        await addDoc({ spendings : this.allSpendings }, this.spendingsDate);
        this.savingData = false;
      }
		}
	},
	mounted() {
		let user = getUser()
		this.uid = user.uid
    const current = new Date();
    const year = current.getFullYear();
    const month = current.getMonth() >= 10 ? (current.getMonth() + 1) : "0" + (current.getMonth() + 1);
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
