<template>
  <section class="checkout-payment">
    <loading-spinner 
      v-if="state.isLoading" 
      :label="state.loadingLabel" 
    />
    {{state.paymentDetails}}
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

    <nv-input 
      fullWidth 
      label="Card Number"
      :value="state.paymentDetails.cardNumber"
      @input="setCardNumber"
      type="mask"
      tokens="#### #### #### ####"
      placeholder="4242 4242 4242 4242"
    />

    <div class="expiration-security">
      <div class="es-widget">
        <nv-input 
          fullWidth 
          label="Expitation Date"
          :value="state.paymentDetails.expirationDate"
          @input="setExpirationDate"
          type="mask"
          tokens="##/##"
          placeholder="MM/YY"
        />
      </div>
      <div class="es-widget">
        <nv-input 
          fullWidth 
          label="Security Code"
          :value="state.paymentDetails.securityCode"
          @input="setSecurityCode"
          type="mask"
          tokens="###"
          placeholder="CVC"
        />
      </div>
    </div>

    <nv-checkbox
      :options="checkboxes"
      :value="isSP"
      @change="setIsSavePaymentInfo"
      :style="`
        margin-bottom: 0px; 
        margin-top: -10px
      `"
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
      checkboxes: [{
        value: "Save this card for future faster checkout",
        label: "Save this card for future faster checkout"
      }],
      isSP: computed(() => state.paymentDetails.isSavePaymentInfo ? ["Save this card for future faster checkout"] : []),
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
      setIsSavePaymentInfo(val) {
        if (val.indexOf("Save this card for future faster checkout") !== -1) {
          state.paymentDetails["isSavePaymentInfo"] = true;
        } else {
          state.paymentDetails["isSavePaymentInfo"] = false;
        }
      },
      setPaymentMethod(val) {
        state.paymentDetails["method"] = val;
      },
      setCardHolderName(val) {
        state.paymentDetails["cardHolderName"] = val.value;
      },
      setCardNumber(val) {
        state.paymentDetails["cardNumber"] = val.value;
      },
      setExpirationDate(val) {
        state.paymentDetails["expirationDate"] = val.value;
      },
      setSecurityCode(val) {
        state.paymentDetails["securityCode"] = val.value;
      },
      continuePayment() {
        state.isDirtyForm = true;
        // if (validator("", "")) {
        //   console.log("shipping--: ", state.paymentDetails);
        //   console.log("billing--: ", state.billingDetails);
        // }
      }
    };
  }
};
</script>
