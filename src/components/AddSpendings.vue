<template>
  <h2 class="default-modal-caption">
    Виберіть дату та заповніть поля, відповідно до ваших витрат
  </h2>
  <div class="card single-category-card">
    <div class="category-card-row">
      <label class="label-default">Виберіть дату витрат:</label>
      <input type="date" class="input-default" v-model="spendingsDate" />
    </div>
  </div>
  <spendings-filters @save-spend="addSpend" :date="spendingsDate"/>
  <loader v-if="fetchingSpendings" width="100%" height="300px" type="SPINNER" />
  <template v-else>
    <div
      v-for="spending in allSpendings"
      :key="spending"
      class="card card--small"
    >
      <div class="title-wrapper">
        <span class="title">{{ spending.description }}</span>
      </div>
      <span class="total">{{ spending.total }}</span>
    </div>
  </template>
  <button class="btn-danger save-spendings" @click="saveSettings()">
    Оновити витрати за цю дату
  </button>
  <loader v-if="savingSettings" size="100-100" type="SPINNER" />
</template>

<script>
import { useCollection } from "../api/useCollection";
import Loader from "./Loader.vue";
import SpendingsFilters from "./SpendingsFilters.vue";

export default {
  components: {
    Loader,
    SpendingsFilters,
  },
  data() {
    return {
      allSpendings: [],
      spendingsDate: "",
      savingSettings: false,
      fetchingSpendings: false,
    };
  },
  methods: {
    addSpend(obj) {
      this.allSpendings.unshift(obj);
    },
    async saveSettings() {
      if (!this.savingSettings) {
        this.savingSettings = true;
        const { addDoc } = useCollection("spendings");
        await addDoc({ spendings: this.allSpendings }, this.spendingsDate);
        this.savingSettings = false;
      }
    },
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
  },
  mounted() {
    const current = new Date();
    const year = current.getFullYear();
    const month =
      current.getMonth() >= 10 ? current.getMonth() : "0" + current.getMonth();
    const day =
      current.getDate() >= 10 ? current.getDate() : "0" + current.getDate();
    this.spendingsDate = year + "-" + month + "-" + day;
		this.loadSpendings()
  },
	watch: {
		spendingsDate() {
			this.loadSpendings()
		}
	}
};
</script>

<style></style>
