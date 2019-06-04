import React from 'react'
import axios from 'axios'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import MenuStructureConditionsV2 from './MenuStructureConditionsV2'
import GenericConditions from './GenericConditions'
import CentralPlanningV2 from './CentralPlanningV2'
import Button from '~/components/common/Button'


type Props = {}
export default class CreateMenuFormV2 extends React.Component<Props> {
  state = {
    tabIndex: 0,
    menuStructureDone: false,
    menu: {}
  }

  componentDidMount() {
    console.log(this.props)
    this.loadMenu(this.props.menuId)
  }

  onSubmitCreatePlan = (e: Event) => {
    e.preventDefault()
  }

  handleNext = data => {



    axios({
      method: 'POST',
      url:
        'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/stitchmatrix-mtxou/service/StitchPostService/incoming_webhook/updateMenu',
      params: {
        secret: 'test'
      },
      data: {
        id: this.props.menuId,
        ...this.state.menu,
        ...data
      }
    }).then(res => {
      this.setState({
        menu: {
          ...this.state.menu,
          ...data
        },
        tabIndex: this.state.tabIndex !== 2 ?  this.state.tabIndex + 1 : 2
      })
    })
  }

  handlePrev = () => {
    this.setState({ tabIndex: this.state.tabIndex - 1 })
  }
    handleNextStep = () => {
      this.setState({ tabIndex: this.state.tabIndex + 1 })
    }

  setMenuStructureDone = (value, menuStructure) => {
    this.setState({ menuStructureDone: value })
  }

  loadMenu = id => {
    axios({
      method: 'GET',
      url:
        'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/stitchmatrix-mtxou/service/StitchGetService/incoming_webhook/getMenu',
      params: {
        id: id
      }
    }).then(res => {
      this.setState({ menu: res.data })
    })
  }

  render() {
    return (
      <React.Fragment>
        <Tabs
          selectedIndex={this.state.tabIndex}
          onSelect={tabIndex => this.setState({ tabIndex })}
        >
          <TabList>
            <Tab disabled>Menu Structure Conditions</Tab>
            <Tab disabled>Generic Conditions</Tab>
            <Tab disabled>Central Menu Planning</Tab>
          </TabList>
          <TabPanel>
            <h2> Menu Structure </h2>
            <MenuStructureConditionsV2
              handleNext={this.handleNext}
              menuStructure={this.state.menu.menuStructure}
              setMenuStructureDone={this.setMenuStructureDone}
            />
          </TabPanel>
          <TabPanel>
            <h2>Generic Conditions</h2>
            <Button style={{ float: 'right' }} onClick={this.handleNextStep}>
                Next
            </Button>
            <Button style={{ float: 'right' }} onClick={this.handlePrev}>
              Prev
            </Button>
            <GenericConditions
              conditions={this.state.menu.conditions || []}
              menuId={this.state.menu._id ? this.state.menu._id.$oid : null}
              loadMenu={this.loadMenu}
            />
          </TabPanel>
          <TabPanel>
              <h2>Central Menu Planning</h2>
              <CentralPlanningV2
                  centralPlan={this.state.menu.menuStructure}
                  handlePrev={this.handlePrev}
                  handleNext={this.handleNext}
              />
          </TabPanel>
        </Tabs>
      </React.Fragment>
    )
  }
}
