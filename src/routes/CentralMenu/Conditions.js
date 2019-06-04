import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import MenuStructureConditions from './MenuStructureConditions'
import GenericConditions from './GenericConditions'
import Button from '~/components/common/Button'
import CentralPlanningV2 from './CentralPlanningV2'

type Props = {}
export default class CreateMenuForm extends React.Component<Props> {
  state = {
    tabIndex: 0,
    menuStructureDone: false
  }

  onSubmitCreatePlan = (e: Event) => {
    e.preventDefault()
    // window.location.href = '/centralPlanning'
  }

  handleNext = () => {
    this.setState({tabIndex: this.state.tabIndex + 1})
  }

  handlePrev = () => {
    this.setState({tabIndex: this.state.tabIndex - 1})
  }

  setMenuStructureDone = (value) => {
    console.log(value)
    this.setState({menuStructureDone: value});
  }

  render() {
    return (
      <React.Fragment>
        <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
          <TabList>
            <Tab disabled>Menu Structure Conditions</Tab>
            <Tab disabled>Central Menu Planning</Tab>
            <Tab disabled>Generic Conditions</Tab>
          </TabList>

          <TabPanel>
            <h2> Menu Structure </h2>
            <Button style={{float: "right"}} onClick={this.handleNext}>Next</Button>
            <br />
            <MenuStructureConditions setMenuStructureDone={this.setMenuStructureDone}/>
          </TabPanel>
          <TabPanel>
            <h2>Central Menu Planning</h2>
            {/* <div style={{float: "right"}}>
              <Button onClick={this.handlePrev}>Prev</Button>
              <Button onClick={this.handleNext}>Next</Button>
            </div> */}
            <CentralPlanningV2 handleNext={this.handleNext} handlePrev={this.handlePrev}/>
          </TabPanel>
          <TabPanel>
            <h2>Generic Conditions</h2>
            <Button style={{float: "right"}} onClick={this.handlePrev}>Prev</Button>
            <GenericConditions />
          </TabPanel>
        </Tabs>
      </React.Fragment>
    )
  }
}
