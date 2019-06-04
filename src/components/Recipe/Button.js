import styled from 'styled-components'

import CommonButton from '~/components/common/Button'

export const Button = styled(CommonButton)`
  z-index: 10;

  & > svg {
    transition: transform 0.2s ease-in-out;
  }

  &:hover > svg {
    transform: rotate(90deg);
  }
`
