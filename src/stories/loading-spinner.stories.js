import LoadingSpinner from '../components/loading-spinner.vue';

export default {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { LoadingSpinner },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<loading-spinner v-bind="args" />',
});

export const Standard = Template.bind({});
Standard.args = {
  label: "Loading"
};