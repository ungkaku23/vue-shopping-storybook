<template>
  <div class="product-item">
    <div class="left">
      <img :src="item.img" />
      <div>
        <p class="title" style="margin-top: 0px;">{{item.title}}</p>
        <p><span>Color: </span><span class="attr-value">{{item.color}}</span></p>
        <p><span>Size: </span><span class="attr-value">{{item.size}}</span></p>
        <p>
          <span 
            class="remove-btn"
            @click="$emit('onRemove', item)"
          >
            Remove
          </span>
        </p>
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
          @click="updateAttr('quantity', quantity > 0 ? quantity + 1 : quantity)"
        >
          <use href="../assets/icon/feather-sprite.svg#plus"/>
        </svg>
        <input 
          type="number"
          :value="quantity"
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
          @click="updateAttr('quantity', quantity > 0 ? quantity - 1 : quantity)"
        >
          <use href="../assets/icon/feather-sprite.svg#minus"/>
        </svg>
      </div>
      <p class="sub-total">${{toFloat2}}</p>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
import './product-item.css';

export default {
  name: 'product-item',

  props: {
    item: {
      type: Object,
    },
  },

  emits: ['onUpdate'],

  setup(props, { emit }) {
    props = reactive(props);
    const quantity = ref(props.item.quantity);

    return {
      quantity,
      toFloat2: computed(() => (props.item.price * quantity.value).toFixed(2)),
      updateAttr(field, value) {
        field === "quantity" ? quantity.value = value : null;
        emit('onUpdate', {
          ...props.item,
          [field]: value
        });
      },
    };
  }
};
</script>
