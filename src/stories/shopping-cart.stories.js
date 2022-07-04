import ShoppingCart from '../pages/shopping-cart.vue';

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
  title: 'Pages/ShoppingCart',
  component: ShoppingCart,
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { ShoppingCart },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be mapped to keys in the returned object
    return { ...args };
  },
  // Then, those values can be accessed directly in the template
  template: '<shopping-cart :products="products" :shippingMode="shippingMode"/>',
});

export const FreeShipping = Template.bind({});
FreeShipping.args = {
  shippingMode: "free",
  products
}

export const QuickShipping = Template.bind({});
QuickShipping.args = {
  shippingMode: "quick",
  products
}