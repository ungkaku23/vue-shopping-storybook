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
    <div v-if="state.isDirtyForm" class="error">{{validator("method")}}</div>
    <div style="height: 6px;">
    </div>

    <nv-input 
      fullWidth 
      label="Card Holder Name"
      :value="state.paymentDetails.cardHolderName"
      @input="setCardHolderName"
    />
    <div v-if="state.isDirtyForm" class="error">{{validator("cardHolderName")}}</div>

    <nv-input 
      fullWidth 
      label="Card Number"
      :value="state.paymentDetails.cardNumber"
      @input="setCardNumber"
      type="mask"
      tokens="#### #### #### ####"
      placeholder="4242 4242 4242 4242"
    />
    <div v-if="state.isDirtyForm" class="error">{{validator("cardNumber")}}</div>

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
        <div v-if="state.isDirtyForm" class="error">{{validator("expirationDate")}}</div>
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
        <div v-if="state.isDirtyForm" class="error">{{validator("securityCode")}}</div>
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

    const cardExpirationValidator = () => {
      let today = new Date();
      let thisYrStr = today.getFullYear().toString();
      let dataStr = JSON.parse(JSON.stringify(state.paymentDetails.expirationDate));
      let month = parseInt(dataStr.split("/")[0]); // 1 - 12
      let year = parseInt(dataStr.split("/")[1]); // 23
      let yrUnit = thisYrStr.substring(0, thisYrStr.length - 2);

      if (month > 0 && month < 13) {
        
        let expDate = new Date(parseInt(yrUnit + year), month - 1);
        if (today.getTime() > expDate.getTime()) {
            return "Your Card is expired. Please check expiry date.";
        } else {
          return "";
        }
      } else {
        return "Expiration date is invalid";
      }
    }

    const cardNumberValidator = () => {
      let dataStr = JSON.parse(JSON.stringify(state.paymentDetails.cardNumber));
      return dataStr.replace(/[" "]/g, "").length !== 16 ? "Card number is invalid" : "";
    }

    const cvcValidator = () => {
      let dataStr = JSON.parse(JSON.stringify(state.paymentDetails.securityCode));
      return dataStr.length !== 3 ? "Security code is invalid" : "";
    }

    const validator = (field = "") => {
      let isValid = true;
      let paymentErrText = '';

      if (field !== "") {
        if (field !== "isSavePaymentInfo") {
          if (state.paymentDetails[field] === "") {
            paymentErrText = "This is required";
          } else {
            if (field === "expirationDate" && cardExpirationValidator() !== "") {
              paymentErrText = cardExpirationValidator();
            }

            if (field === "cardNumber" && cardNumberValidator() !== "") {
              paymentErrText = cardNumberValidator();
            }

            if (field === "securityCode" && cvcValidator() !== "") {
              paymentErrText = cvcValidator();
            }
          }

          return paymentErrText;
        }
      } else {
        for (const key in state.paymentDetails) {
          if (key !== "isSavePaymentInfo") {
            state.paymentDetails[key] === "" 
              ? isValid = false 
              : (key === "expirationDate" && cardExpirationValidator() !== "") || 
                (key === "cardNumber" && cardNumberValidator() !== "") || 
                (key === "securityCode" && cvcValidator() !== "")
                ? isValid = false
                : null;
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
      cardExpirationValidator,
      cardNumberValidator,
      cvcValidator,
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
        if (validator("")) {
          console.log("paymentDetails--: ", state.paymentDetails);
        }
      }
    };
  }
};
</script>