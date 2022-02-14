import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Album from '../components/Album';

export default {
  title: 'Navigation/Album',
  component: Album,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <BrowserRouter><Album {...args} /></BrowserRouter>;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  album: {
    name: "A New Album",
    uuid: "test-not-real-uuid",
  }
};
