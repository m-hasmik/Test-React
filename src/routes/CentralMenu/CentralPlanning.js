//@flow
import React from 'react'
import { RowContainer, DayTypeTitleContainer } from './Components'
import styled from 'styled-components'
import { GRAY_LIGHT } from '~/constants/colors'
import Navigation from './Navigation.js'
import type { CentralPlanningType, WeekDays } from '~/types/centralPlanning'
import RecipeMenu from '~/components/RecipeMenu';
import { startRecipeSearch, closeRecipeSearch } from '~/actions/plan'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import Modal from '~/components/common/Modal'
import Search from '~/routes/Search'
import type { RSAA } from '~/actions/types'
import Planner from '~/components/Planner'

export const HeaderCellsContainer = styled.div`
  text-align: center;
  display: flex;
`

export const HeaderCell = styled.div`
  margin-right: 2px;
  padding: 0.5rem 0;
  background-color: ${GRAY_LIGHT};
`

const weekDays = [
  {
    label: 1,
    value: 'Monday'
  },
  {
    label: 2,
    value: 'Tuesday'
  },
  {
    label: 3,
    value: 'Wednesday'
  },
  {
    label: 4,
    value: 'Thursday'
  },
  {
    label: 5,
    value: 'Friday'
  },
  {
    label: 6,
    value: 'Saturday'
  },
  {
    label: 7,
    value: 'Sunday'
  }
]

type Props = {
  addRecipesToMenu: () => RSAA,
  children: any,
  onToggle: boolean => void,
  schedule: number,
  group: number,
  menuId: string,
  t: string => string,
  toggleRecipeSearch: Object => RSAA,
  currentRecipeData: Array<mixed>
}

type State = {
  allDishes: Array<CentralPlanningType>,
  weekDaysArr: Array<WeekDays>
}
let dishes = []
class CentralPlanning extends React.Component<Props, State> {
  state = {
    allDishes: [],
    weekDaysArr: [],
    currentRecipeData: []
  }

  componentDidMount() {
    dishes = localStorage.getItem('allDishes')
      ? JSON.parse(localStorage.getItem('allDishes') || '{}')
      : []
    this.setState({ allDishes: dishes })
    dishes[0] ? this.setState({ weekDaysArr: dishes[0].weeks[0].weekDays }) : []
  }
  toggleRecipeSearch = (dishIndex, dayIndex) => {
    const { toggleRecipeSearch } = this.props
    
    toggleRecipeSearch()
  }

  //Functionality yet to be written for following functions
  setNextWeekDay = () => {}
  setPreviousWeekDay = () => {}
  handleViewFilters = () => {}
  addRecipesToMenu = (data, dishIndex, dayIndex) => {
    console.log(data)
    console.log(this.state.allDishes)
    let UpdatedAllDishes = this.state.allDishes;
    let UpdatedDay = UpdatedAllDishes[dishIndex].weeks[0].weekDays[dayIndex];
    UpdatedDay.value.recipes = UpdatedDay.value.recipes.concat(data);
    UpdatedAllDishes[dishIndex].weeks[0].weekDays[dayIndex] = UpdatedDay
    this.setState({allDishes: UpdatedAllDishes})
  }

  render() {
    const { addRecipesToMenu } = this.props

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Navigation
          setPrevious={this.setPreviousWeekDay}
          setNext={this.setNextWeekDay}
          onChange={this.handleViewFilters}
        />
        <HeaderCellsContainer>
          {weekDays.map((i, idx) => (
            <HeaderCell key={`weekDays${idx}`} style={{ flex: 1 }}>
              <div style={{ width: '100%' }}>{i.value}</div>
            </HeaderCell>
          ))}
        </HeaderCellsContainer>

        {this.state.allDishes.map((item, dishIndex) => {
          return (
            <RowContainer key={`${item.dishName}`}>
              {item.weeks[0].weekDays.map((i, idx) => {
                let array = []
                // for (let index = 0; index < i.value.max; index++) {
                  array.push(
                    <div style={{ padding: '0px', margin: '1px' }}>
                      <span
                        style={{
                          border: '1px solid gray',
                          padding: '8px',
                          width: '100%',
                          display: 'block',
                          textAlign: 'center'
                        }}
                      >
                        <Modal
                          triggerText={'add recipe'}
                          onToggle={() => this.toggleRecipeSearch(dishIndex, idx)}
                        >
                          {({ toggleProps }) => {
                            return (
                              <Search
                                onModal
                                finishSearch={toggleProps.onClick}
                                onSearchFinish={(data) => {this.addRecipesToMenu(data, dishIndex, idx)}}
                              />
                            )
                          }}
                        </Modal>
                        {i.value.recipes.map(data => { 
                          return <RecipeMenu {...data} />
                        })}
                      </span>
                    </div>
                  )
                // }
                return (
                  <div
                    key={`weeks-${idx}`}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1
                    }}
                  >
                    <DayTypeTitleContainer>
                      <p> {item.dishName} </p>
                    </DayTypeTitleContainer>
                    {array.map(i => i)}
                  </div>
                )
              })}
            </RowContainer>
          )
        })}
      </div>
    )
  }
}

const mapDispatchToProps = {
  toggleRecipeSearch: startRecipeSearch,
  addRecipesToMenu: closeRecipeSearch
}

export default connect(
  null,
  mapDispatchToProps
)(withNamespaces()(CentralPlanning))
