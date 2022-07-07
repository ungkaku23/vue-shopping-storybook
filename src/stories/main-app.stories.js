import MainApp from '../pages/main-app.vue';

export default {
  title: 'App/MainApp',
  component: MainApp,
  argTypes: {
  }
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { MainApp },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be mapped to keys in the returned object
    return { args };
  },
  // Then, those values can be accessed directly in the template
  template: '<main-app v-bind="args" />',
});

export const Index = Template.bind({});
Index.args = {
}