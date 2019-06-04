import styled from 'styled-components'

import Item from '~/components/common/Item'
import Card from '~/components/common/Card'

export const Wrapper = styled(Item)`
  ${Card} {
    padding: 0;
    margin: 0.25rem 0.25rem 0;
    cursor: pointer;
    width: 100%;
  }
`
