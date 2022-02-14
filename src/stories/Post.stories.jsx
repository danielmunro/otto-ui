import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Post from '../components/Post';

export default {
  title: 'UI/Post',
  component: Post,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <BrowserRouter><Post {...args} /></BrowserRouter>;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  post: {
    uuid: "uuid-test-value",
    text: "this is a post",
    created_at: "2022-02-01 05:05:01",
    user: {
      name: "foo bar",
      username: "foobar",
      uuid: "user-uuid-test",
    },
    images: [],
  },
  onDelete: () => {},
  showReply: true,
};
