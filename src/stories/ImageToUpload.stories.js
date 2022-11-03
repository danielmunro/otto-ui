import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import FollowDetails from '../pages/user/components/FollowDetails';
import ImageToUpload from '../pages/home/components/ImageToUpload';

export default {
  title: 'UI/ImageToUpload',
  component: ImageToUpload,
};

const Template = (args) => <div style={{display: "flex"}}><ImageToUpload {...args} /></div>;

export const Primary = Template.bind({});
Primary.args = {
  image: {
    s3_key: "1e7de2f9-2697-449a-bcc0-6d83904b8787.jpeg",
    uuid: "foo",
  }
};

export const HoverState = Template.bind({});
HoverState.args = {
  image: {
    s3_key: "1e7de2f9-2697-449a-bcc0-6d83904b8787.jpeg",
    uuid: "foo",
  },
  hover: true,
};
