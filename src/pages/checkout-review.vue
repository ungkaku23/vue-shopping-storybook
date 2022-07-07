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
    <p class="checkout-description">By clicking submit order, you agree to XXX <span class="ex-link">Term of use</span> and <span class="ex-link">Privacy Policy</span></p>

    <div class="brief-box">
      <div class="brief-header">
        <div class="brief-title">
          Shipping Address
        </div>
        <span class="brief-edit">Edit</span>
      </div>
      <div class="brief-info">
        <div class="brief-label">
          Name:
        </div>
        <div>
          Mr. {{state.shippingDetails.fullName}}
        </div>
      </div>
      <div class="brief-info">
        <div class="brief-label">
          Address:
        </div>
        <div>
          {{state.shippingDetails.deliveryAddress}}
        </div>
      </div>
      <div class="brief-bottom">
        <span class="ex-link">
          Add New Address
        </span>
      </div>
    </div>

    <div class="brief-box">
      <div class="brief-header">
        <div class="brief-title">
          Payment
        </div>
        <span class="brief-edit">Edit</span>
      </div>
      <div class="brief-info" style="justify-content: space-between;">
        <div class="brief-card-label">
          <img :src="getImgUrl(state.paymentDetails.method === 'card' ? 'card.png' : 'paypal.png')" /> 
          <div>****</div>
          <div>{{state.paymentDetails.cardNumber.split(" ")[3]}}</div>
        </div>
        <div class="brief-card-exp">
          {{state.paymentDetails.expirationDate}}
        </div>
      </div>
    </div>

    <order-summary 
      :products="state.products"
      :shippingMode="state.shippingDetails.shippingMode"
    />

    <nv-button 
      primary
      label="Submit Order"
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
import OrderSummary from '../components/order-summary.vue';

export default {
  name: 'checkout-review',

  components: { 
    NvButton,
    LoadingSpinner,
    OrderSummary
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
      products: props.products,
      shippingDetails: props.shippingDetails,
      billingDetails: props.billingDetails,
      paymentDetails: props.paymentDetails,
      loadingLabel: "Loading",
      isLoading: false
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
      continuePayment() {
        
      }
    };
  }
};
</script>
