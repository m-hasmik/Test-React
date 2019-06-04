//@flow
import React from 'react'

import SearchBar from '~/components/common/Search'
import { Wrapper as FilterWrapper } from './Components'

type Props = {}

class IngredientsFilter extends React.Component<Props> {
  render() {
    return (
      <FilterWrapper>
        <SearchBar suggestions={[]} placeholder="With Ingredients" />
        <SearchBar suggestions={[]} placeholder="Without Ingredients" />
      </FilterWrapper>
    )
  }
}

export default IngredientsFilter
