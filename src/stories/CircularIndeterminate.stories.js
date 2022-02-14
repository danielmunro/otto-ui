import React from 'react';
import CircularIndeterminate from '../components/CircularIndeterminate';

export default {
  title: 'UI/CircularIndeterminate',
  component: CircularIndeterminate,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <CircularIndeterminate {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
};
