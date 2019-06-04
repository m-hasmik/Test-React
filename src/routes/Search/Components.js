import styled from 'styled-components'

import Button from '~/components/common/Button'
import Card from '~/components/common/Card'
import CommonSidebar from '~/components/Sidebar'
import { SUPPLEMENT } from '~/constants/colors'

export const Container = styled.div`
  display: flex;
  flex-direction: ${props => (props.onModal ? 'column' : 'row')};
  width: 100%;
`

export const Content = styled.div`
  -webkit-overflow-scrolling: touch;
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-x: hidden;
  overflow: auto;
  position: relative;
  width: calc(100% - ${props => (props.onModal ? '0px' : '200px')});
`

export const Elements = styled.div`
  padding: 0 0 60px;
  width: 100%;
`

export const FiltersHeader = styled.div`
  background-image: url('https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
`

export const RecipesWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`

export const SelectedRecipes = styled(CommonSidebar)`
  bottom: 0;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  height: 60px;
  left: auto;
  overflow-x: auto;
  overflow-y: hidden;
  position: ${props => (props.onModal ? 'relative' : 'fixed')};
  right: 0;
  transform: ${props => {
    if (!props.display && props.onModal) return 'translate3d(0, 0, 0)'
    if (!props.display && !props.onModal) return 'translate3d(0, 60px, 0)'
    if (props.display) return 'translate3d(0, 0, 0)'
  }};
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  top: auto;
  width: calc(100% - ${props => (props.onModal ? '0px' : '300px')});
  z-index: 10;
`

export const SelectedRecipe = styled(Card)`
  display: flex;
  flex: 0 0 auto;
  justify-content: center;
  margin: 0;
  padding: 0;
  width: 20rem;
`

export const CardContent = styled.div`
  align-items: center;
  display: flex;
  margin: 0;
  padding: 0.5rem;

  > h2 {
    margin: 0;
    overflow: hidden;
    padding-right: 1rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 250px;
  }
`

export const RemoveButton = styled(Button)`
  border-color: ${SUPPLEMENT};
  background: ${SUPPLEMENT};

  &:hover {
    background: ${SUPPLEMENT};
  }
`

export const AddRecipes = styled(Button)`
  min-width: 120px;
`
