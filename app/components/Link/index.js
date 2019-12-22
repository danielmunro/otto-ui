/**
 * A link to a certain page, an anchor tag
 */

import { Link as ReactRouterLink } from 'react-router-dom';
import styled from 'styled-components';

const Link = styled(ReactRouterLink)`
  color: #41addd;
  text-decoration: none;

  &:hover {
    color: #6cc0e5;
  }
`;

export default Link;
