jest.mock('react-i18next', () => ({
  withNamespaces: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: key => key }
    return Component
  }
}))

import React from 'react'
import { cleanup, render, waitForElement } from 'react-testing-library'

import Element from './EmptySchedule'

const renderComponent = props => render(<Element {...props} />)

describe('<Element /> shallow', () => {
  afterEach(cleanup)

  it('contains empty schedule text', () => {
    const { getByText } = renderComponent()

    waitForElement(() => getByText(/planning.empty.schedule/i))
    expect(getByText('planning.empty.schedule')).toBeInTheDocument()
  })

  it('matches the snapshot', () => {
    const { container } = renderComponent()
    expect(container).toMatchSnapshot()
  })
})
