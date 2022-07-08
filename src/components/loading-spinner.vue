<template>
  <div class="loading-spinner">
    <div :style="`color: ${colors}`">
      {{labels}}
    </div>
    <div class="lds-ellipsis">
      <div :style="`background: ${colors}`"></div>
      <div :style="`background: ${colors}`"></div>
      <div :style="`background: ${colors}`"></div>
      <div :style="`background: ${colors}`"></div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue';
import './loading-spinner.css';

export default {
  name: 'loading-spinner',

  props: {
    label: {
      type: String,
      default: "Loading"
    },
    color: {
      type: String,
      default: "#000000"
    }
  },

  setup(props) {
    props = reactive(props);

    return {
      labels: computed(() => props.label),
      colors: computed(() => props.color)
    };
  }
};
</script>
