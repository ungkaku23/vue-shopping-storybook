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
          @click="$emit('back')"
        >
          <use href="../assets/icon/feather-sprite.svg#chevron-left"/>
        </svg>
      </div>
      <div>
        <h3>{{label}}</h3>
      </div>
    </div>
  </header>
</template>

<script>
import './nv-header.css';

export default {
  name: 'nv-header',

  props: {
    isCheckout: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: "Shopping Cart"
    }
  },

  emits: ['back'],
};
</script>
