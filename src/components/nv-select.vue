<template>
  <div 
    class="nv-select-label" 
    v-if="label !== ''"
  >
    {{label}}
  </div>
  <div 
    :class="classes" 
    :style="style" 
    @focusout="focusedOut" 
    tabindex="0"
  >
    <input 
      class="select-value" 
      :value="selectLabel" 
      placeholder="-Select-" 
      @input="inputChange"
      @click="toggleDropdown"
    />
    <svg
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      style="cursor: pointer;"
      @click="toggleDropdown"
    >
      <use href="../assets/icon/feather-sprite.svg#chevron-down"/>
    </svg>
    <div v-show="toggle" class="options">
      <div 
        v-for="(obj, index) in state.options"
        class="option"
        :key="randKey()"
        @click="onOptionClicked(obj)"
      >
        {{ obj.label }}
      </div>
    </div>
  </div>
</template>

<script>
import './nv-select.css';
import { reactive, computed, ref, onMounted, watch } from 'vue';

export default {
  name: 'nv-select',

  props: {
    options: {
      type: Object,
      default: []
    },
    fullWidth :{
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ""
    },
    label: {
      type: String
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
    const toggle = ref(false);

    const state = reactive({ 
      nValue: props.value,
      options: props.options
    });
    
    onMounted(() => {
    })

    watch(() => props.options, (current, prev) => {
      if (JSON.stringify(current) !== JSON.stringify(prev)) {
        state.options = current;
      }
    });

    watch(() => props.value, (current, prev) => {
      if (JSON.stringify(current) !== JSON.stringify(prev)) {
        state.nValue = current;
      }
    });

    const selectLabel = computed(() => {
      if (state.nValue !== "" ) {
        let found = props.options.find(o => o.value === state.nValue);
        return found !== undefined ? found.label : state.nValue;
      } else {
        return "";
      }
    });

    return {
      state,
      toggle,
      selectLabel,
      classes: computed(() => ({
        "nv-select": true,
        [props.class]: true,
        [`select-${props.size}`]: true,
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
      label: computed(() => props.label),
      inputChange(e) {
        toggle.value = true;
        state.nValue = e.target.value;
        state.options = props.options.filter(o => o.label.toUpperCase().includes(e.target.value.toUpperCase()) || o.value.toUpperCase().includes(e.target.value.toUpperCase()));
      },
      toggleDropdown() {
        toggle.value = !toggle.value;
      },
      onOptionClicked(obj) {
        state.nValue = obj.value;
        this.toggleDropdown();
        emit('change', state.nValue);
      },
      focusedOut() {
        setTimeout(() => {
          toggle.value = false;
          let found = props.options.find(o => o.value === state.nValue);
          found !== undefined ? null : state.nValue = props.value;
          // emit('change', state.nValue);
        }, 100)
      }
    }
  },
};
</script>
