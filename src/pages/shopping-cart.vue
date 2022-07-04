<template>
  <article>
    <section>
      <product-item
        v-for="(item, index) in state.products"
        :item="item"
        @onUpdate="(obj) => onUpdate(obj, index)"
        @onRemove="onRemove"
      />

      <div class="summary">
        
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
    }
  },

  setup(props, { emit }) {
    props = reactive(props);
    const state = ref({ products: [] })
    
    onMounted(() => {
      state.value.products = props.products
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
