import styled from 'styled-components'

import { SUCCESS } from '~/constants/colors'
import CommonButton from '~/components/common/Button'

export const AddedRecipeView = styled(CommonButton)`
  pointer-events: none;
  background-color: ${SUCCESS};
  border-color: ${SUCCESS};
`
