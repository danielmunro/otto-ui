import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Reply from '../pages/post/components/Reply';

export default {
  title: 'UI/Reply',
  component: Reply,
};

const Template = (args) => <BrowserRouter><Reply {...args} /></BrowserRouter>;

export const Primary = Template.bind({});
Primary.args = {
  reply: {
    text: "This is a test",
    created_at: "2022-02-01 01:01:25",
    user: {
      uuid: "this-is-a-test",
      name: "foo bar",
      username: "foobar",
    },
  },
};
