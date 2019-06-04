// @flow
import React from 'react'
import { withNamespaces } from 'react-i18next'
import moment from 'moment'
import isEqual from 'lodash/isEqual'

import type { Menu } from '~/types/menu'
import type { directions } from '~/types/list'
import { formatToDate } from '~/helpers/dates'
import { getDomainPath } from '~/helpers/url'
import { sortItemsBy as sorter } from '~/helpers/list'
import {
  CellSorter,
  ContentEmpty,
  ContentLoading,
  Table,
  TableCell,
  TableHeader,
  TableRow
} from '~/components/common/Table'
import Button from '~/components/common/Button'
import Link from '~/components/common/Link'
import Indicator from '~/components/common/Indicator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

type Props = {
  isFetching: boolean,
  dates: Array<moment>,
  menus: Array<Menu>,
  t: string => string
}

type State = {
  menus: Array<Menu>,
  sortingBy: ?string | ?Array<string>,
  direction: directions
}

export const filteredByDates = (
  items: Array<Menu>,
  [startDate: moment, endDate: moment]: Array<moment>
): Array<Menu> => {
  if (!startDate && !endDate) return items
  return items.filter(
    (item: Menu) => item.dates.from >= startDate && item.dates.from <= endDate
  )
}

class Menus extends React.Component<Props, State> {
  state = {
    menus: this.props.menus,
    mongoMenus: this.props.mongoMenus,
    sortingBy: null,
    direction: null
  }

  componentDidUpdate(prevProps: Props) {
    // if (!isEqual(prevProps.menus, this.props.menus)) {
    //   this.setState({ menus: this.props.menus })
    //   this.setState({ mongoMenus: this.props.mongoMenus })
    // }
  }

  sortItemsBy(key: string | Array<string>) {
    const { direction, menus } = this.state
    const newDirection: directions = direction === 'asc' ? 'desc' : 'asc'

    this.setState({
      sortingBy: key,
      direction: newDirection,
      menus: sorter(key, menus, newDirection)
    })
  }

  render() {
    const { isFetching, t, dates } = this.props
    const [startDate, endDate] = dates
    const { direction, sortingBy } = this.state
    const { menus, mongoMenus = [] } = this.props
    console.log(menus, mongoMenus)
    //eslint-disable-next-line no-console
    console.log('this.props.menus--> ' + JSON.stringify(this.props.menus))
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>
              <CellSorter
                direction={sortingBy === 'status' ? direction : null}
                sort={() => this.sortItemsBy('status')}
              >
                {t('menus.table.header.status')}
              </CellSorter>
            </TableCell>
            <TableCell>
              <CellSorter
                direction={sortingBy === 'siteId' ? direction : null}
                sort={() => this.sortItemsBy('siteId')}
              >
                {t('menus.table.header.siteId')}
              </CellSorter>
            </TableCell>
            <TableCell>
              <CellSorter
                direction={sortingBy === 'description' ? direction : null}
                sort={() => this.sortItemsBy('description')}
              >
                {t('menus.table.header.description')}
              </CellSorter>
            </TableCell>
            <TableCell>
              <CellSorter
                direction={sortingBy === 'concept' ? direction : null}
                sort={() => this.sortItemsBy('concept')}
              >
                {t('menus.table.header.concept')}
              </CellSorter>
            </TableCell>
            <TableCell>
              <CellSorter
                direction={sortingBy === 'reference' ? direction : null}
                sort={() => this.sortItemsBy('reference')}
              >
                {t('menus.table.header.name')}
              </CellSorter>
            </TableCell>
            <TableCell>
              <CellSorter
                direction={
                  isEqual(sortingBy, ['dates', 'from']) ? direction : null
                }
                sort={() => this.sortItemsBy(['dates', 'from'])}
              >
                {t('menus.table.header.dates')}
              </CellSorter>
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHeader>
        {!isFetching && menus.length === 0 && (
          <ContentEmpty text={t('menus.table.isEmpty')} />
        )}
        {isFetching && <ContentLoading cells={4} />}
        {filteredByDates(menus, [startDate, endDate]).map((menu: Menu) => (
          <TableRow key={menu.id}>
            <TableCell>
              <Indicator /> {menu.status}
            </TableCell>
            <TableCell>
              <Link to={`${getDomainPath()}/menus/${menu.id}/planning`}>
                {menu.siteId}
              </Link>
            </TableCell>
            <TableCell>
              <Link to={`${getDomainPath()}/menus/${menu.id}/planning`}>
                {menu.description}
              </Link>
            </TableCell>
            <TableCell>
              <Link to={`${getDomainPath()}/menus/${menu.id}/planning`}>
                {menu.concept}
              </Link>
            </TableCell>
            <TableCell>
              <Link to={`${getDomainPath()}/menus/${menu.id}/planning`}>
                {menu.reference}
              </Link>
            </TableCell>
            <TableCell>
              {formatToDate(menu.dates.from)} / {formatToDate(menu.dates.to)}
            </TableCell>
            <TableCell />
          </TableRow>
        ))}

        {mongoMenus.map((menu: Menu) => (
          <TableRow key={menu.id}>
            <TableCell>
              <Indicator /> {menu.status}
            </TableCell>
            <TableCell>
              <Link to={`${getDomainPath()}/menus/${menu.id}/planning`}>
                {menu.siteId}
              </Link>
            </TableCell>
            <TableCell>
              <Link to={`${getDomainPath()}/menus/${menu.id}/planning`}>
                {menu.description}
              </Link>
            </TableCell>
            <TableCell>
              <Link to={`${getDomainPath()}/menus/${menu.id}/planning`}>
                {menu.concept}
              </Link>
            </TableCell>
            <TableCell>
              <Link to={`${getDomainPath()}/menus/${menu.id}/planning`}>
                {menu.reference}
              </Link>
            </TableCell>
            <TableCell>
              {formatToDate(menu.dates.from)} / {formatToDate(menu.dates.to)}
            </TableCell>
            <TableCell>
              <Button onClick={e => this.props.openDeleteMenu(menu._id.$oid)}>
                <FontAwesomeIcon icon={faTrashAlt} />{' '}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    )
  }
}

export default withNamespaces()(Menus)
