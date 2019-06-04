import styled from 'styled-components'

import CommonLink from '~/components/common/Link'

export const LinkOverlay = styled(CommonLink)`
  bottom: auto;
  height: 100%;
  left: auto;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 1;
`
