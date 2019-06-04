// @flow
import React from 'react'
import { withNamespaces } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExport } from '@fortawesome/free-solid-svg-icons'

import {
  INSTRUCTIONS_TEMPLATE,
  WEEKLY_MENU_TEMPLATE
} from '~/routes/Print/constants'
import { ButtonLink } from '~/components/common/Button'
import { getDomainPath } from '~/helpers/url'
import { PageHeader } from '~/components/Page'

type Props = {
  t: string => string,
  id: string
}

const Header = ({ t, id }: Props) => (
  <PageHeader
    actions={
      <React.Fragment>
        <ButtonLink
          to={`${getDomainPath()}/menu/${id}/print?template=${WEEKLY_MENU_TEMPLATE}`}
        >
          <FontAwesomeIcon icon={faFileExport} />
          {t('planning.header.actions.export.consumers')}
        </ButtonLink>
        <ButtonLink
          to={`${getDomainPath()}/menu/${id}/print?template=${INSTRUCTIONS_TEMPLATE}`}
        >
          <FontAwesomeIcon icon={faFileExport} />
          {t('planning.header.actions.export.chefs')}
        </ButtonLink>
      </React.Fragment>
    }
    title={t('planning.title')}
  />
)

export default withNamespaces()(Header)
