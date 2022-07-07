<template>
  <section class="shopping-cart">
    <product-item
      v-for="(item, index) in state.products"
      :key="randKey()"
      :item="item"
      @onUpdate="(obj) => onUpdate(obj, index)"
      @onRemove="onRemove"
    />

    <order-summary 
      :products="state.products"
      :shippingMode="state.shippingMode"
      @updateShippingMode="onUpdateShippingMode"
    />

    <nv-button 
      primary
      label="Secure Checkout"
      size="large" 
      style="width: 100%; margin: 20px 0px;"
      @click="doCheckout"
    />
  </section>
</template>

<script>
import { ref, reactive, computed, onMounted, watch } from 'vue';
import './shopping-cart.css';
import ProductItem from '../components/product-item.vue';
import NvButton from '../components/nv-button.vue';
import OrderSummary from '../components/order-summary.vue';

export default {
  name: 'shopping-cart',

  components: { 
    ProductItem,
    NvButton,
    OrderSummary
  },

  props: {
    products: {
      type: Object,
      default: []
    },
    shippingDetails: {
      type: Object,
      default: {}
    }
  },

  emits: ['saveAndCheckout'],

  setup(props, { emit }) {
    props = reactive(props);
    const state = reactive({ 
      products: props.products,
      shippingMode: props.shippingDetails.shippingMode 
    });

    watch(() => props.products, (current, prev) => {
      if (JSON.stringify(current) !== JSON.stringify(prev)) {
        state.products = current;
      }
    });

    watch(() => props.shippingDetails, (current, prev) => {
      if (JSON.stringify(current) !== JSON.stringify(prev)) {
        state.shippingMode = current.shippingMode;
      }
    });
    
    onMounted(() => {
    })

    return {
      state,
      onUpdate(item, index) {
        state.products[index] = item;
      },
      onRemove(item) {
        state.products = state.products.filter(o => o.id !== item.id);
      },
      onUpdateShippingMode(val) {
        state.shippingMode = val;
      },
      doCheckout() {
        emit("saveAndCheckout", state);
      }
    };
  }
};
</script>
