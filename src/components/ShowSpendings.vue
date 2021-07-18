<template>
  <loader v-if="loadingData" size="100-100" type="SQUARE" />
  <template v-else>
    <button class="btn btn-primary btn-change-view" @click="changeView()">
      {{ changeButtonMessage }}
    </button>
		<label class="date-range-picker-label">
			<span>Виберіть діапазон дат:</span>
			<div class="inputs-wrapper">
				<input type="date" v-model="minDate">
				<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-arrow-right fa-w-14 fa-7x"><path fill="currentColor" d="M218.101 38.101L198.302 57.9c-4.686 4.686-4.686 12.284 0 16.971L353.432 230H12c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h341.432l-155.13 155.13c-4.686 4.686-4.686 12.284 0 16.971l19.799 19.799c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L235.071 38.101c-4.686-4.687-12.284-4.687-16.97 0z" class=""></path></svg>
				<input type="date" v-model="maxDate">
			</div>
		</label>
		<template v-if="dateToShow.length">
			<transition name="component-fade" mode="out-in">
				<component :is="viewType" :dates="dateToShow" ></component>
			</transition>
		</template>
		<div class="no-spendings-title" v-else>
			За цей період у вас немає витрат
		</div>
  </template>
</template>

<script>
import ShowSpendingsList from "./ShowSpendingsList.vue";
import ShowSpendingsDiagrams from "./ShowSpendingsDiagrams.vue";
import { useCollection } from "../api/useCollection";
import Loader from "./Loader.vue";

export default {
  components: {
    ShowSpendingsList,
    ShowSpendingsDiagrams,
		Loader
  },
  data() {
    return {
      viewType: "show-spendings-list",
      changeButtonMessage: "Перейти до діаграм",
      documentsFromDb: [],
			loadingData: false,
			minDate : '',
			maxDate : '',
    };
  },
  methods: {
    changeView() {
      if (this.viewType === "show-spendings-list") {
        this.viewType = "show-spendings-diagrams";
        this.changeButtonMessage = "Перейти до списку";
        return;
      }

      this.viewType = "show-spendings-list";
      this.changeButtonMessage = "Перейти до діаграм";
    }
  },
	computed: {
		dateToShow() {
			return this.documentsFromDb.filter(date => date.id >= this.minDate && date.id <= this.maxDate)
		}
	},

  async mounted() {
    this.loadingData = true;
    const { getAllDocuments } = useCollection("spendings");
    const loadedSpendings = await getAllDocuments();

    loadedSpendings.map((doc) => {
			if(doc.data().spendings.length) {
      	this.documentsFromDb.push({'id' : doc.id, ...doc.data()});
			}
    });
		
		this.minDate = this.documentsFromDb[0].id
		this.maxDate = this.documentsFromDb[this.documentsFromDb.length - 1].id
    this.loadingData = false;
  },
};
</script>

<style></style>
