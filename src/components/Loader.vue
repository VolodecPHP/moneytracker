<template>
  <div
    class="loader-wrapper"
    :style="{ width: width, height: height }"
    :class="{ fixed: $props.size === '100-100' }"
  >
    <div class="spinner-loader" v-if="$props.type === 'SPINNER'">
      <div></div>
      <div></div>
    </div>
    <div class="square-loader" v-if="$props.type === 'SQUARE'">
      <div></div>
      <div></div>
    </div>
    <div class="bouncer-loader" v-if="$props.type === 'BOUNCER'">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      required: false,
      default: "100%",
    },

    height: {
      type: String,
      required: false,
      default: "400px",
    },

    type: {
      type: String,
      required: false,
      default: "BOUNCER",
    },

    size: {
      type: String,
      required: false,
      default: "DEFAULT",
    },
  },
};
</script>
