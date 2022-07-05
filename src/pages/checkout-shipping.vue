<template>
  <section class="checkout-shipping">
    <h4 class="checkout-subtitle">Shipping Details</h4>
    <div><nv-input fullWidth class="full-width" label="Full Name"/></div>
  </section>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';
import './checkout-shipping.css';
import NvButton from '../components/nv-button.vue';
import NvInput from '../components/nv-input.vue';

export default {
  name: 'checkout-shipping',

  components: { 
    NvButton,
    NvInput
  },

  props: {
    shippingDetails: {
      type: Object
    },
  },

  setup(props, { emit }) {
    props = reactive(props);
    const state = ref({ 
      shippingDetails: {} 
    });
    
    onMounted(() => {
      state.value.shippingDetails = props.shippingDetails;
    })

    return {
      state,
      saveAndContinue() {
        console.log("hey")
      }
    };
  }
};
</script>
