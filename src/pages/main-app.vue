<template>
  <section class="main-app">
    <nv-header 
      :isCheckout="step > 0 ? true : false" 
      :label="step > 0 ? 'Checkout' : 'Shopping Cart'"
      @back="onBackToCart"
    />
    <shopping-cart
      v-if="step === 0"
      :products="products"
      :shippingDetails="shippingDetails"
      @saveAndCheckout="onSaveAndCheckout"
    />
    <checkout-shipping 
      v-else-if="step === 1"
      :shippingDetails="shippingDetails"
      :billingDetails="billingDetails"
    />
  </section>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';
import axios from 'axios';
import './main-app.css';
import { useStore } from 'vuex';
import NvHeader from '../components/nv-header.vue';
import ShoppingCart from './shopping-cart.vue';
import CheckoutShipping from './checkout-shipping.vue';

export default {
  name: 'main-app',

  components: { 
    NvHeader,
    ShoppingCart,
    CheckoutShipping
  },

  props: {
    
  },

  setup(props, { emit }) {
    const store = useStore();
    // props = reactive(props);

    const state = reactive({ 
      
    });
    
    onMounted(() => {
      // store.dispatch('updateProducts', "quick");
    });

    const step = computed(() => store.state.step);

    const products = computed(() => store.state.products);

    const shippingDetails = computed(() => store.state.shippingDetails);

    const billingDetails = computed(() => store.state.billingDetails);

    return {
      state,
      step,
      products,
      shippingDetails,
      billingDetails,
      onBackToCart() {
        store.commit('UPDATE_STEP', 0);
      },
      onSaveAndCheckout({products, shippingMode}) {
        store.commit('UPDATE_STEP', 1);
        store.commit('UPDATE_PRODUCTS', products);
        store.commit('UPDATE_SHIPPING_DETAILS', {
          ...shippingDetails.value,
          shippingMode
        });
      }
    };
  }
};
</script>
