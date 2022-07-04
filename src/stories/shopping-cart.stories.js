import ShoppingCart from '../pages/shopping-cart.vue';
import * as NvHeaderStories from './nv-header.stories';

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
    return { user: args.user };
  },
  // Then, those values can be accessed directly in the template
  template: '<shopping-cart />',
});

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  ...NvHeaderStories.LoggedIn.args,
};
