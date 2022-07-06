<template>
  <section class="checkout-shipping">
    <loading-spinner 
      v-if="state.isLoading" 
      :label="state.loadingLabel" 
    />
    <h4 class="checkout-subtitle">Shipping Details</h4>

    <nv-input 
      fullWidth 
      label="Full Name"
      :value="state.shippingDetails.fullName"
      @input="setFullName"
    />
    <div v-if="state.isDirtyForm" class="error">{{validator("fullName", "shipping")}}</div>

    <nv-input 
      fullWidth 
      label="Delivery Address"
      type="autocomplete"
      :value="state.shippingDetails.deliveryAddress"
      @change="setDeliveryInfos"
      @input="setDeliveryAddress"
      placeholder="Enter your address"
    />
    <div v-if="state.isDirtyForm" class="error">{{validator("deliveryAddress", "shipping")}}</div>
    
    <div class="country-state">
      <div class="cs-widget">
        <nv-select 
          fullWidth 
          label="Country"
          :value="state.shippingDetails.country"
          :options="state.countries"
          @change="setCountry"
        />
        <div v-if="state.isDirtyForm" class="error">{{validator("country", "shipping")}}</div>
      </div>
      <div class="cs-widget">
        <nv-select 
          fullWidth 
          label="State"
          :value="state.shippingDetails.state"
          :options="state.states"
          @change="setState"
        />
        <div v-if="state.isDirtyForm" class="error">{{validator("state", "shipping")}}</div>
      </div>
    </div>

    <div 
      v-if="!state.shippingDetails.isSameAsBillingAddress" 
      class="billing-section"
    >
      <h4 class="checkout-subtitle">Billing Details</h4>

      <nv-input 
        fullWidth 
        label="Full Name"
        :value="state.billingDetails.fullName"
        @input="setBillingFullName"
      />
      <div v-if="state.isDirtyForm" class="error">{{validator("fullName", "billing")}}</div>

      <nv-input 
        fullWidth 
        label="Delivery Address"
        type="autocomplete"
        :value="state.billingDetails.deliveryAddress"
        @change="setBillingDeliveryInfos"
        @input="setBillingDeliveryAddress"
      />
      <div v-if="state.isDirtyForm" class="error">{{validator("deliveryAddress", "billing")}}</div>

      <div class="country-state">
        <div class="cs-widget">
          <nv-select 
            fullWidth 
            label="Country"
            :value="state.billingDetails.country"
            :options="state.countries"
            @change="setBillingCountry"
          />
          <div v-if="state.isDirtyForm" class="error">{{validator("country", "billing")}}</div>
        </div>
        <div class="cs-widget">
          <nv-select 
            fullWidth 
            label="State"
            :value="state.billingDetails.state"
            :options="state.billingStates"
            @change="setBillingState"
          />
          <div v-if="state.isDirtyForm" class="error">{{validator("state", "billing")}}</div>
        </div>
      </div>
    </div>

    <nv-checkbox
      :options="checkboxes"
      :value="isBA"
      @change="setIsSameAsBillingAddress"
    />
    <h4 
      class="checkout-subtitle" 
      style="margin-top: 20px; margin-bottom: 6px"
    >
      Choose Shipping Mode
    </h4>
    <p class="checkout-description">Choose a shipping which deliver faster</p>
    <nv-radiobox
      :options="radioboxes"
      :value="state.shippingDetails.shippingMode"
      @change="setShippingMode"
    />
    <div 
      class="shipping-address" 
      :style="state.shippingDetails.shippingMode === 'quick' ? 'color: black' : ''"
    >
      {{state.shippingDetails.deliveryAddress}}
    </div>
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
import './checkout-shipping.css';
import NvButton from '../components/nv-button.vue';
import NvInput from '../components/nv-input.vue';
import NvSelect from '../components/nv-select.vue';
import LoadingSpinner from '../components/loading-spinner.vue';
import NvCheckbox from '../components/nv-checkbox.vue';
import NvRadiobox from '../components/nv-radiobox.vue';

export default {
  name: 'checkout-shipping',

  components: { 
    NvButton,
    NvInput,
    NvSelect,
    LoadingSpinner,
    NvCheckbox,
    NvRadiobox
  },

  props: {
    shippingDetails: {
      type: Object,
      default: {}
    },
    billingDetails: {
      type: Object,
      default: {}
    }
  },

  setup(props, { emit }) {
    props = reactive(props);
    const state = reactive({ 
      shippingDetails: props.shippingDetails,
      billingDetails: props.billingDetails,
      loadingLabel: "Loading",
      isLoading: false,
      countries: [],
      states: [],
      billingStates: [],
      isDirtyForm: false
    });

    const loadStates = (country, type) => {
      state.isLoading = true;
      state.loadingLabel = "Loading states"
      axios.get("https://www.universal-tutorial.com/api/getaccesstoken", {
        headers: {
          "Accept": "application/json",
          "api-token": "riZcZJ8djXvsvnFVSG9hyIhKIRx17xlQvt8O012rFpwdyEtzZMrosleK0FDhNWO-x88",
          "user-email": "jhmun23216@gmail.com"
        }
      })
      .then((response) => {
        axios.get(`https://www.universal-tutorial.com/api/states/${country}`, {
          headers: {
            "Authorization": `Bearer ${response.data.auth_token}`,
            "Accept": "application/json"
          }
        })
        .then((response2) => {
          state.isLoading = false;
          if (type === "shipping") {
            state.states = response2.data.map(o => ({
              label: o.state_name,
              value: o.state_name
            }));
          } else {
            state.billingStates = response2.data.map(o => ({
              label: o.state_name,
              value: o.state_name
            }));
          }
        })
        .catch((err2) => {
          state.isLoading = false;
        });
      })
      .catch((err) => {
        state.isLoading = false;
      });
    }

    const loadCountries = () => {
      state.isLoading = true;
      state.loadingLabel = "Loading countries"
      axios.get("https://restcountries.com/v3.1/all")
        .then((response) => {
          state.isLoading = false;
          state.countries = response.data.map(o => ({
            label: o.name.common,
            value: o.name.common
          }));
        })
        .catch((err) => {
          state.isLoading = false;
        });
    }

    const validator = (field = "", type = "") => {
      let isValid = true;
      let shippingErrText = '';
      let billingErrText = '';

      if (field !== "") {
        if (field !== "shippingMode" && field !== "isSameAsBillingAddress" && field !== "postalCode") {
          if (state.shippingDetails[field] === "") {
            shippingErrText = "This is required";
          }

          if (state.billingDetails[field] === "") {
            billingErrText = "This is required";
          }
          return type === "shipping" ? shippingErrText : billingErrText;
        }
      } else {
        for (const key in state.shippingDetails) {
          if (key !== "shippingMode" && key !== "isSameAsBillingAddress" && key !== "postalCode") {
            state.shippingDetails[key] === "" ? isValid = false : null;
          }
        }

        for (const key in state.billingDetails) {
          if (key !== "shippingMode" && key !== "isSameAsBillingAddress" && key !== "postalCode") {
            state.billingDetails[key] === "" ? isValid = false : null;
          }
        }
        return isValid;
      }

      return null;
    }
    
    onMounted(() => {
      loadCountries();
    });

    return {
      state,
      checkboxes: [{
        value: "Shipping address same as billing address",
        label: "Shipping address same as billing address"
      }],
      radioboxes: [{
        value: "free",
        label: "Store pickup (in 20 min)",
        rightSideInfo: "Free"
      }, {
        value: "quick",
        label: "Delivery at home (2-4 days)",
        rightSideInfo: "$9.90"
      }],
      isBA: computed(() => state.shippingDetails.isSameAsBillingAddress ? ["Shipping address same as billing address"] : []),
      setFullName(val) {
        state.shippingDetails["fullName"] = val.value;
        if (state.shippingDetails.isSameAsBillingAddress) {
          state.billingDetails["fullName"] = val.value;
        }
      },
      setBillingFullName(val) {
        state.billingDetails["fullName"] = val.value;
      },
      setDeliveryAddress(val) {
        state.shippingDetails["deliveryAddress"] = val.value.address;
        if (state.shippingDetails.isSameAsBillingAddress) {
          state.billingDetails["deliveryAddress"] = val.value.address;
        }
      },
      setBillingDeliveryAddress(val) {
        state.billingDetails["deliveryAddress"] = val.value.address;
      },
      setDeliveryInfos(val) {
        state.shippingDetails["deliveryAddress"] = val.value.address;
        state.shippingDetails["country"] = val.value.country;
        state.shippingDetails["state"] = val.value.state;
        state.shippingDetails["postalCode"] = val.value.postalCode;
        loadStates(val.value.country, "shipping");

        if (state.shippingDetails.isSameAsBillingAddress) {
          state.billingDetails["deliveryAddress"] = val.value.address;
          state.billingDetails["country"] = val.value.country;
          state.billingDetails["state"] = val.value.state;
          state.billingDetails["postalCode"] = val.value.postalCode;
        }
      },
      setBillingDeliveryInfos(val) {
        state.billingDetails["deliveryAddress"] = val.value.address;
        state.billingDetails["country"] = val.value.country;
        state.billingDetails["state"] = val.value.state;
        state.billingDetails["postalCode"] = val.value.postalCode;
        loadStates(val.value.country, "billing");
      },
      setCountry(val) {
        state.shippingDetails["country"] = val;
        if (state.shippingDetails.isSameAsBillingAddress) {
          state.billingDetails["country"] = val;
        }
        loadStates(val, "shipping");
      },
      setBillingCountry(val) {
        state.billingDetails["country"] = val;
        loadStates(val, "billing");
      },
      setState(val) {
        state.shippingDetails["state"] = val;
        if (state.shippingDetails.isSameAsBillingAddress) {
          state.billingDetails["state"] = val;
        }
      },
      setBillingState(val) {
        state.billingDetails["state"] = val;
      },
      setIsSameAsBillingAddress(val) {
        if (val.indexOf("Shipping address same as billing address") !== -1) {
          state.shippingDetails["isSameAsBillingAddress"] = true;

          state.billingDetails["fullName"] = state.shippingDetails["fullName"];
          state.billingDetails["deliveryAddress"] = state.shippingDetails["deliveryAddress"];
          state.billingDetails["country"] = state.shippingDetails["country"];
          state.billingDetails["state"] = state.shippingDetails["state"];
          state.billingDetails["postalCode"] = state.shippingDetails["postalCode"];
        } else {
          state.shippingDetails["isSameAsBillingAddress"] = false;

          state.billingDetails["fullName"] = "";
          state.billingDetails["deliveryAddress"] = "";
          state.billingDetails["country"] = "";
          state.billingDetails["state"] = "";
          state.billingDetails["postalCode"] = "";
        }
      },
      setShippingMode(val) {
        state.shippingDetails["shippingMode"] = val;
      },
      validator,
      continuePayment() {
        state.isDirtyForm = true;
        if (validator("", "")) {
          console.log("shipping--: ", state.shippingDetails);
          console.log("billing--: ", state.billingDetails);
        }
      }
    };
  }
};
</script>
