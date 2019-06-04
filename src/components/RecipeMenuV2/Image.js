import styled from 'styled-components'

import { Container as CommonImageContainer } from '~/components/Image/Container'
import { Placeholder as CommonImagePlaceholder } from '~/components/Image/Placeholder'

const IMAGE_HEIGHT = '40px'
const IMAGE_WIDTH = '100px'

export const ImageContainer = styled(CommonImageContainer)`
  height: ${IMAGE_HEIGHT};
  max-width: ${IMAGE_WIDTH};
  margin: 0;

  img {
    min-height: ${IMAGE_HEIGHT};
  }
`

export const ImagePlaceholder = styled(CommonImagePlaceholder)`
  height: ${IMAGE_HEIGHT};
`
