import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Avatar from '../pages/post/components/Avatar';

export default {
  title: 'UI/Avatar',
  component: Avatar,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <BrowserRouter><Avatar {...args} /></BrowserRouter>;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
};
