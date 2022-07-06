import CheckoutPayment from '../pages/checkout-payment.vue';

export default {
  title: 'Pages/CheckoutPayment',
  component: CheckoutPayment,
  argTypes: {
  }
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { CheckoutPayment },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be mapped to keys in the returned object
    return { args };
  },
  // Then, those values can be accessed directly in the template
  template: '<checkout-payment v-bind="args" />',
});

export const Standard = Template.bind({});
Standard.args = {
  paymentDetails: {
    method: "paypal",
    cardHolderName: "",
    cardNumber: "",
    expirationDate: "",
    securityCode: "",
    isSavePaymentInfo: true
  }
}