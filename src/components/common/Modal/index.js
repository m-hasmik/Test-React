// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { rgba } from 'polished'

import Button from '~/components/common/Button'
import Card from '~/components/common/Card'
import { BLACK } from '~/constants/colors'

const Cover = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9998; // This must be at a higher index to the rest of your page content
  transform: translateZ(0);
  background-color: ${rgba(BLACK, 0.15)};
`

const Wrapper = styled(Card)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 10px 3px ${rgba(BLACK, 0.1)};
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  z-index: 9999;

  @media screen and (min-width: 500px) {
    height: 100%;
    left: 50%;
    max-height: calc(100% - 1em);
    max-width: 90%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`

const Content = styled.div``

type Props = {
  children: any,
  triggerText: string,
  onToggle: boolean => void
}

type State = {
  isOpen: boolean
}

const ModalElement = ({ children }: { children: any }) => {
  if (!document.body) return null
  return ReactDOM.createPortal(
    <Cover>
      <Wrapper>
        <Content>{children}</Content>
      </Wrapper>
    </Cover>,
    document.body
  )
}

class Modal extends React.Component<Props, State> {
  state = {
    isOpen: false
  }

  toggle = () =>
    this.setState(
      ({ isOpen }) => ({ isOpen: !isOpen }),
      () => this.props.onToggle(this.state.isOpen)
    )

  getStateAndHelpers() {
    return {
      isOpen: this.state.isOpen,
      toggle: this.toggle,
      toggleProps: {
        'aria-pressed': this.state.isOpen,
        onClick: this.toggle
      }
    }
  }

  render() {
    const { children, triggerText } = this.props
    const { isOpen } = this.state

    return (
      <>
        <Button role="button" onClick={this.toggle} style={{width: '100%'}}>
          {triggerText}
        </Button>
        {isOpen && (
          <ModalElement>{children(this.getStateAndHelpers())}</ModalElement>
        )}
      </>
    )
  }
}

export default Modal
