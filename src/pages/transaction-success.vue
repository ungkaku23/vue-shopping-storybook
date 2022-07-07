<template>
  <section class="transaction-success">
    <div class="ts-body">
      <div class="prod-banner">
        <img :src="getImgUrl('dummyProd.png')" /> 
      </div>
      <div class="prod-description">
        <div>Order Successful</div>
        <div>Your packet will be sent to your address, thanks for order</div>
      </div>
    </div>

    <nv-button 
      primary
      label="Back To Home"
      size="large" 
      style="width: 100%; margin: 20px 0px;"
      @click="back"
    />
  </section>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';
import axios from 'axios';
import './transaction-success.css';
import NvButton from '../components/nv-button.vue';

export default {
  name: 'transaction-success',

  components: { 
    NvButton
  },

  props: {
    
  },

  setup(props, { emit }) {
    // props = reactive(props);

    const state = reactive({ 
    });
    
    onMounted(() => {
    });

    const getImgUrl = (imgFile) => {
      var images = require.context('../assets/img/', false, /\.(png|jpg|jpeg)$/)
      return images('./' + imgFile)
    }

    return {
      state,
      getImgUrl,
      back() {
        
      }
    };
  }
};
</script>
