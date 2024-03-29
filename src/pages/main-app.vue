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
        v-if="step < 4"
        :step="step"
        :shippingDetails="shippingDetails"
        :billingDetails="billingDetails"
        :paymentDetails="paymentDetails"
        @click="onUpdateStep"
        style="margin-top: -14px; margin-bottom: 11px;"
      />
      <div v-else></div>
      <checkout-shipping 
        v-if="step === 1"
        :shippingDetails="shippingDetails"
        :billingDetails="billingDetails"
        @continuePayment="onCheckoutShippingSubmit"
      />
      <checkout-payment 
        v-else-if="step === 2"
        :paymentDetails="paymentDetails"
        @continuePayment="onCheckoutPaymentSubmit"
      />
      <checkout-review 
        v-else-if="step === 3"
        :shippingDetails="shippingDetails"
        :billingDetails="billingDetails"
        :paymentDetails="paymentDetails"
        :products="products"
        @continuePayment="onCheckoutReviewSubmit"
        @editCheckoutInfos="onUpdateStep"
      />
      <transaction-success 
        v-else
        @back="onUpdateStep(0)"
      />
    </div>
  </section>
</template>

<script>
import { reactive, computed, onMounted } from 'vue';
import './main-app.css';
import { useStore } from 'vuex';
import NvHeader from '../components/nv-header.vue';
import ShoppingCart from './shopping-cart.vue';
import CheckoutShipping from './checkout-shipping.vue';
import CheckoutPayment from './checkout-payment.vue';
import CheckoutReview from './checkout-review.vue';
import TransactionSuccess from './transaction-success.vue';
import LineProgress from '../components/line-progress.vue';

export default {
  name: 'main-app',

  components: { 
    NvHeader,
    ShoppingCart,
    CheckoutShipping,
    LineProgress,
    CheckoutPayment,
    CheckoutReview,
    TransactionSuccess
  },

  props: {
    
  },

  setup() {
    const store = useStore();

    const state = reactive({ 
      
    });
    
    onMounted(() => {
    });

    const step = computed(() => store.state.step);

    const products = computed(() => store.state.products);

    const shippingDetails = computed(() => store.state.shippingDetails);

    const billingDetails = computed(() => store.state.billingDetails);

    const paymentDetails = computed(() => store.state.paymentDetails);

    return {
      state,
      step,
      products,
      shippingDetails,
      billingDetails,
      paymentDetails,
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
      },
      onCheckoutShippingSubmit(val) {
        store.commit('UPDATE_SHIPPING_DETAILS', val.shippingDetails);
        store.commit('UPDATE_BILLING_DETAILS', val.billingDetails);
        store.commit('UPDATE_STEP', step.value + 1);
      },
      onCheckoutPaymentSubmit(val) {
        store.commit('UPDATE_PAYMENT_DETAILS', val);
        store.commit('UPDATE_STEP', step.value + 1);
      },
      onCheckoutReviewSubmit({products, shippingDetails, billingDetails, paymentDetails}) {
        store.commit('UPDATE_PRODUCTS', products);
        store.commit('UPDATE_SHIPPING_DETAILS', shippingDetails);
        store.commit('UPDATE_BILLING_DETAILS', billingDetails);
        store.commit('UPDATE_PAYMENT_DETAILS', paymentDetails);
        store.commit('UPDATE_STEP', step.value + 1);
      }
    };
  }
};
</script>
