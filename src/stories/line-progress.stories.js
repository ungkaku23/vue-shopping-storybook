import LineProgress from '../components/line-progress.vue';

export default {
  title: 'Components/LineProgress',
  component: LineProgress,
  argTypes: {
    step: { control: { type: 'select', options: [1, 2, 3] } }
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { LineProgress },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be spread into the returned object
    return { args };
  },
  // Then, the spread values can be accessed directly in the template
  template: '<line-progress v-bind="args" />',
});

export const Standard = Template.bind({});
Standard.args = {
  step: 1
};
