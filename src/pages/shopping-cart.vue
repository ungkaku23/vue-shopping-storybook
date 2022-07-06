<template>
  <section class="shopping-cart">
    <product-item
      v-for="(item, index) in state.products"
      :key="randKey()"
      :item="item"
      @onUpdate="(obj) => onUpdate(obj, index)"
      @onRemove="onRemove"
    />

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
// import { useStore } from 'vuex';

export default {
  name: 'shopping-cart',

  components: { 
    ProductItem,
    NvButton
  },

  props: {
    products: {
      type: Object
    },
    shippingMode: {
      type: String
    }
  },

  setup(props, { emit }) {
    // const store = useStore();
    // console.log("store: ", store);

    props = reactive(props);
    const state = reactive({ 
      products: props.products,
      shippingMode: props.shippingMode 
    });
    
    onMounted(() => {
    })

    const subTotal = computed(() => state.products.reduce((total, o) => {
      total += o.price * o.quantity;
      return total;
    }, 0));

    const total = computed(() => subTotal.value + (state.shippingMode === 'free' ? 0 : 9.90));

    return {
      state,
      subTotal,
      total,
      onUpdate(item, index) {
        state.products[index] = item;
        emit('onUpdateCart', {
          products: state.products,
          shippingMode: state.shippingMode
        });
      },
      onRemove(item) {
        state.products = state.products.filter(o => o.id !== item.id);
        emit('onUpdateCart', {
          products: state.products,
          shippingMode: state.shippingMode
        });
      },
      updateShippingMode(mode) {
        state.shippingMode = mode;
        emit('onUpdateCart', {
          products: state.products,
          shippingMode: state.shippingMode
        });
      },
      doCheckout() {
        console.log("hey")
      }
    };
  }
};
</script>
