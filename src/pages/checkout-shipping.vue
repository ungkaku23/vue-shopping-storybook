<template>
  <section class="checkout-shipping">
    <loading-spinner 
      v-if="state.isLoading" 
      :label="state.loadingLabel" 
    />
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
    <div class="country-state">
      <div class="cs-widget">
        <nv-select 
          fullWidth 
          label="Country"
          :value="state.shippingDetails.country"
          :options="state.countries"
          @change="setCountry"
        />
      </div>
      <div class="cs-widget">
        <nv-select 
          fullWidth 
          label="State"
          :value="state.shippingDetails.state"
          :options="state.states"
          @change="setState"
        />
      </div>
    </div>
    <nv-checkbox
      :options="checkboxes"
      :value="isBA"
      @change="setIsSameAsBillingAddress"
    />
    <h4 class="checkout-subtitle" style="margin-top: 20px; margin-bottom: 6px">Choose Shipping Mode</h4>
    <p class="checkout-description">Choose a shipping which deliver faster</p>
    
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

export default {
  name: 'checkout-shipping',

  components: { 
    NvButton,
    NvInput,
    NvSelect,
    LoadingSpinner,
    NvCheckbox
  },

  props: {
    shippingDetails: {
      type: Object
    },
  },

  setup(props, { emit }) {
    props = reactive(props);
    const state = reactive({ 
      shippingDetails: props.shippingDetails,
      loadingLabel: "Loading",
      isLoading: false,
      countries: [],
      states: []
    });

    const loadStates = (country) => {
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
          state.states = response2.data.map(o => ({
            label: o.state_name,
            value: o.state_name
          }));
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
          // state.states = response.data.
        })
        .catch((err) => {
          state.isLoading = false;
        });
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
      isBA: computed(() => state.shippingDetails.isSameAsBillingAddress ? ["Shipping address same as billing address"] : []),
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
        loadStates(val.value.country);
      },
      setCountry(val) {
        state.shippingDetails["country"] = val;
        loadStates(val);
      },
      setState(val) {
        state.shippingDetails["state"] = val;
      },
      setIsSameAsBillingAddress(val) {
        val.indexOf("Shipping address same as billing address") !== -1 
          ? state.shippingDetails["isSameAsBillingAddress"] = true 
          : state.shippingDetails["isSameAsBillingAddress"] = false;
      }
    };
  }
};
</script>
