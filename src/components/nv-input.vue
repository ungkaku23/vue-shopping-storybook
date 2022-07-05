<template>
  <div class="nv-input-label" v-if="label !== ''">{{label}}</div>
  <input :type="type" :class="classes" @change="onChange" :style="style" />
</template>

<script>
import './nv-input.css';
import { reactive, computed } from 'vue';

export default {
  name: 'nv-input',

  props: {
    fullWidth :{
      type: Boolean,
      default: false
    },
    label: {
      type: String
    },
    type: {
      type: String,
      default: "text"
    },
    class: {
      type: String,
      default: ""
    },
    style: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "large",
      validator: function (value) {
        return ['small', 'medium', 'large'].indexOf(value) !== -1;
      },
    },
  },

  emits: ['change'],

  setup(props, { emit }) {
    props = reactive(props);
    return {
      classes: computed(() => ({
        "nv-input": true,
        [props.class]: true,
        [`input-${props.size}`]: true,
      })),
      class: computed(() => props.class),
      style: computed(() => {
        let widthStyle = '';
        if (props.fullWidth) {
          let px = 0;
          if (props.size === "large") {
            px = 15;
          } else if (props.size === "medium") {
            px = 14;
          } else if (props.size === "small") {
            px = 13;
          }

          widthStyle = ` width: calc(100% - ${2 * px}px);`;
        }
        return props.style + widthStyle;
      }),
      type: computed(() => props.type),
      label: computed(() => props.label),
      onChange() {
        emit('change');
      }
    }
  },
};
</script>
