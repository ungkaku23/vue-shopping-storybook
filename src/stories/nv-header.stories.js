import NvHeader from '../components/nv-header.vue';

export default {
  title: 'Components/Header',
  component: NvHeader,
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { NvHeader },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be spread into the returned object
    return { ...args };
  },
  // Then, the spread values can be accessed directly in the template
  template: '<nv-header :isCheckout="isCheckout" :label="label" />',
});

export const ShoppingCart = Template.bind({});
ShoppingCart.args = {
  isCheckout: false,
  label: "Shopping Cart"
};

export const Checkout = Template.bind({});
Checkout.args = {
  isCheckout: true,
  label: "Checkout"
};
