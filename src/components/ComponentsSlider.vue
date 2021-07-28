<template>
  <transition name="components-slider">
    <div class="component-slider-wrapper" v-if="$props.opened">
      <div class="card component-slider-inner">
        <component v-if="currentComponent" :is="currentComponent"></component>
      </div>
      <button class="component-slider-wrapper-close" @click="handleClose">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          class="svg-inline--fa fa-times-circle fa-w-16 fa-7x"
        >
          <path
            fill="#929292"
            d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 464c-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216 0 118.7-96.1 216-216 216zm94.8-285.3L281.5 256l69.3 69.3c4.7 4.7 4.7 12.3 0 17l-8.5 8.5c-4.7 4.7-12.3 4.7-17 0L256 281.5l-69.3 69.3c-4.7 4.7-12.3 4.7-17 0l-8.5-8.5c-4.7-4.7-4.7-12.3 0-17l69.3-69.3-69.3-69.3c-4.7-4.7-4.7-12.3 0-17l8.5-8.5c4.7-4.7 12.3-4.7 17 0l69.3 69.3 69.3-69.3c4.7-4.7 12.3-4.7 17 0l8.5 8.5c4.6 4.7 4.6 12.3 0 17z"
            class=""
          ></path>
        </svg>
      </button>
    </div>
  </transition>
</template>

<script>
import AddFilters from "./AddFilters.vue";
import AddSpendings from "./AddSpendings.vue";
import EditSpendings from "./EditSpendings.vue";
import ShowSpendings from "./ShowSpendings.vue";

export default {
  components: {
    AddFilters,
    AddSpendings,
    EditSpendings,
    ShowSpendings,
  },
  props: {
    currentComponent: {
      type: String,
      required: true,
      default: "",
    },
    opened: {
      type: Boolean,
      required: true,
    },
  },
  emits: {
    closeSlider: null,
  },
  watch: {
    opened: function(newActiveComponent) {
      if (newActiveComponent) {
        history.pushState(
          null,
          document.title,
          `${this.$props.currentComponent}`
        );

        return;
      }
    },
  },
  methods: {
    handleClose() {
      this.$emit("closeSlider");
      history.pushState(null, document.title, "/");
    },
  },
  mounted() {
    this.showSlider = this.$props.opened;
  },
};
</script>

<style></style>
