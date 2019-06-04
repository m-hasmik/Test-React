import styled from 'styled-components'
import { Link as ReactRouterDOMLink } from 'react-router-dom'

import { PRIMARY, PRIMARY_DARK, WHITE } from '~/constants/colors'

const styles = `
  color: ${WHITE};
  border-radius: 0.12em;
  border: 1px solid ${PRIMARY};
  border-radius: 25px;
  background-color: ${PRIMARY};
  cursor: pointer;
  display: inline-block;
  font-size: .75rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  margin: 0.3rem 0.3rem 0.3rem 0;
  padding: 0.35rem 1.2rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.2s;
  outline: none;

  &:hover {
    background-color: ${PRIMARY_DARK};
  }

  > svg {
    margin-right: 0.25rem;
  }`

export const ButtonLink = styled(ReactRouterDOMLink)`
  ${styles}
`

const Button = styled.button`
  ${styles}
`

export default Button
