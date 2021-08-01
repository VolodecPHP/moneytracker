<template>
  <div class="app-inner">
    <template v-if="logined">
      <Header @logout="logout" />
      <button class="theme-toggler" @click="handleChangeThemeClick($event)">
        <svg
          v-if="lightTheme"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"
          ></path>
        </svg>
        <svg v-else viewBox="0 0 399.079 399.079" fill="currentColor">
          <g>
            <g>
              <path
                d="M371.84,100.04c-2.01-3.457-6.443-4.63-9.9-2.62l-35.36,20.44c-3.457,2.01-4.63,6.443-2.62,9.9    c2.01,3.457,6.443,4.63,9.9,2.62l35.36-20.44C372.677,107.929,373.85,103.497,371.84,100.04z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M369.22,289.18l-35.36-20.44c-3.457-2.01-7.89-0.837-9.9,2.62c-2.01,3.457-0.837,7.89,2.62,9.9l35.36,20.44    c3.457,2.01,7.89,0.837,9.9-2.62C373.85,295.622,372.677,291.19,369.22,289.18z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M200.099,342.62c-4.01-0.298-7.501,2.711-7.799,6.721c-0.027,0.359-0.027,0.719,0,1.078v40.84    c-0.298,4.01,2.711,7.501,6.721,7.799s7.501-2.711,7.799-6.721c0.027-0.359,0.027-0.719,0-1.078v-40.84    C207.117,346.41,204.108,342.918,200.099,342.62z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M72.5,117.86L37.14,97.42c-3.457-2.01-7.89-0.837-9.9,2.62c-2.01,3.457-0.837,7.89,2.62,9.9l35.36,20.44    c3.457,2.01,7.89,0.837,9.9-2.62C77.13,124.302,75.957,119.87,72.5,117.86z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M200.099,0.02c-4.01-0.298-7.501,2.711-7.799,6.721c-0.027,0.359-0.027,0.719,0,1.078v40.84    c0.022,3.989,3.251,7.218,7.24,7.24c4.021,0,7.28-3.259,7.28-7.28V7.82C207.117,3.81,204.108,0.318,200.099,0.02z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M130.34,65.22l-20.4-35.36c-2.01-3.457-6.443-4.63-9.9-2.62c-3.457,2.01-4.63,6.443-2.62,9.9l20.4,35.36    c2.01,3.457,6.443,4.63,9.9,2.62C131.177,73.109,132.35,68.677,130.34,65.22z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M200.618,134.94c-0.359-0.027-0.719-0.027-1.078,0c-35.678,0-64.6,28.922-64.6,64.6c0,4.021,3.259,7.28,7.28,7.28    c4.005-0.022,7.24-3.275,7.24-7.28c-0.022-27.636,22.364-50.058,50-50.08c0.027,0,0.053,0,0.08,0    c4.01,0.298,7.501-2.711,7.799-6.721S204.628,135.237,200.618,134.94z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M397.98,198.98c-0.267-3.595-3.125-6.454-6.721-6.721h-40.84c-4.01-0.298-7.501,2.711-7.799,6.721    s2.711,7.501,6.721,7.799c0.359,0.027,0.72,0.027,1.079,0h40.84C395.269,206.482,398.278,202.99,397.98,198.98z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M49.738,192.3c-0.359-0.027-0.719-0.027-1.078,0H7.82c-4.01,0.298-7.019,3.79-6.721,7.799    c0.267,3.595,3.125,6.454,6.721,6.721h40.84c4.01,0.298,7.501-2.711,7.799-6.721C56.757,196.089,53.748,192.597,49.738,192.3z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M199.569,92.7c-59.006-0.008-106.846,47.819-106.855,106.825c-0.004,28.347,11.258,55.534,31.305,75.575    c20.009,20.059,47.188,31.316,75.52,31.28c59.006,0.008,106.847-47.819,106.855-106.825S258.575,92.708,199.569,92.7z     M264.819,264.94c-36.053,36.053-94.507,36.053-130.56,0c-17.343-17.343-27.072-40.874-27.04-65.4    c-0.035-24.492,9.697-47.987,27.04-65.28v0.12c36.053-36.053,94.507-36.053,130.56,0    C300.873,170.433,300.873,228.887,264.819,264.94z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M301.678,361.972c-0.006-0.011-0.012-0.022-0.019-0.032l-20.44-35.36c-2.01-3.457-6.443-4.63-9.9-2.62    c-3.457,2.01-4.63,6.443-2.62,9.9l20.44,35.36c2.002,3.453,6.422,4.634,9.88,2.64    C302.484,369.863,303.675,365.436,301.678,361.972z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M299.28,27.24c-3.457-2.01-7.89-0.837-9.9,2.62l-20.44,35.36c-2.024,3.449-0.868,7.885,2.58,9.908    c0.007,0.004,0.013,0.008,0.02,0.012h0c3.454,2.014,7.887,0.847,9.901-2.608c0.006-0.011,0.013-0.022,0.019-0.032l20.44-35.36    C303.91,33.682,302.737,29.25,299.28,27.24z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M127.76,323.96c-3.457-2.01-7.89-0.837-9.9,2.62l-20.44,35.36c-2.01,3.457-0.837,7.89,2.62,9.9s7.89,0.837,9.9-2.62    l20.44-35.36C132.39,330.402,131.217,325.97,127.76,323.96z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M75.12,271.32c-2.01-3.457-6.443-4.63-9.9-2.62l-35.36,20.44c-3.457,2.01-4.63,6.443-2.62,9.9    c2.01,3.457,6.443,4.63,9.9,2.62l35.36-20.44C75.957,279.209,77.13,274.777,75.12,271.32z"
              />
            </g>
          </g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
        </svg>
        <div class="theme-changing-circle"></div>
      </button>
      <transition
        appear
        @before-enter="beforeEnterCaption"
        @enter="enterCaption"
      >
        <h1 class="app-main-title">
          Привіт
          <span contenteditable @input="captionChange($event)">{{
            editableCaptionText
          }}</span
          >!
        </h1>
      </transition>
      <transition-group
        appear
        @before-enter="beforeEnterButton"
        @enter="enterButton"
      >
        <button
          v-for="(card, index) in $options.sliderToggleButtons"
          :key="card.buttonComponent"
          @click="triggerSLider(card.buttonComponent)"
          class="card app-main-card"
          :data-index="index"
        >
          <div class="card-title">{{ card.title }}</div>
          <div class="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" :d="card.svgPathD" class=""></path>
            </svg>
          </div>
        </button>
      </transition-group>
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
import gsap from "gsap";
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
      editableCaptionText: "text_here",
      lightTheme: true,
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
    },
    handleChangeThemeClick(event) {
      const windowWidth = window.screen.width;
      const windowHeight = window.screen.height;

      let diagonal = Math.sqrt(windowWidth ** 2 + windowHeight ** 2);

      let themeCircle = document.querySelector(".theme-changing-circle");
      let body = document.body;
      body.classList.add("theme-changing");
      let button = event.target.closest("button");
      button.disabled = true;

      gsap.to(themeCircle, {
        duration: 0.7,
        ease: "Power0.easeNone",
        width: `${diagonal * 2}px`,
        height: `${diagonal * 2}px`,
        onComplete: () => {
          themeCircle.style.removeProperty("width");
          themeCircle.style.removeProperty("height");
          themeCircle.style.removeProperty("display");
          body.classList.remove("theme-changing");
          button.disabled = false;
        },
      });

      setTimeout(() => {
        themeCircle.style.display = "none";
        this.lightTheme = !this.lightTheme;
      }, 400);
    },
    changeTheme() {
      !this.lightTheme
        ? document.querySelector("html").classList.add("theme-dark")
        : document.querySelector("html").classList.remove("theme-dark");
      localStorage.setItem("lightTheme", this.lightTheme);
    },
    getThemeFromLS() {
      let lightTheme = JSON.parse(localStorage.getItem("lightTheme"));

      this.lightTheme = lightTheme;
    },
    // transitions

    beforeEnterCaption(element) {
      element.style.transform = "translateX(500px)";
      element.style.opacity = 0;
    },
    enterCaption(element) {
      gsap.to(element, {
        duration: 1,
        opacity: 1,
        x: 0,
        ease: "power2.out",
      });
    },
    beforeEnterButton(element) {
      element.style.transform = "translateY(200px)";
      element.style.opacity = 0;
    },
    enterButton(element, done) {
      gsap.to(element, {
        duration: 1,
        y: 0,
        opacity: 1,
        onComplete: done,
        ease: "back.out(1.7)",
        delay: element.dataset.index * 0.2,
      });
    },
  },

  mounted() {
    getUser() ? (this.logined = true) : (this.logined = false);

    this.getCaptionFromLS();

    this.getComponentNameFromWindowLocation();

    this.getThemeFromLS();
  },
  watch: {
    lightTheme() {
      this.changeTheme();
    },
  },
};
</script>

<style src="./assets/css/main.css"></style>
