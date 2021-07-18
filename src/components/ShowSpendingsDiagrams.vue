<template>
  <div class="show-spendings-diagrams-wrapper">
		{{ $props.dates }}
	</div>
</template>

<script>
export default {
  props: {
    dates: {
      type: Array,
      required: true,
      default: [],
    },
  },
}
</script>

<style>

</style>