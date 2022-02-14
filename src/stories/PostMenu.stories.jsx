import React from 'react';
import PostMenu from '../components/PostMenu';

export default {
  title: 'Components/PostMenu',
  component: PostMenu,
};

const Template = (args) => <PostMenu {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  handleDelete: () => {},
  startOpen: false,
};
