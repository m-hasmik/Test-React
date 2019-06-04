//@flow
import React from 'react'

import { setAxiosInterceptors } from '~/helpers/authentication'

type Props = {
  token: string,
  children: any
}

type State = {
  isMenuMinimized: boolean
}

class AuthContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    setAxiosInterceptors(this.props.token)
  }

  state = {
    isMenuMinimized: false
  }

  toggleMenu = () => {
    this.setState((prevState: State) => ({
      isMenuMinimized: !prevState.isMenuMinimized
    }))
  }

  render() {
    return this.props.children({
      isMenuMinimized: this.state.isMenuMinimized,
      toggleMenu: this.toggleMenu
    })
  }
}

export default AuthContainer
