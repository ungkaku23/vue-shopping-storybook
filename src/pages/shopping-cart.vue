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
import { ref, reactive, computed, onMounted } from 'vue';
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

  setup(props, { emit }) {
    props = reactive(props);
    const state = reactive({ 
      products: props.products,
      shippingMode: props.shippingDetails.shippingMode 
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
      doCheckout() {
        console.log("hey")
      }
    };
  }
};
</script>
