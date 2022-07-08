<template>
  <div class="line-progress" :style="styles">
    <div 
      v-for="(point, index) in points"
      :key="randKey()"
      :class="`point-line ${index < 2 ? 'group' : ''}`"
    >
      <div 
        class="point-box"
        @click="$emit('click', index + 1)"
      >
        <div :class="`point ${index < step ? '' : 'inactive'}`">
          <svg
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            v-if="index < step" 
          >
            <use href="../assets/icon/feather-sprite.svg#check"/>
          </svg>
          <span v-else>0{{point.index}}</span>
        </div>
        <span :class="`label ${index < step ? '' : 'inactive-font'}`">{{point.label}}</span>
      </div>
      <div 
        v-if="index < 2" 
        :class="`bar ${index < step - 1 ? '' : 'inactive'}`"
      >
      </div>
    </div>
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
      default: 1,
    },
    style: {
      type: String,
      default: ""
    }
  },

  emits: ['click'],

  setup(props, { emit }) {
    props = reactive(props);
    const stepIndex = ref(props.step);

    return {
      points: [{
        index: 1,
        label: "Shipping"
      }, {
        index: 2,
        label: "Payment"
      }, {
        index: 3,
        label: "Review"
      }],
      styles: computed(() => props.style),
      stepIndex
    };
  }
};
</script>
