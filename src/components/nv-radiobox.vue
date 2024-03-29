<template>
  <div 
    v-for="(option, index) in optionList"
    :key="`${randKey()}${index}`"
    :class="classes" 
    :style="`${styles} ${state.nValue === option.value ? 'border-color: black;' : 'border-color: #838383;'}`"
    @click="onChange(option)"
  >
    <div class="tick-box-label">
      <div :class="`tick-box ${state.nValue === option.value ? 'selected' : ''}`">
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
      <div class="label" :style="`color: ${state.nValue === option.value ? '#000000' : '#838383'}`">
        {{option.label}}
      </div>
    </div>
    <div 
      v-if="option.hasOwnProperty('rightSideInfo')"
      :class="`right-side-info ${state.nValue === option.value ? 'selected' : ''}`"
    >
      <div></div>{{option.rightSideInfo}}
    </div>
    <div 
      v-if="option.hasOwnProperty('rightSideImg')"
      :class="`right-side-img ${state.nValue === option.value ? 'selected' : ''}`"
    >
      <img :src="getImgUrl(option.rightSideImg)" />
    </div>
  </div>
</template>

<script>
import './nv-radiobox.css';
import { reactive, computed, onMounted } from 'vue';

export default {
  name: 'nv-radiobox',

  props: {
    fullWidth: {
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
      type: String,
      default: ""
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

    const getImgUrl = (imgFile) => {
      var images = require.context('../assets/img/', false, /\.(png|jpg|jpeg)$/)
      return images('./' + imgFile)
    }

    return {
      state,
      getImgUrl,
      optionList: computed(() => props.options),
      classes: computed(() => ({
        "nv-radiobox": true,
        [props.class]: true,
        [`radiobox-${props.size}`]: true,
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
        state.nValue = obj.value;
        emit("change", state.nValue);
      }
    }
  },
};
</script>
