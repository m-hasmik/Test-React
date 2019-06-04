import styled from 'styled-components'

import { GRAY_LIGHT, GRAY_MEDIUM } from '~/constants/colors'
import { SummaryItem } from './SummaryItem'

export const Footer = styled.ul`
  background: ${GRAY_LIGHT};
  display: flex;
  padding: 0.5rem;
  margin: 0;
  list-style: none;
  border-top: 1px solid ${GRAY_MEDIUM};
  zoom: 1;

  ${SummaryItem}:not(:last-child) {
    border-right: 1px solid ${GRAY_MEDIUM};
  }
`
