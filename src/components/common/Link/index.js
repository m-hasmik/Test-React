import styled from 'styled-components'
import { Link as ReactRouterDOMLink } from 'react-router-dom'

import { PRIMARY } from '~/constants/colors'

const Link = styled(ReactRouterDOMLink)`
  color: ${PRIMARY};
  display: inline-block;
  font-size: 0.9rem;
  text-decoration: none;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`

export const LinkButton = styled.button`
  background: transparent;
  border: 0;
  color: ${PRIMARY};
  display: inline-block;
  font-size: 0.9rem;
  outline: none;
  text-decoration: none;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`

export default Link
