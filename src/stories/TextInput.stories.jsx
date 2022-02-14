import React from 'react';
import TextInput from '../components/TextInput';

export default {
  title: 'Input/TextInput',
  component: TextInput,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <TextInput {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  label: "Text Input Label",
  value: "",
  onChangeValue: () => {},
};
