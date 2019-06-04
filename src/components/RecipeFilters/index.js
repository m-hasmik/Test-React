//@flow
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons'

import {
  Categories,
  Category,
  Wrapper as FiltersWrapper,
  ToggleFilters
} from './Components'
import IngredientsFilter from './IngredientsFilter'

type Props = {}

type Filters =
  | 'Ingredients'
  | 'Tastes'
  | 'Diets'
  | 'Allergies'
  | 'Nutrition'
  | null

type State = {
  selectedFilter: Filters
}

class RecipeFilters extends React.Component<Props, State> {
  state = {
    selectedFilter: null
  }

  toggleFilter = (event: Object): void => {
    const { name } = event.target
    this.setState({ selectedFilter: name })
  }

  render() {
    const { selectedFilter } = this.state

    return (
      <React.Fragment>
        <FiltersWrapper>
          <ToggleFilters>
            <FontAwesomeIcon icon={faSlidersH} />
            <span>Filters</span>
          </ToggleFilters>
          <Categories>
            <Category
              role="button"
              aria-label="filter-for-ingredients"
              name="ingredients"
              selected={selectedFilter === 'ingredients'}
              onClick={this.toggleFilter}
            >
              Ingredients
            </Category>
            <Category
              role="button"
              aria-label="filter-for-tastes"
              name="tastes"
              selected={selectedFilter === 'tastes'}
              onClick={this.toggleFilter}
            >
              Tastes
            </Category>
            <Category
              role="button"
              aria-label="filter-for-diets"
              name="diets"
              selected={selectedFilter === 'diets'}
              onClick={this.toggleFilter}
            >
              Diets
            </Category>
            <Category
              role="button"
              aria-label="filter-for-allergies"
              name="allergies"
              selected={selectedFilter === 'allergies'}
              onClick={this.toggleFilter}
            >
              Allergies
            </Category>
            <Category
              role="button"
              aria-label="filter-for-nutrition"
              name="nutrition"
              selected={selectedFilter === 'nutrition'}
              onClick={this.toggleFilter}
            >
              Nutrition
            </Category>
          </Categories>
        </FiltersWrapper>
        {selectedFilter === 'ingredients' && <IngredientsFilter />}
      </React.Fragment>
    )
  }
}

export default RecipeFilters
