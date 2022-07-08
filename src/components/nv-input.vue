<template>
  <div class="nv-input-label" v-if="labels !== ''">{{labels}}</div>
  <GMapAutocomplete
    v-if="types === 'autocomplete'"
    :class="classes"
    :style="styles"
    :placeholder="placeholders"
    @place_changed="setPlace"
    @input="onPlaceInput"
    :value="state.nValue"
  >
  </GMapAutocomplete>
  <input 
    v-else-if="types === 'mask'" 
    v-maska="tokensPattern"
    :class="classes" 
    :value="state.nValue"
    @change="onChange" 
    @input="onInput" 
    :style="styles" 
    :placeholder="placeholders"
  />
  <input 
    v-else 
    :type="types" 
    :class="classes" 
    :value="state.nValue"
    @change="onChange" 
    @input="onInput" 
    :style="styles" 
    :placeholder="placeholders"
  />
</template>

<script>
import './nv-input.css';
import { reactive, computed, onMounted } from 'vue';

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
    value: {
      type: String,
      default: ""
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
    tokens: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    }
  },

  emits: ['change', 'input'],

  setup(props, { emit }) {
    props = reactive(props);

    const state = reactive({ 
      nValue: props.value
    });
    
    onMounted(() => {
    });

    return {
      state,
      tokensPattern: computed(() => props.tokens),
      placeholders: computed(() => props.placeholder),
      classes: computed(() => ({
        "nv-input": true,
        [props.class]: true,
        [`input-${props.size}`]: true,
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
      types: computed(() => props.type),
      labels: computed(() => props.label),
      onChange(e) {
        state.nValue = e.target.value;
        emit('change', {
          type: props.type,
          value: e.target.value
        });
      },
      onInput(e) {
        state.nValue = e.target.value;
        emit('input', {
          type: props.type,
          value: e.target.value
        });
      },
      onPlaceInput(e) {
        emit('input', {
          type: props.type,
          value: {
            address: e.target.value, 
            country: "", 
            postalCode: "", 
            state: ""
          }
        });
      },
      setPlace(place) {
        const address = place.formatted_address;
        const country = place.address_components.find(o => o.types.indexOf("country") !== -1) !== undefined
          ? place.address_components.find(o => o.types.indexOf("country") !== -1).long_name
          : "";
        const postalCode = place.address_components.find(o => o.types.indexOf("postal_code") !== -1) !== undefined
          ? place.address_components.find(o => o.types.indexOf("postal_code") !== -1).long_name
          : "";
        const state = place.address_components.find(o => o.types.indexOf("administrative_area_level_1") !== -1) !== undefined
          ? place.address_components.find(o => o.types.indexOf("administrative_area_level_1") !== -1).short_name
          : "";
        emit('change', {
          type: props.type,
          value: {
            address, country, postalCode, state
          }
        });
      }
    }
  },
};
</script>
