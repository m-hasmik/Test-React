// @flow
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { getDomainPath } from '~/helpers/url'
import AuthContainer from './AuthContainer'
import AppMenu from './AppMenu'
import { Content } from './Components'

type Props = {
  component: any,
  location: string
}

export const PrivateRoute = ({ component: Component, ...rest }: Props) => {
  const AUTH_TOKEN: string = localStorage.getItem('user') || ''
  return (
    <Route
      {...rest}
      render={props =>
        AUTH_TOKEN ? (
          <AuthContainer token={JSON.parse(AUTH_TOKEN)}>
            {({ isMenuMinimized, toggleMenu }) => (
              <React.Fragment>
                <AppMenu
                  isMinimized={isMenuMinimized}
                  toggleMenu={toggleMenu}
                />
                <Content isMenuMinimized={isMenuMinimized}>
                  <Component {...props} />
                </Content>
              </React.Fragment>
            )}
          </AuthContainer>
        ) : (
          <Redirect
            to={{
              pathname: `${getDomainPath()}/login`,
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}
