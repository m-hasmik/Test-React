// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { withNamespaces } from 'react-i18next'
import {
  faBars,
  faCalendarWeek,
  faCalendarAlt,
  faSearch,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'

import { getDomainPath } from '~/helpers/url'
import type { RSAA } from '~/actions/types'
import { removeSession } from '~/actions/sessions'
import Button from '~/components/common/Button'
import Title from '~/components/common/Title'
import {
  Header,
  Link,
  LinkIcon,
  LinkName,
  Logo,
  activeClassName,
  Toggle,
  Links,
  Sidebar
} from './Components'

type Props = {
  isAuthenticated: boolean,
  isMinimized: boolean,
  removeSession: () => RSAA,
  toggleMenu: () => void,
  t: string => string
}

const AppMenu = ({
  isAuthenticated,
  isMinimized,
  removeSession,
  toggleMenu,
  t
}: Props) => {
  if (!isAuthenticated) {
    return <Redirect to={`${getDomainPath()}/`} />
  }

  return (
    <Sidebar isMinimized={isMinimized}>
      <Header>
        {!isMinimized && (
          <Logo
            src="https://pbs.twimg.com/profile_images/990900237203116032/dHnLeU7r_400x400.jpg"
            alt="Company Logo"
          />
        )}
        {!isMinimized && <Title>{t('app.menu.title')}</Title>}
        <Toggle onClick={toggleMenu} toggled={isMinimized}>
          <FontAwesomeIcon icon={faBars} />
        </Toggle>
      </Header>

      <Links>
        <Link
          activeClassName={activeClassName}
          to={`${getDomainPath()}/`}
          exact
        >
          <LinkIcon>
            <FontAwesomeIcon icon={faSearch} />
          </LinkIcon>
          <LinkName hidden={isMinimized}>
            {t('app.menu.links.recipeSearch')}
          </LinkName>
        </Link>
        <Link activeClassName={activeClassName} to={`${getDomainPath()}/menus`}>
          <LinkIcon>
            <FontAwesomeIcon icon={faCalendarWeek} />
          </LinkIcon>
          <LinkName hidden={isMinimized}>
            {t('app.menu.links.siteMenu')}
          </LinkName>
        </Link>

        <Link
          activeClassName={activeClassName}
          to={`${getDomainPath()}/centralMenu`}
        >
          <LinkIcon>
            <FontAwesomeIcon icon={faCalendarAlt} />
          </LinkIcon>
          <LinkName hidden={isMinimized}>
            {t('app.menu.links.centralMenu')}
          </LinkName>
        </Link>
      </Links>

      <Button onClick={removeSession} role="button">
        {isMinimized ? (
          <FontAwesomeIcon icon={faSignOutAlt} />
        ) : (
          <span>{t('app.menu.buttons.logOut')}</span>
        )}
      </Button>
    </Sidebar>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: !!state.session.token || localStorage.getItem('user')
})

const mapDispatchToProps = {
  removeSession
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(AppMenu))
