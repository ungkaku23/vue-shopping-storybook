<template>
  <article>
    <section class="shopping-cart">
      <product-item
        v-for="(item, index) in state.products"
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
          <span class="attr-value">$277.00 USD</span>
        </div>
        <div>
          <span class="attr-label">Shipping:</span>
          <span>
            <span class="attr-value">$277.00 USD</span>
            <span v-else >$277.00 USD</span>
          </span>
        </div>
        <div>
          <span class="attr-label">Total:</span>
          <span class="attr-value">$277.00 USD</span>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';
import './shopping-cart.css';
import ProductItem from '../components/product-item.vue';

export default {
  name: 'shopping-cart',

  components: { ProductItem },

  props: {
    products: {
      type: Object
    },
    shippingMode: {
      type: String
    }
  },

  setup(props, { emit }) {
    props = reactive(props);
    const state = ref({ 
      products: [],
      shippingMode: "free" 
    });
    
    onMounted(() => {
      state.value.products = props.products;
      state.value.shippingMode = props.shippingMode
    })

    return {
      state,
      sum: computed(() => state.value.products.reduce((total, o) => {
        total += o.price * o.quantity;
        return total;
      }, 0)),
      onUpdate(item, index) {
        state.value.products[index] = item;
      },
      onRemove(item) {
        state.value.products = state.value.products.filter(o => o.id !== item.id);
      }
    };
  }
};
</script>
