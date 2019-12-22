import React from 'react';
import { render } from 'react-testing-library';
import TimeSince from '../index';

describe('<TimeSince />', () => {
  it('renders correctly when the time is months ago', () => {
    // given
    const date = new Date();
    date.setMonth(date.getMonth() - 3);

    // when
    const result = render(
      <TimeSince
        date={`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}
      />,
    );
    const { queryByText } = result;

    // then
    expect(queryByText(/3 months/)).not.toBeNull();
  });

  it('renders correctly when the time is 1 month ago', () => {
    // given
    const date = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30);

    // when
    const result = render(
      <TimeSince
        date={`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}
      />,
    );
    const { queryByText } = result;

    // then
    expect(queryByText(/1 month/)).not.toBeNull();
  });

  it('renders correctly when the time is weeks ago', () => {
    // given
    const date = new Date(Date.now() - 1000 * 60 * 60 * 24 * 14);

    // when
    const result = render(
      <TimeSince
        date={`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}
      />,
    );
    const { queryByText } = result;

    // then
    expect(queryByText(/2 weeks/)).not.toBeNull();
  });

  it('renders correctly when the time is 1 week ago', () => {
    // given
    const date = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7);

    // when
    const result = render(
      <TimeSince
        date={`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}
      />,
    );
    const { queryByText } = result;

    // then
    expect(queryByText(/1 week/)).not.toBeNull();
  });

  it('renders correctly when the time is days ago', () => {
    // given
    const date = new Date();
    date.setDate(date.getDate() - 2);

    // when
    const result = render(
      <TimeSince
        date={`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}
      />,
    );
    const { queryByText } = result;

    // then
    expect(queryByText(/2 days/)).not.toBeNull();
  });

  it('renders correctly when the time is 1 day ago', () => {
    // given
    const date = new Date(Date.now() - 1000 * 60 * 60 * 24);

    // when
    const result = render(
      <TimeSince
        date={`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}
      />,
    );
    const { queryByText } = result;

    // then
    expect(queryByText(/1 day/)).not.toBeNull();
  });

  it('renders correctly when the time is hours ago', () => {
    // given
    const date = new Date(Date.now() - 1000 * 60 * 60 * 14);

    // when
    const result = render(
      <TimeSince
        date={`${date.getFullYear()}-${date.getMonth() +
          1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}
      />,
    );
    const { queryByText } = result;

    // then
    expect(queryByText(/14 hours/)).not.toBeNull();
  });

  it('renders correctly when the time is 1 hour ago', () => {
    // given
    const date = new Date(Date.now() - 1000 * 60 * 60);

    // when
    const result = render(
      <TimeSince
        date={`${date.getFullYear()}-${date.getMonth() +
          1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}
      />,
    );
    const { queryByText } = result;

    // then
    expect(queryByText(/1 hour/)).not.toBeNull();
  });

  it('renders correctly when the time is minutes ago', () => {
    // given
    const date = new Date(Date.now() - 1000 * 60 * 30);

    // when
    const result = render(
      <TimeSince
        date={`${date.getFullYear()}-${date.getMonth() +
          1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}
      />,
    );
    const { queryByText } = result;

    // then
    expect(queryByText(/30 minutes/)).not.toBeNull();
  });

  it('renders correctly when the time is 1 minute ago', () => {
    // given
    const date = new Date(Date.now() - 1000 * 60);

    // when
    const result = render(
      <TimeSince
        date={`${date.getFullYear()}-${date.getMonth() +
          1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}
      />,
    );
    const { queryByText } = result;

    // then
    expect(queryByText(/1 minute/)).not.toBeNull();
  });

  it('renders correctly when the time is seconds ago', () => {
    // given
    const date = new Date(Date.now() - 1000 * 30);

    // when
    const result = render(
      <TimeSince
        date={`${date.getFullYear()}-${date.getMonth() +
          1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}
      />,
    );
    const { queryByText } = result;

    // then
    expect(queryByText(/30 seconds/)).not.toBeNull();
  });

  it('renders correctly when the time is 1 second ago', () => {
    // given
    const date = new Date(Date.now() - 1000);

    // when
    const result = render(
      <TimeSince
        date={`${date.getFullYear()}-${date.getMonth() +
          1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}
      />,
    );
    const { queryByText } = result;

    // then
    expect(queryByText(/1 second/)).not.toBeNull();
  });

  it('renders correctly when the time is now', () => {
    // given
    const date = new Date();

    // when
    const result = render(
      <TimeSince
        date={`${date.getFullYear()}-${date.getMonth() +
          1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}
      />,
    );
    const { queryByText } = result;

    // then
    expect(queryByText(/just now/)).not.toBeNull();
  });
});
