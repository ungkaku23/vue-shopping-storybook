import OrderSummary from '../components/order-summary.vue';

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
  title: 'Components/OrderSummary',
  component: OrderSummary
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { OrderSummary },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<order-summary v-bind="args" />',
});

export const Free = Template.bind({});
Free.args = {
  products,
  shippingMode: "free"
};

export const Quick = Template.bind({});
Quick.args = {
  products,
  shippingMode: "quick"
};