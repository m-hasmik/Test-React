import styled from 'styled-components'

import Button from '~/components/common/Button'
import { PRIMARY, PRIMARY_DARK, BLACK } from '~/constants/colors'

export const Categories = styled.div`
  display: flex;
  justify-content: space-around;
`

export const Category = styled(Button)`
  background-color: transparent;
  font-size: 0.9rem;
  border-color: transparent;
  color: ${props => (props.selected ? BLACK : PRIMARY)};
  pointer-events: ${props => (props.selected ? 'none' : 'inherit')};

  &:hover {
    background-color: transparent !important;
    color: ${PRIMARY_DARK};
  }
`

export const ToggleFilters = styled(Button)`
  background: none;
  font-size: 0.9rem;
  border-color: transparent;
  color: ${BLACK};

  svg {
    color: ${PRIMARY};
  }

  span {
    margin-left: 0.5rem;
  }

  &: hover {
    background: none;
  }
`

export const Wrapper = styled.div`
  border-bottom: 2px solid #ebebeb;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  flex-direction: row;
  padding: 0.5rem 2rem;
  position: relative;
`
