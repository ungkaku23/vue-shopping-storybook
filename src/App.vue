<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <shopping-cart />
  </div>
</template>

<script>
import ShoppingCart from "./pages/shopping-cart.vue";

export default {
  name: "App",
  components: {
    ShoppingCart
  }
};
</script>