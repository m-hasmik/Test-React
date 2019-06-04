// @flow
import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest'
import debounce from 'lodash/debounce'

import { Suggestions, Suggestion } from './types'
import { getDomainPath } from '~/helpers/url'
import RecipesAPI from '~/api/recipes'
import { SuggestionItem, Wrapper } from './Components'

type Props = {
  onBlur?: string => void,
  onChange?: string => void,
  placeholder?: string,
  type?: string,
  value?: string,
  suggestions: Suggestions
}

type State = {
  value: string,
  suggestions: Suggestions
}

const getSuggestions = (value: string, suggestions: Suggestions) => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length
  const pattern = new RegExp(inputValue, 'gi')

  if (inputLength === 0) return []
  return suggestions.filter(suggestion =>
    suggestion.name.toLowerCase().match(pattern)
  )
}

const getSuggestionValue = (suggestion: Suggestion): string => suggestion.name

const renderSuggestion = suggestion => (
  <SuggestionItem to={`${getDomainPath()}recipes/${suggestion.recipeUUID}`}>
    {suggestion.name}
  </SuggestionItem>
)

class Search extends Component<Props, State> {
  state = {
    value: '',
    suggestions: []
  }

  componentDidMount() {
    this.setState({ suggestions: this.props.suggestions })
  }

  onChange = (event: Object, { newValue }: Object) => {
    this.setState({ value: newValue }, () => {
      this.props.onChange && this.props.onChange(newValue)
    })
  }

  onSuggestionsFetchRequested = async (value: string) => {
    const newSuggestions = await RecipesAPI.get()

    this.setState({
      suggestions: getSuggestions(value, newSuggestions.data)
    })
  }

  debouncedRequest = debounce(
    ({ value }: Object) => this.onSuggestionsFetchRequested(value),
    300
  )

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] })
  }

  render() {
    const { suggestions, value } = this.state
    const inputProps = {
      placeholder: this.props.placeholder,
      value,
      onChange: this.onChange
    }

    return (
      <Wrapper>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.debouncedRequest}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </Wrapper>
    )
  }
}

export default Search
