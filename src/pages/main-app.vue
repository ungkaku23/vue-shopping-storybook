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
    <div v-else>
      <line-progress 
        :step="step"
        @click="onUpdateStep"
        style="margin-top: -14px; margin-bottom: 11px;"
      />
      <checkout-shipping 
        :shippingDetails="shippingDetails"
        :billingDetails="billingDetails"
      />
    </div>
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
import LineProgress from '../components/line-progress.vue';

export default {
  name: 'main-app',

  components: { 
    NvHeader,
    ShoppingCart,
    CheckoutShipping,
    LineProgress
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
      },
      onUpdateStep(val) {
        store.commit('UPDATE_STEP', val);
      }
    };
  }
};
</script>
