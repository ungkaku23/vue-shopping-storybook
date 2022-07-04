<template>
  <header>
    <div class="product-item">
      <div class="left">
        <img :src="item.img" />
        <div>
          <p class="title" style="margin-top: 0px;">{{item.title}}</p>
          <p><span>Color: </span><span class="attr-value">{{item.color}}</span></p>
          <p><span>Size: </span><span class="attr-value">{{item.size}}</span></p>
          <p><span class="remove-btn">Remove</span></p>
        </div>
      </div>
      <div class="right">
        <div class="quantity-input">
          <svg
            width="13"
            height="13"
            fill="none"
            stroke="#000000"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            @click="updateAttr('quantity', item.quantity > 0 ? item.quantity + 1 : item.quantity)"
          >
            <use href="../assets/icon/feather-sprite.svg#plus"/>
          </svg>
          <input 
            type="number"
            :value="item.quantity"
            @input="(event) => updateAttr('quantity', event.target.value)"
          />
          <svg
            width="10"
            height="13"
            fill="none"
            stroke="#000000"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
            @click="updateAttr('quantity', item.quantity > 0 ? item.quantity - 1 : item.quantity)"
          >
            <use href="../assets/icon/feather-sprite.svg#minus"/>
          </svg>
        </div>
        <p class="sub-total">${{toFloat2}}</p>
      </div>
    </div>
  </header>
</template>

<script>
import { reactive, computed } from 'vue';
import './product-item.css';

export default {
  name: 'product-item',

  data() {
    return {
      temp: 1,
    }
  },

  props: {
    item: {
      type: Object,
    },
  },

  // computed: {
  //   toFloat2() {
  //     return (this.item.price * this.item.quantity).toFixed(2);
  //   } "quantity", item.quantity > 0 ? item.quantity - 1 : item.quantity)
  // },

  emits: ['onUpdate'],

  setup(props, { emit }) {
    props = reactive(props);
    
    return {
      toFloat2: computed(() => (props.item.price * props.item.quantity).toFixed(2)),
      updateAttr(field, value) {
        emit('onUpdate', {
          ...props.item,
          [field], value
        });
      },
    };
  },
};
</script>
