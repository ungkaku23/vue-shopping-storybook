import checkoutShipping from '../pages/checkout-shipping.vue';

export default {
  title: 'Pages/CheckoutShipping',
  component: checkoutShipping,
  argTypes: {
  }
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { checkoutShipping },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be mapped to keys in the returned object
    return { args };
  },
  // Then, those values can be accessed directly in the template
  template: '<checkout-shipping v-bind="args" />',
});

export const Standard = Template.bind({});
Standard.args = {
  shippingDetails: {
    fullName: "Mr. Jhon Smith",
    deliveryAddress: "4140 Parker Rd. Allentown, California 31134",
    country: "United States",
    state: "CA",
    isSameAsBillingAddress: true,
    shippingMode: "free" 
  }
}