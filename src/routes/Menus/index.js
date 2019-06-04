// @flow
import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import moment from 'moment'
import axios from 'axios'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal'

import type { Menu } from '~/types/menu'
import type { RSAA } from '~/actions/types'
import { loadMenus, loadMongoMenus } from '~/actions/menus'
import { loadCentralMenusSAP } from '~/actions/centralMenus'
import { isInclusivelyAfterDay } from '~/helpers/dates'
import DateRangePicker from '~/components/common/DateRangePicker'
import Title from '~/components/common/Title'
import Card from '~/components/common/Card'
import Small from '~/components/common/Small'
import Button from '~/components/common/Button'

import {
  Content,
  Filters,
  Header,
  Wrapper,
  ModalSmallCustomStyles,
  FlexWrapper,
  FlexContainer,
  InputField
} from './Components'
import TableView from './Menus'
import CreateMenuForm from './CreateMenuForm'
type Props = {
  loadMenus: () => RSAA,
  isFetching: boolean,
  menus: Array<Menu>,
  t: string => string
}

type State = {
  startDate: ?moment,
  endDate: ?moment,
  focusedInput: ?string
}

class Menus extends React.Component<Props, State> {
  state = {
    startDate: null,
    endDate: null,
    focusedInput: null,
    openCreateMenu: false
  }

  componentDidMount() {
    this.props.loadMenus()
    this.props.loadMongoMenus()
  }

  handleOpenModal = () => {
    this.props.loadCentralMenusSAP()
    this.setState({ openCreateMenu: true })
  }

  handleCloseModal = () => {
    this.setState({ openCreateMenu: false })
  }

  openDeleteMenu = menuId => {
    console.log(menuId)
    this.setState({ openDeleteMenu: true, deleteMenuId: menuId })
  }

  closeDeleteMenu = () => {
    this.setState({ openDeleteMenu: false })
  }

  deleteMenu = () => {
    console.log(this.state.deleteMenuId)
    axios({
      method: 'delete',
      // url: conditionHeaderUrl,
      params: {
        secret: 'test',
        id: this.state.deleteMenuId
      },
      url:
        'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/stitchmatrix-mtxou/service/StitchPostService/incoming_webhook/DeleteSite'
    }).then(() => {
      this.props.loadMongoMenus()
      this.closeDeleteMenu()
    })
  }

  handleSubmitModal = menu => {
    axios({
      method: 'post',
      url:
        'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/stitchmatrix-mtxou/service/StitchPostService/incoming_webhook/CreateSite',
      params: {
        secret: 'test'
      },
      data: menu
    })
      .then(response => {
        console.log('response status--> ' + response.status)
        console.log(response)
        this.props.loadMenus()
        this.props.loadMongoMenus()
        this.setState({ openCreateMenu: false })
      })
      .catch(error => {
        return { data: error.message, error }
      })
  }

  render() {
    const { isFetching, menus, mongoMenus, t } = this.props
    const { endDate, focusedInput, startDate } = this.state
    const sortedMenus = sortBy(menus, o => o.dates.from)
    const [minStartDate, maxStartDate] = [
      moment(get(sortedMenus[0], 'dates.from')),
      moment(get(sortedMenus[sortedMenus.length - 1], 'dates.from'))
    ]

    return (
      <Content>
        <Header>
          <Title>{t('menus.title')}</Title>
        </Header>
        <Wrapper>
          <Card>
            <Filters>
              <div style={{ width: '100%' }}>
                <Button
                  onClick={this.handleOpenModal}
                  style={{ float: 'left' }}
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    style={{ marginLeft: '.25em' }}
                  />
                  {'Create New Menu'}
                </Button>
                <div style={{ float: 'right' }}>
                  <DateRangePicker
                    startDate={startDate}
                    startDateId="menus_start_date_range"
                    endDate={endDate}
                    endDateId="menus_end_date_range"
                    onDatesChange={({ startDate, endDate }) =>
                      this.setState({ startDate, endDate })
                    }
                    focusedInput={focusedInput}
                    onFocusChange={focusedInput =>
                      this.setState({ focusedInput })
                    }
                    showClearDates
                    isOutsideRange={day =>
                      !isInclusivelyAfterDay(
                        day,
                        minStartDate || isInclusivelyAfterDay(day, maxStartDate)
                      )
                    }
                  />
                  <Small>{t('menus.filters.dates')}</Small>
                </div>
              </div>
            </Filters>
            <TableView
              menus={menus}
              mongoMenus={mongoMenus}
              isFetching={isFetching}
              dates={[startDate, endDate]}
              openDeleteMenu={this.openDeleteMenu}
              closeDeleteMenu={this.closeDeleteMenu}
            />
          </Card>
        </Wrapper>
        <Modal
          style={ModalSmallCustomStyles}
          isOpen={this.state.openCreateMenu}
          contentLabel="Detailed View"
          ariaHideApp={false}
        >
          <FlexWrapper>
            <FlexContainer>
              <Title style={{ paddingLeft: '4em' }}>{'Create New Menu'}</Title>
            </FlexContainer>
            <Button onClick={this.handleCloseModal}>
              <FontAwesomeIcon icon={faTimes} style={{ marginLeft: '.25em' }} />
              {'Close'}
            </Button>
          </FlexWrapper>
          <CreateMenuForm
            centralMenus={this.props.centralMenus}
            handleSubmitModal={this.handleSubmitModal}
          />
        </Modal>
        <Modal
          style={ModalSmallCustomStyles}
          isOpen={this.state.openDeleteMenu}
          contentLabel="Delete Menu"
          ariaHideApp={false}
        >
          <p style={{ margin: '30px 0' }}>
            Are you sure you want to delete this item?
          </p>
          <div style={{ textAlign: 'center' }}>
            <Button onClick={this.deleteMenu}>Delete</Button>
            <Button onClick={this.closeDeleteMenu}>{'Cancel'}</Button>
          </div>
        </Modal>
      </Content>
    )
  }
}

const mapStateToProps = state => ({
  mongoMenus: state.menus.availableMongo,
  menus: state.menus.available,
  centralMenus: state.centralMenus.available,
  isFetching: state.menus.isFetching
})

const mapDispatchToProps = {
  loadMenus,
  loadMongoMenus,
  loadCentralMenusSAP
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(Menus))
