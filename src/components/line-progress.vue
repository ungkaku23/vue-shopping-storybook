<template>
  <div class="line-progress" :style="styles">
    <div 
      v-for="(point, index) in points"
      :key="randKey()"
      :class="`point-line ${index < 2 ? 'group' : ''}`"
    >
      <div 
        class="point-box"
        @click="updateStep(index)"
      >
        <div :class="`point ${index < step ? '' : 'inactive'}`">
          <svg
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            v-if="index < step" 
          >
            <use href="../assets/icon/feather-sprite.svg#check"/>
          </svg>
          <span v-else>0{{point.index}}</span>
        </div>
        <span :class="`label ${index < step ? '' : 'inactive-font'}`">{{point.label}}</span>
      </div>
      <div 
        v-if="index < 2" 
        :class="`bar ${index < step - 1 ? '' : 'inactive'}`"
      >
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, watch } from 'vue';
import './line-progress.css';
import { 
  checkoutShippingValidator,
  checkoutPaymentValidator
} from '../helpers';

export default {
  name: 'line-progress',

  props: {
    step: {
      type: Number,
      default: 1,
    },
    style: {
      type: String,
      default: ""
    },
    shippingDetails: {
      type: Object,
      default: {}
    },
    billingDetails: {
      type: Object,
      default: {}
    },
    paymentDetails: {
      type: Object,
      default: {}
    }
  },

  emits: ['click'],

  setup(props, { emit }) {
    props = reactive(props);
    const stepIndex = ref(props.step);

    const state = reactive({ 
      shippingDetails: props.shippingDetails,
      billingDetails: props.billingDetails,
      paymentDetails: props.paymentDetails
    });

    watch(() => props.shippingDetails, (current, prev) => {
      if (JSON.stringify(current) !== JSON.stringify(prev)) {
        state.shippingDetails = current;
      }
    });

    watch(() => props.billingDetails, (current, prev) => {
      if (JSON.stringify(current) !== JSON.stringify(prev)) {
        state.billingDetails = current;
      }
    });

    watch(() => props.paymentDetails, (current, prev) => {
      if (JSON.stringify(current) !== JSON.stringify(prev)) {
        state.paymentDetails = current;
      }
    });

    return {
      points: [{
        index: 1,
        label: "Shipping"
      }, {
        index: 2,
        label: "Payment"
      }, {
        index: 3,
        label: "Review"
      }],
      state,
      styles: computed(() => props.style),
      stepIndex,
      checkoutShippingValidator,
      updateStep(index) {
        let errEmit = "";
        switch (index) {
          case 0:
            break;
          case 1:
            if (!checkoutShippingValidator("", "", state.shippingDetails, state.billingDetails)) {
              errEmit = "Shipping Section";
            }
            break;
          case 2:
            if (!checkoutPaymentValidator("", state.paymentDetails)) {
              errEmit = "Payment Section";
            }
            break;
        }

        if (errEmit === "") {
          emit('click', index + 1);
        } else {
          alert(`Please pass the ${errEmit}.`);
        }
      }
    };
  }
};
</script>
