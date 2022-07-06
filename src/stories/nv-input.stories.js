import NvInput from '../components/nv-input.vue';

export default {
  title: 'Components/Input',
  component: NvInput,
  argTypes: {
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } }
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { NvInput },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<nv-input v-bind="args" />',
});

export const Standard = Template.bind({});
Standard.args = {
  label: 'Full Name',
  type: 'text',
  placeholder: 'Input your name'
};

export const AutoComplete = Template.bind({});
AutoComplete.args = {
  label: 'Delivery Address',
  type: 'autocomplete',
  placeholder: 'Type your address'
};

export const InputMask = Template.bind({});
InputMask.args = {
  label: 'Card Number',
  type: 'mask',
  tokens: '#### #### #### ####',
  placeholder: '4242 4242 4242 4242'
};

