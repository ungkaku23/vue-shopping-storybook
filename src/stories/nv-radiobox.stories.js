import NvRadiobox from '../components/nv-radiobox.vue';

export default {
  title: 'Components/Radiobox',
  component: NvRadiobox,
  argTypes: {
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } }
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { NvRadiobox },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<nv-radiobox v-bind="args" />',
});

export const Standard = Template.bind({});
Standard.args = {
  options: [{
    value: "text1",
    label: "text1"
  }, {
    value: "text2",
    label: "text2"
  }, {
    value: "text3",
    label: "text3"
  }, {
    value: "text4",
    label: "text4"
  }, {
    value: "text5",
    label: "text5"
  }]
};