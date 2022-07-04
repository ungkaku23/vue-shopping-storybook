import ProductItem from '../components/product-item.vue';

export default {
  title: 'Components/ProductItem',
  component: ProductItem,
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { ProductItem },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be spread into the returned object
    return { ...args };
  },
  // Then, the spread values can be accessed directly in the template
  template: '<product-item :item="item" />',
});

export const Standard = Template.bind({});
Standard.args = {
  item: {
    img: "https://dummyimage.com/500x500/000/fff.png&text=GRE",
    title: "Winter Collection",
    description: "lorem ipsum sumlo rewo eiolantes guterian",
    price: 33,
    quantity: 2,
    color: "Blue",
    size: "Extra Small"
  }
};
