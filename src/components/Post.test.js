import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Post from './Post';

test('renders correctly', () => {
  // when
  const tree = renderer
    .create(
      <BrowserRouter>
        <Post
          post={{
            uuid: "1-2-3-4",
            text: "hello world",
            created_at: new Date(),
            user: {
              uuid: "1-2-3-4",
              username: "test",
              profile_pic: "",
              name: "Tester McTesterson",
            },
            images: [],
            selfLiked: false,
          }}
        />
      </BrowserRouter>
    )
    .toJSON();

  // then
  expect(tree).toMatchSnapshot();
});
