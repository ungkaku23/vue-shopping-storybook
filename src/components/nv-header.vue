<template>
  <header>
    <div class="wrapper">
      <div>
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          v-if="isCheckout"
        >
          <use href="../assets/icon/feather-sprite.svg#chevron-left"/>
        </svg>
      </div>
      <div>
        <h3>Shopping Cart</h3>
      </div>
    </div>
  </header>
</template>

<script>
import './nv-header.css';
import NvButton from '../components/nv-button.vue';

export default {
  name: 'nv-header',

  components: { 
    NvButton
  },

  props: {
    isCheckout: {
      type: Boolean,
    },
  },

  emits: ['login', 'logout', 'createAccount'],
};
</script>
