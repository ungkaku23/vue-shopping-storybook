<template>
  <section class="checkout-payment">
    <loading-spinner 
      v-if="state.isLoading" 
      :label="state.loadingLabel" 
    />
    <h4 
      class="checkout-subtitle" 
      style="margin-top: 20px; margin-bottom: 6px"
    >
      Choose Your Payment Method
    </h4>
    <p class="checkout-description">You will not charged untill your review the next page.</p>

    <nv-radiobox
      :options="radioboxes"
      :value="state.paymentDetails.method"
      @change="setPaymentMethod"
      :style="`
        border: 1px solid;
        padding: 10px 15px;
        border-radius: 8px;
      `"
    />
    <div style="height: 6px;">
    </div>

    <nv-input 
      fullWidth 
      label="Card Holder Name"
      :value="state.paymentDetails.cardHolderName"
      @input="setCardHolderName"
    />

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
import './checkout-payment.css';
import NvButton from '../components/nv-button.vue';
import NvInput from '../components/nv-input.vue';
import NvSelect from '../components/nv-select.vue';
import LoadingSpinner from '../components/loading-spinner.vue';
import NvCheckbox from '../components/nv-checkbox.vue';
import NvRadiobox from '../components/nv-radiobox.vue';

export default {
  name: 'checkout-payment',

  components: { 
    NvButton,
    NvInput,
    NvSelect,
    LoadingSpinner,
    NvCheckbox,
    NvRadiobox
  },

  props: {
    paymentDetails: {
      type: Object,
      default: {}
    }
  },

  setup(props, { emit }) {
    props = reactive(props);
    const state = reactive({ 
      paymentDetails: props.paymentDetails,
      loadingLabel: "Loading",
      isLoading: false,
      isDirtyForm: false
    });

    const validator = (field = "", type = "") => {
      let isValid = true;
      let paymentErrText = '';

      if (field !== "") {
        if (field !== "shippingMode" && field !== "isSameAsBillingAddress" && field !== "postalCode") {
          if (state.paymentDetails[field] === "") {
            paymentErrText = "This is required";
          }

          return paymentErrText;
        }
      } else {
        for (const key in state.paymentDetails) {
          if (key !== "shippingMode" && key !== "isSameAsBillingAddress" && key !== "postalCode") {
            state.paymentDetails[key] === "" ? isValid = false : null;
          }
        }

        return isValid;
      }

      return null;
    }
    
    onMounted(() => {
    });

    return {
      state,
      radioboxes: [{
        value: "paypal",
        label: "PayPal",
        rightSideImg: "paypal.png"
      }, {
        value: "credit_card",
        label: "Credit Card",
        rightSideImg: "card.png"
      }],
      validator,
      continuePayment() {
        state.isDirtyForm = true;
        if (validator("", "")) {
          console.log("shipping--: ", state.shippingDetails);
          console.log("billing--: ", state.billingDetails);
        }
      },
      setPaymentMethod() {

      }
    };
  }
};
</script>
