<template>
  <div class="app-inner">
    <template v-if="logined">
      <Header @logout="logout" />
      <h1 class="app-main-title">
        Привіт
        <span
          contenteditable
          class="animatedCaption"
          @input="captionChange($event)"
          >{{ editableCaptionText }}</span
        >!
      </h1>
      <button
        v-for="card in $options.sliderToggleButtons"
        :key="card.buttonComponent"
        @click="triggerSLider(card.buttonComponent)"
        class="card app-main-card"
      >
        <div class="card-title">{{ card.title }}</div>
        <div class="card-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" :d="card.svgPathD" class=""></path>
          </svg>
        </div>
      </button>
      <components-slider
        :currentComponent="activeComponent"
        :opened="sliderOpened"
        @close-slider="closeSlider"
      ></components-slider>
    </template>
    <login @login="successfullyLogined" v-else />
    <div class="confirmation-popup-wrapper">
      <div class="card confirmation-popup">
        <div class="confirmation-popup-title">
          Ви впевнені, що ви хочете
          <span id="confirmationPopupQuestion"></span>?
        </div>
        <button class="btn-primary" id="popupDecline">Відмінити</button>
        <button class="btn-danger" id="popupConfirm">Продовжити</button>
      </div>
    </div>
  </div>
</template>

<script>
import ComponentsSlider from "./components/ComponentsSlider.vue";
import Header from "./components/Header.vue";
import getUser from "./api/getUser";
import Login from "./components/Login.vue";

export default {
  name: "App",
  components: {
    ComponentsSlider,
    Login,
    Header,
  },

  data() {
    return {
      activeComponent: "",
      sliderOpened: false,
      logined: false,
      editableCaptionText: "о_О",
    };
  },

  sliderToggleButtons: [
    {
      title: "Додати витрати",
      svgPathD:
        "M384 250v12c0 6.6-5.4 12-12 12h-98v98c0 6.6-5.4 12-12 12h-12c-6.6 0-12-5.4-12-12v-98h-98c-6.6 0-12-5.4-12-12v-12c0-6.6 5.4-12 12-12h98v-98c0-6.6 5.4-12 12-12h12c6.6 0 12 5.4 12 12v98h98c6.6 0 12 5.4 12 12zm120 6c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-32 0c0-119.9-97.3-216-216-216-119.9 0-216 97.3-216 216 0 119.9 97.3 216 216 216 119.9 0 216-97.3 216-216z",
      buttonComponent: "add-spendings",
    },
    {
      title: "Переглянути статистику",
      svgPathD:
        "M461.29 288H224V50.71c0-8.83-7.18-16.21-15.74-16.21-.69 0-1.4.05-2.11.15C87.08 51.47-3.96 155.43.13 280.07 4.2 404.1 107.91 507.8 231.93 511.87c2.69.09 5.39.13 8.07.13 121.04 0 220.89-89.66 237.35-206.16 1.33-9.45-6.52-17.84-16.06-17.84zM240 480c-2.33 0-4.68-.04-7.02-.12-107.24-3.52-197.35-93.63-200.87-200.87C28.84 179.02 96.45 92.23 192 69.83V320h250.15C420.27 412.43 336.49 480 240 480zM288.8.04c-.35-.03-.7-.04-1.04-.04C279.1 0 272 7.44 272 16.23V240h223.77c9.14 0 16.82-7.69 16.2-16.8C503.72 103.74 408.26 8.28 288.8.04zM304 208V33.9c89.25 13.81 160.28 84.85 174.1 174.1H304z",
      buttonComponent: "show-spendings",
    },
    {
      title: "Редагувати витрати",
      svgPathD:
        "M417.8 315.5l20-20c3.8-3.8 10.2-1.1 10.2 4.2V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h292.3c5.3 0 8 6.5 4.2 10.2l-20 20c-1.1 1.1-2.7 1.8-4.2 1.8H48c-8.8 0-16 7.2-16 16v352c0 8.8 7.2 16 16 16h352c8.8 0 16-7.2 16-16V319.7c0-1.6.6-3.1 1.8-4.2zm145.9-191.2L251.2 436.8l-99.9 11.1c-13.4 1.5-24.7-9.8-23.2-23.2l11.1-99.9L451.7 12.3c16.4-16.4 43-16.4 59.4 0l52.6 52.6c16.4 16.4 16.4 43 0 59.4zm-93.6 48.4L403.4 106 169.8 339.5l-8.3 75.1 75.1-8.3 233.5-233.6zm71-85.2l-52.6-52.6c-3.8-3.8-10.2-4-14.1 0L426 83.3l66.7 66.7 48.4-48.4c3.9-3.8 3.9-10.2 0-14.1z",
      buttonComponent: "edit-spendings",
    },
    {
      title: "Додати фільтри",
      svgPathD:
        "M463.952 0H48.057C5.419 0-16.094 51.731 14.116 81.941L176 243.882V416c0 15.108 7.113 29.335 19.2 40l64 47.066c31.273 21.855 76.8 1.538 76.8-38.4V243.882L497.893 81.941C528.042 51.792 506.675 0 463.952 0zM288 224v240l-64-48V224L48 48h416L288 224z",
      buttonComponent: "add-filters",
    },
  ],

  componentNames: new Set([
    "add-spendings",
    "show-spendings",
    "edit-spendings",
    "add-filters",
  ]),

  methods: {
    triggerSLider(componentName) {
      this.activeComponent = componentName;
      this.sliderOpened = true;
    },
    closeSlider() {
      this.sliderOpened = false;
    },
    successfullyLogined(user) {
      this.logined = true;
      localStorage.setItem("logined-user", JSON.stringify(user));
    },
    captionChange(e) {
      localStorage.setItem("captionMoneytracker", e.target.textContent);
    },
    logout() {
      localStorage.removeItem("logined-user");
      this.logined = false;
    },
		getCaptionFromLS() {
			let captionFromLs = localStorage.getItem("captionMoneytracker");

			if (captionFromLs) {
				this.editableCaptionText = captionFromLs;
			}
		},
		getComponentNameFromWindowLocation() {
			let path = window.location.pathname.split("/")[1];

			if (path && this.$options.componentNames.has(path)) {
				this.triggerSLider(path);
				return;
			}
		}
  },

  mounted() {
		getUser() ? this.logined = true : this.logined = false

		this.getCaptionFromLS()

		this.getComponentNameFromWindowLocation()
  },
};
</script>

<style src="./assets/css/main.css"></style>
