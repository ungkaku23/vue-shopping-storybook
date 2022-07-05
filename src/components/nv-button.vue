<template>
  <button type="button" :class="classes" @click="onClick" :style="style">{{ label }}</button>
</template>

<script>
import './nv-button.css';
import { reactive, computed } from 'vue';

export default {
  name: 'nv-button',

  props: {
    label: {
      type: String,
      required: true,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "medium",
      validator: function (value) {
        return ['small', 'medium', 'large'].indexOf(value) !== -1;
      },
    },
    style: {
      type: String,
    },
  },

  emits: ['click'],

  setup(props, { emit }) {
    props = reactive(props);
    return {
      classes: computed(() => ({
        'btn': true,
        'btn-primary': props.primary,
        'btn-secondary': !props.primary,
        [`btn-${props.size || 'medium'}`]: true,
      })),
      style: computed(() => props.style),
      onClick() {
        emit('click');
      }
    }
  },
};
</script>
