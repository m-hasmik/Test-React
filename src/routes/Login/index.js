// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { withNamespaces } from 'react-i18next'

import type { RSAA } from '~/actions/types'
import type { Credentials } from '~/actions/sessions'

import Paragraph from '~/components/common/Paragraph'
import { addSession } from '~/actions/sessions'
import { getDomainPath } from '~/helpers/url'
import {
  Container,
  Form,
  Input,
  InputUnderline,
  InputWrapper,
  Title,
  Button,
  Wrapper
} from './Components'

type Props = {
  addSession: Credentials => RSAA,
  isAuthenticated: boolean,
  t: string => string
}

type State = {
  username: string,
  password: string
}

class SignIn extends React.Component<Props, State> {
  state = {
    username: '',
    password: ''
  }

  handleChange = (event: Object): void => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  onSubmit = (event: Object): void => {
    event.preventDefault()
    const { username, password } = this.state
    if (username && password) {
      this.props.addSession({ username, password })
    }
  }

  render() {
    const { username, password } = this.state
    const { isAuthenticated, t } = this.props

    if (isAuthenticated) {
      return <Redirect to={`${getDomainPath()}/`} />
    }

    return (
      <Container>
        <Wrapper>
          <Title>Menu Planner</Title>
          <Form onSubmit={this.onSubmit}>
            <InputWrapper>
              <Input
                type="text"
                name="username"
                value={username}
                onChange={this.handleChange}
              />
              <InputUnderline
                hasValue={username.length > 0}
                data-placeholder={t('login.inputs.username')}
              />
            </InputWrapper>

            <InputWrapper>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
              <InputUnderline
                hasValue={password.length > 0}
                data-placeholder={t('login.inputs.password')}
              />
            </InputWrapper>
            <Button type="submit" role="button">
              {t('login.inputs.submit')}
            </Button>
            <Paragraph>{t('login.notes')}</Paragraph>
          </Form>
        </Wrapper>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: !!state.session.token || localStorage.getItem('user')
})

const mapDispatchToProps = {
  addSession
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(SignIn))
