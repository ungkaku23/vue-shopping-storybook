<template>
  <section class="checkout-review">
    <loading-spinner 
      v-if="state.isLoading" 
      :label="state.loadingLabel" 
    />
    <h4 
      class="checkout-subtitle" 
      style="margin-top: 20px; margin-bottom: 6px"
    >
      Please confirm and submit your order
    </h4>
    <p class="checkout-description">By clicking submit order, you agree to XXX Term of use and Privacy Policy</p>

    

    <nv-button 
      primary
      label="Continue"
      size="large" 
      style="width: 100%; margin: 20px 0px;"
      @click="continuePayment"
    />
  </section>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';
import axios from 'axios';
import './checkout-review.css';
import NvButton from '../components/nv-button.vue';
import LoadingSpinner from '../components/loading-spinner.vue';

export default {
  name: 'checkout-review',

  components: { 
    NvButton,
    LoadingSpinner
  },

  props: {
    paymentDetails: {
      type: Object,
      default: {}
    },
    shippingDetails: {
      type: Object,
      default: {}
    },
    billingDetails: {
      type: Object,
      default: {}
    },
    products: {
      type: Object,
      default: []
    }
  },

  setup(props, { emit }) {
    props = reactive(props);
    const state = reactive({ 
      paymentDetails: props.paymentDetails,
      loadingLabel: "Loading",
      isLoading: false
    });
    
    onMounted(() => {
    });

    return {
      state,
      continuePayment() {
        
      }
    };
  }
};
</script>
