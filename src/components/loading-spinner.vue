<template>
  <div class="loading-spinner">
    <div :style="`color: ${color}`">
      {{label}}
    </div>
    <div class="lds-ellipsis">
      <div :style="`background: ${color}`"></div>
      <div :style="`background: ${color}`"></div>
      <div :style="`background: ${color}`"></div>
      <div :style="`background: ${color}`"></div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
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

  setup(props, { emit }) {
    props = reactive(props);

    return {
      label: computed(() => props.label),
      color: computed(() => props.color)
    };
  }
};
</script>
