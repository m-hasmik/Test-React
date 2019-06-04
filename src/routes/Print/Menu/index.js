// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Loader from '~/components/common/Loader'
import Header from '~/components/common/Header'
import Title from '~/components/common/Title'
import type { Entities } from '~/types/prints'
import type { Planning } from '~/types/plan'
import { getDomainPath } from '~/helpers/url'
import { formatToWeekday } from '~/helpers/dates'
import type { RSAA } from '~/actions/types'
import { getRecipeIds } from '~/helpers/menu'

import { loadPrinterData } from '~/actions/printer'
import { Day } from './Day'
import { TimeBlock } from './TimeBlock'
import { Template } from './Template'
import { Recipe } from './Recipe'
import { TemplateOption, TemplateChooser } from './TemplateChooser'
import Footer from './Footer'

type Props = {
  ids: Array<string>,
  isFetching: boolean,
  planning: Planning,
  loadPrinterData: (Entities, Array<string>) => RSAA,
  template: string
}

type State = {
  selectedTheme: string
}

class Menu extends React.Component<Props, State> {
  componentDidMount() {
    this.props.loadPrinterData('menu', this.props.ids)
  }

  state = {
    selectedTheme: 'theme_one'
  }

  // toggleTheme = theme => this.setState({ selectedTheme: theme })
  toggleTheme = theme => {
    let themes = {
      theme_one: `
      .printarea > *, small, h2, div, p, span{
        background-color: #000000 !important;
        color: #FFFFFF !important;
      }

      `,
      theme_two: `
      .printarea > *, small, h2, div, p, span{
        background-color: #FFFFFF !important;
        color: #000000 !important;
      }
      `
    }
    var css = `
    @page { 
      size: portrait; 
      margin: 0; 
    }
    body {
      -webkit-print-color-adjust: exact !important;
    }
    
    ${themes[theme]}

    .printbutton {
      display: none;
    }`,
      head = document.head || document.getElementsByTagName('head')[0],
      style = document.createElement('style')

    style.type = 'text/css'
    style.media = 'print'

    if (style.styleSheet) {
      style.styleSheet.cssText = css
    } else {
      style.appendChild(document.createTextNode(css))
    }

    head.appendChild(style)
    console.log(style)
    window.print()
  }
  render() {
    const { isFetching, template, planning } = this.props
    const { selectedTheme } = this.state
    if (
      !isFetching &&
      !Array.isArray(planning) &&
      Object.keys(planning).length === 0
    )
      return <Redirect to={`${getDomainPath()}/menus`} />
    if (isFetching || Array.isArray(planning)) return <Loader />
    let sortedPlanning = _.sortBy(Object.keys(planning), function(dateObj) {
      return new Date(dateObj)
    })
    return (
      <React.Fragment>
        <TemplateChooser>
          <TemplateOption
            className="printbutton"
            onClick={() => this.toggleTheme('theme_one')}
          >
            Theme 1
          </TemplateOption>
          <TemplateOption
            className="printbutton"
            onClick={() => this.toggleTheme('theme_two')}
          >
            Theme 2
          </TemplateOption>
        </TemplateChooser>
        <Template className="printarea">
          {sortedPlanning.map(day => {
            return (
              <Day className="printarea" key={day}>
                <Title className="printarea">{formatToWeekday(day)}</Title>
                {Object.keys(planning[day]).map(block => (
                  <TimeBlock key={`${day}-${block}`} theme={selectedTheme}>
                    <Header className="printarea">{block}</Header>
                    {planning[day][block].map(recipe => (
                      // $FlowFixMe
                      <Recipe
                        key={recipe.plan.menuUUID}
                        template={template}
                        {...recipe}
                      />
                    ))}
                  </TimeBlock>
                ))}
              </Day>
            )
          })}
        </Template>
        <Footer />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  ids: Array.isArray(state.printer.data) && getRecipeIds(state.printer.data),
  planning: state.printer.data,
  isFetching: state.printer.isFetching
})

const mapDispatchToProps = {
  loadPrinterData
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)
