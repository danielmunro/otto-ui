import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import FollowDetails from '../pages/user/components/FollowDetails';

export default {
  title: 'Navigation/FollowDetails',
  component: FollowDetails,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <BrowserRouter><FollowDetails {...args} /></BrowserRouter>;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  username: "foo",
  followers: [1, 2, 3],
  follows: [4, 5, 6, 7, 8, 9],
};
