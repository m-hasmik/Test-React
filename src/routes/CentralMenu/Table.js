//@flow
import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Modal from 'react-modal'

import { GRAY_MEDIUM, PRIMARY } from '~/constants/colors'
import type { CentralMenu } from '~/types/centralMenu'
import isEqual from 'lodash/isEqual'
import Button from '~/components/common/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'

import { ModalSmallCustomStyles } from './Components'

const RowStyles = `
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    padding:1rem;
    border-bottom: 1px solid ${GRAY_MEDIUM};  
`

export const HeaderContainer = styled.div`
  ${RowStyles}
`

export const RowContainer = styled.div`
    ${RowStyles}
    color:${PRIMARY};
     &:hover{
        background-color:${GRAY_MEDIUM};
    }
`

export const RowCell = styled.div`
  flex: 1;
  cursor: pointer;
`

export const HeaderCell = styled.div`
  flex: 1;
`

export const MenuHeader = () => {
  return (
    <HeaderContainer>
      <HeaderCell> Plan Name </HeaderCell>
      <HeaderCell> Menu ID</HeaderCell>
      <HeaderCell> Period </HeaderCell>
      <HeaderCell>Sector </HeaderCell>
      <HeaderCell>Day Part </HeaderCell>
      <HeaderCell>Action </HeaderCell>
    </HeaderContainer>
  )
}

type MenuRowProps = {
  centralMenus: Array<CentralMenu>
}

type State = {
  centralMenus: Array<CentralMenu>
}

export default class MenuRow extends React.Component<MenuRowProps, State> {
  state = {
    centralMenus: this.props.centralMenus,
    openDeleteMenu: false
  }

  deleteMenu = id => {
    axios({
      method: 'delete',
      // url: conditionHeaderUrl,
      params: {
        secret: 'test',
        id: this.state.deleteMenuId
      },
      url:
        'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/stitchmatrix-mtxou/service/StitchPostService/incoming_webhook/deleteMenu'
    }).then(() => {
      this.props.reloadMenus()
      this.closeDeleteMenu()
    })
  }

  componentDidUpdate(prevProps: MenuRowProps) {
    if (!isEqual(prevProps.centralMenus, this.props.centralMenus)) {
      this.setState({ centralMenus: this.props.centralMenus })
    }
  }

  openDeleteMenu = menuId => {
    console.log(menuId)
    this.setState({ openDeleteMenu: true, deleteMenuId: menuId })
  }

  closeDeleteMenu = () => {
    this.setState({ openDeleteMenu: false })
  }

  render() {
    const centralMenusArr = this.state.centralMenus
    const RowData: Array<any> = centralMenusArr.map((i, idx) => {
      return (
        // <RowContainer key={`${i.MenuID}-${idx}`}>
        //   <RowCell> {i.MenuDescription} </RowCell>
        //   <RowCell>{i.MenuID}</RowCell>
        //   <RowCell> {i.Duration} </RowCell>
        //   <RowCell>{i.Sector} </RowCell>
        //   <RowCell>{i.DayPart}</RowCell>
        //   <RowCell style={{ color: 'red' }}>
        //     {' '}
        //     <FontAwesomeIcon icon={faTrashAlt} />{' '}
        //   </RowCell>
        // </RowContainer>
        <RowContainer key={`${i._id.$oid}-${idx}`}>
          <RowCell> {i.Description} </RowCell>
          <RowCell>{i._id.$oid}</RowCell>
          <RowCell> {i.cycle_Text} </RowCell>
          <RowCell>{i.sector} </RowCell>
          <RowCell>{i.dayPart}</RowCell>
          <RowCell>
            {' '}
            <Button
              onClick={() => {
                return this.props.viewMenu(i._id.$oid)
              }}
            >
              <FontAwesomeIcon icon={faEdit} />{' '}
            </Button>
            <Button onClick={e => this.openDeleteMenu(i._id.$oid)}>
              <FontAwesomeIcon icon={faTrashAlt} />{' '}
            </Button>
          </RowCell>
        </RowContainer>
      )
    })
    return (
      <React.Fragment>
        {RowData}
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
      </React.Fragment>
    )
  }
}
