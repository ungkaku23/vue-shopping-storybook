import CheckoutReview from '../pages/checkout-review.vue';

const products = [{
  id: 1,
  img: "https://dummyimage.com/500x500/000/fff.png&text=GRE",
  title: "Winter Collection",
  description: "lorem ipsum sumlo rewo eiolantes guterian",
  price: 23,
  quantity: 1,
  color: "Blue",
  size: "Extra Small"
}, {
  id: 2,
  img: "https://dummyimage.com/500x500/000/fff.png&text=GRE1",
  title: "Men Shoes",
  description: "lorem ipsum sumlo rewo eiolantes guterian",
  price: 43,
  quantity: 2,
  color: "White",
  size: "42"
}, {
  id: 3,
  img: "https://dummyimage.com/500x500/000/fff.png&text=GRE2",
  title: "Summer Collection",
  description: "lorem ipsum sumlo rewo eiolantes guterian",
  price: 20,
  quantity: 3,
  color: "Red",
  size: "XL"
}];

export default {
  title: 'Pages/CheckoutReview',
  component: CheckoutReview,
  argTypes: {
  }
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { CheckoutReview },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be mapped to keys in the returned object
    return { args };
  },
  // Then, those values can be accessed directly in the template
  template: '<checkout-review v-bind="args" />',
});

export const Standard = Template.bind({});
Standard.args = {
  paymentDetails: {
    method: "paypal",
    cardHolderName: "Jhon Mata",
    cardNumber: "2381 3234 1235 4321",
    expirationDate: "02/23",
    securityCode: "213",
    isSavePaymentInfo: true
  },
  shippingDetails: {
    fullName: "Ramy Reckley",
    deliveryAddress: "2431 Aukland Blvd, Sydney, SA, Australia",
    country: "Australia",
    state: "SA",
    isSameAsBillingAddress: true,
    shippingMode: "free" 
  }, 
  billingDetails: {
    fullName: "Jhon Mata",
    billingAddress: "3224 Harvey Land, Los Angeles, CA, USA",
    country: "United States",
    state: "CA"
  },
  products
}