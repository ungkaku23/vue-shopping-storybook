<template>
  <div class="line-progress">
    {{stepIndex}}
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
import './line-progress.css';

export default {
  name: 'line-progress',

  props: {
    step: {
      type: Number,
    },
  },

  emits: ['click'],

  setup(props, { emit }) {
    props = reactive(props);
    const stepIndex = ref(props.step);

    return {
      stepIndex
    };
  }
};
</script>
