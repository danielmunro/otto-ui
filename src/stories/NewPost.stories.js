import React from 'react';
import NewPost from '../components/NewPost';

export default {
  title: 'UI/NewPost',
  component: NewPost,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <NewPost {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  onPostCreated: () => {},
};
