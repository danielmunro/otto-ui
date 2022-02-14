import React from 'react';
import PostMenu from '../components/PostMenu';

export default {
  title: 'Navigation/PostMenu',
  component: PostMenu,
};

const Template = (args) => <PostMenu {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  handleDelete: () => {},
};
