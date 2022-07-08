import { createStore } from 'vuex';

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

export default createStore({
  state: {
    step: 0, // start , shopping cart
    paymentDetails: {
      method: "paypal",
      cardHolderName: "",
      cardNumber: "",
      expirationDate: "",
      securityCode: "",
      isSavePaymentInfo: true
    },
    shippingDetails: {
      fullName: "",
      deliveryAddress: "",
      country: "",
      state: "",
      isSameAsBillingAddress: true,
      shippingMode: "free" 
    }, 
    billingDetails: {
      fullName: "",
      billingAddress: "",
      country: "",
      state: ""
    },
    products
  },
  mutations: {
    UPDATE_STEP(state, step) {
      state.step = step;
    },
    UPDATE_PRODUCTS(state, products) {
      state.products = products;
    },
    UPDATE_SHIPPING_DETAILS(state, shippingDetails) {
      state.shippingDetails = shippingDetails;
    },
    UPDATE_BILLING_DETAILS(state, billingDetails) {
      state.billingDetails = billingDetails;
    },
    UPDATE_PAYMENT_DETAILS(state, paymentDetails) {
      state.paymentDetails = paymentDetails;
    }
  },
  actions: {
    // updateProducts({ commit }, shippingMode) {
    //   commit('UPDATE_PRODUCTS', shippingMode);
    // }
  },
});