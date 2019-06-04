import styled from 'styled-components'

import Header from '~/components/common/Header'
import { PRIMARY, SUPPLEMENT } from '~/constants/colors'

export const TimeBlock = styled.div`
  > ${Header} {
    color: ${props => (props.theme === 'theme_one' ? PRIMARY : SUPPLEMENT)};
    text-transform: capitalize;
  }
`
