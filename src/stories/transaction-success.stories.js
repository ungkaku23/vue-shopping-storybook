import TransactionSuccess from '../pages/transaction-success.vue';

export default {
  title: 'Pages/TransactionSuccess',
  component: TransactionSuccess,
  argTypes: {
  }
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TransactionSuccess },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be mapped to keys in the returned object
    return { args };
  },
  // Then, those values can be accessed directly in the template
  template: '<transaction-success v-bind="args" />',
});

export const Standard = Template.bind({});
Standard.args = {

}