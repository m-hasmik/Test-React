import styled from 'styled-components'

import Title from '~/components/common/Title'
import { GRAY_MEDIUM } from '~/constants/colors'

export const Header = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${GRAY_MEDIUM};
  padding: 0.5rem;

  ${Title} {
    font-size: 0.9rem;
    margin-left: 0.5rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`
