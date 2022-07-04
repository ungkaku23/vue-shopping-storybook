import NvHeader from '../components/nv-header.vue';

export default {
  title: 'Components/NvHeader',
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
  template: '<nv-header :isCheckout="isCheckout" />',
});

export const ShoppingCart = Template.bind({});
ShoppingCart.args = {
  isCheckout: false
};

export const Checkout = Template.bind({});
Checkout.args = {
  isCheckout: true
};
