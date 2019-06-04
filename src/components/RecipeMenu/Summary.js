import styled from 'styled-components'
import { hsl, parseToHsl } from 'polished'

import { LinkButton } from '~/components/common/Link'
import { WHITE, WARNING } from '~/constants/colors'
import { SummaryAction as RecipeSummaryAction } from '../Recipe/Summary'
import Button from '~/components/common/Button'

export const SummaryAction = styled(RecipeSummaryAction)`
  justify-content: center;
  flex-direction: row;
  padding: 0.25rem 0 0;

  ${LinkButton} {
    flex: 1;
  }
`

export const RemoveButton = styled(Button)`
  border-color: ${WARNING};
  background: ${WHITE};
  color: ${hsl({
    ...parseToHsl(WARNING),
    saturation: 0.7,
    lightness: 0.55
  })};
  padding: 0.3rem 1rem 0.3rem 1.2rem;
  border: none;

  &:hover {
    background: ${WARNING};
    color: ${WHITE};
  }
`
