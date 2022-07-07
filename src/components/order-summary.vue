<template>
  <div class="summary">
    <h3 class="title">
      Order Summery
    </h3>
    <div>
      <span class="attr-label">Sub Total:</span>
      <span class="attr-value">${{subTotal.toFixed(2)}} USD</span>
    </div>
    <div>
      <span class="attr-label">Shipping:</span>
      <span>
        <span 
          :class="state.shippingMode !== 'free' ? 'attr-value' : ''"
          style="cursor: pointer;"
          @click="updateShippingMode('quick')"
        >
          $9.90
        </span>&nbsp;&nbsp;&nbsp;
        <span 
          :class="state.shippingMode === 'free' ? 'attr-value' : ''"
          style="cursor: pointer;"
          @click="updateShippingMode('free')"
        >
          $0
        </span>
        &nbsp; USD
      </span>
    </div>
    <div style="margin-bottom: 0;">
      <span class="attr-label" >Total:</span>
      <span class="attr-value">${{total.toFixed(2)}} USD</span>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, watch } from 'vue';
import './order-summary.css';

export default {
  name: 'order-summary',

  props: {
    products: {
      type: Object,
      default: []
    },
    shippingMode: {
      type: String,
      default: ""
    }
  },

  setup(props, { emit }) {
    props = reactive(props);

    const state = reactive({ 
      products: props.products,
      shippingMode: props.shippingMode 
    });

    watch(() => props.products, (current, prev) => {
      if (JSON.stringify(current) !== JSON.stringify(prev)) {
        state.products = current;
      }
    });

    watch(() => props.shippingMode, (current, prev) => {
      if (JSON.stringify(current) !== JSON.stringify(prev)) {
        state.shippingMode = current;
      }
    });

    const subTotal = computed(() => state.products.reduce((total, o) => {
      total += o.price * o.quantity;
      return total;
    }, 0));

    const total = computed(() => subTotal.value + (state.shippingMode === 'free' ? 0 : 9.90));

    return {
      state,
      subTotal,
      total,
      updateShippingMode(mode) {
        state.shippingMode = mode;
      }
    };
  }
};
</script>
