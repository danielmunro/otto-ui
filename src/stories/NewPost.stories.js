import React from 'react';
import NewPost from '../pages/home/components/NewPost';

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
  images: [],
};

export const WithImagesToUpload = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithImagesToUpload.args = {
  onPostCreated: () => {},
  images: [{
    s3_key: "1e7de2f9-2697-449a-bcc0-6d83904b8787.jpeg",
    uuid: 1,
  }, {
    s3_key: "1d3fb106-b5c0-441a-91c8-5c1fd00c08df.png",
    uuid: 2,
  }, {
    s3_key: "d86e947f-9952-4bb5-b73a-3a9ffcb26924.jpeg",
    uuid: 3,
  }],
};
