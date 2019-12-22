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
    expect(queryByText(/3 months ago/)).not.toBeNull();
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
    expect(queryByText(/1 month ago/)).not.toBeNull();
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
    expect(queryByText(/2 weeks ago/)).not.toBeNull();
  });

  it('renders correctly when the time is 1 week ago', () => {
    // given
    const date = new Date(Date.now() - 1000 * 60 * 60 * 24 * 6);

    // when
    const result = render(
      <TimeSince
        date={`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}
      />,
    );
    const { queryByText } = result;

    // then
    expect(queryByText(/1 week ago/)).not.toBeNull();
  });

  it('renders correctly when the time is days ago', () => {
    // given
    const date = new Date();
    date.setDate(date.getDate() - 1);

    // when
    const result = render(
      <TimeSince
        date={`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}
      />,
    );
    const { queryByText } = result;

    // then
    expect(queryByText(/2 days ago/)).not.toBeNull();
  });
});
