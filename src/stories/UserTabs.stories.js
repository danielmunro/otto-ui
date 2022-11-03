import React from 'react';
import UserTabs from '../pages/user/components/UserTabs';

export default {
  title: 'Navigation/UserTabs',
  component: UserTabs,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <UserTabs {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  posts: <div />,
  pictures: <div />,
};
