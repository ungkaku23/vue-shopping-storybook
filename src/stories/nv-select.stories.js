import NvSelect from '../components/nv-select.vue';

export default {
  title: 'Components/Select',
  component: NvSelect,
  argTypes: {
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } }
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { NvSelect },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<nv-select v-bind="args" />',
});

export const Standard = Template.bind({});
Standard.args = {
  label: 'Country',
  value: "",
  options: [{
    label: "asdfwer qwre qwer qwerpoi asf",
    value: "1"
  }, {
    label: "asdfwer qwre qwef",
    value: "2"
  }, {
    label: "asdfwe asf",
    value: "3"
  }, {
    label: "asdfwer qwre",
    value: "4"
  }, {
    label: "asdasdf fwer qwre",
    value: "5"
  }, {
    label: "aaaa a asdfwer qwre",
    value: "6"
  }, {
    label: "aaa w sdfwer qwre",
    value: "7"
  }, {
    label: "xx x asdfwer qwre",
    value: "8"
  }, {
    label: "asdf d dwer qwre",
    value: "9"
  }, {
    label: "aa a sdfwer qwre",
    value: "10"
  }]
};