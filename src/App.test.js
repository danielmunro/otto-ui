import renderer from 'react-test-renderer';
import App from './App';

test('renders correctly', () => {
  // when
  const tree = renderer
    .create(<App />)
    .toJSON();

  // then
  expect(tree).toMatchSnapshot();
});
