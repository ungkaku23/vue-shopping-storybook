<template>
  <div 
    v-for="(option, index) in options"
    :key="randKey()"
    :class="classes" 
    :style="style"
    @click="onChange(option)"
  >
    <div :class="`tick-box ${state.nValue.indexOf(option.value) !== -1 ? 'selected' : ''}`">
      <svg
        width="22"
        height="22"
        fill="none"
        stroke="#ffffff"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <use href="../assets/icon/feather-sprite.svg#check"/>
      </svg>
    </div>
    <div class="label">
      {{option.label}}
    </div>
  </div>
</template>

<script>
import './nv-checkbox.css';
import { reactive, computed, onMounted, ref } from 'vue';

export default {
  name: 'nv-checkbox',

  props: {
    fullWidth :{
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: []
    },
    label: {
      type: String
    },
    value: {
      type: String,
      default: []
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

    const state = reactive({ 
      nValue: props.value
    });
    
    onMounted(() => {
    });

    return {
      state,
      options: computed(() => props.options),
      classes: computed(() => ({
        "nv-checkbox": true,
        [props.class]: true,
        [`checkbox-${props.size}`]: true,
      })),
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
      label: computed(() => props.label),
      onChange(obj) {
        const index = state.nValue.indexOf(obj.value)
        index !== -1 ? state.nValue.splice(index, 1) : state.nValue.push(obj.value);
        emit("change", state.nValue);
      }
    }
  },
};
</script>
