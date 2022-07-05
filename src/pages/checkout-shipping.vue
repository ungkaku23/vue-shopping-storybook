<template>
  <section class="checkout-shipping">
    <h4 class="checkout-subtitle">Shipping Details</h4>
    {{ state.shippingDetails }}
    <nv-input 
      fullWidth 
      label="Full Name"
      :value="state.shippingDetails.fullName"
      @change="setFullName"
    />
    <nv-input 
      fullWidth 
      label="Delivery Address"
      type="autocomplete"
      :value="state.shippingDetails.deliveryAddress"
      @change="setDeliveryAddress"
    />
  </section>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';
import './checkout-shipping.css';
import NvButton from '../components/nv-button.vue';
import NvInput from '../components/nv-input.vue';
import NvSelect from '../components/nv-select.vue';

export default {
  name: 'checkout-shipping',

  components: { 
    NvButton,
    NvInput,
    NvSelect
  },

  props: {
    shippingDetails: {
      type: Object
    },
  },

  setup(props, { emit }) {
    props = reactive(props);
    const state = reactive({ 
      shippingDetails: props.shippingDetails
    });
    
    onMounted(() => {
    })

    return {
      state,
      saveAndContinue() {
        console.log("hey")
      },
      setFullName(val) {
        state.shippingDetails["fullName"] = val.value;
      },
      setDeliveryAddress(val) {
        state.shippingDetails["deliveryAddress"] = val.value.address;
        state.shippingDetails["country"] = val.value.country;
        state.shippingDetails["state"] = val.value.state;
        state.shippingDetails["postalCode"] = val.value.postalCode;
      }
    };
  }
};
</script>
