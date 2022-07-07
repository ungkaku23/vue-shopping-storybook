<template>
  <section class="main-app">
    main app {{shippingMode}}
  </section>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';
import axios from 'axios';
import './main-app.css';
import { useStore } from 'vuex';

export default {
  name: 'main-app',

  components: { 
  },

  props: {
    
  },

  setup(props, { emit }) {
    const store = useStore();
    console.log("store: ", store.state.shippingMode);
    // props = reactive(props);

    const state = reactive({ 
      shippingMode: store.state.shippingMode
    });
    
    onMounted(() => {
      store.dispatch('updateProducts', "quick");
    });

    return {
      state,
      shippingMode: computed(() => store.state.shippingMode),
    };
  }
};
</script>
