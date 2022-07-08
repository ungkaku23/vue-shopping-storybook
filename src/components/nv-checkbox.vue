<template>
  <div 
    v-for="(option, index) in optionList"
    :key="`${randKey()}${index}`"
    :class="classes" 
    :style="styles"
    @click="onChange(option)"
  >
    <div :class="`tick-box ${state.nValue.indexOf(option.value) !== -1 ? 'selected' : ''}`">
      <svg
        width="18"
        height="18"
        fill="none"
        stroke="#ffffff"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <use href="../assets/icon/feather-sprite.svg#check"/>
      </svg>
    </div>
    <div class="label" :style="`color: ${state.nValue.indexOf(option.value) !== -1 ? '#000000' : '#838383'}`">
      {{option.label}}
    </div>
  </div>
</template>

<script>
import './nv-checkbox.css';
import { reactive, computed, onMounted } from 'vue';

export default {
  name: 'nv-checkbox',

  props: {
    fullWidth :{
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    label: {
      type: String
    },
    value: {
      type: Array,
      default() {
        return [];
      }
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
      optionList: computed(() => props.options),
      classes: computed(() => ({
        "nv-checkbox": true,
        [props.class]: true,
        [`checkbox-${props.size}`]: true,
      })),
      styles: computed(() => {
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
      onChange(obj) {
        const index = state.nValue.indexOf(obj.value)
        index !== -1 ? state.nValue.splice(index, 1) : state.nValue.push(obj.value);
        emit("change", state.nValue);
      }
    }
  },
};
</script>
