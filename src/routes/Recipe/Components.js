import styled from 'styled-components'

import { GRAY_DARK, GRAY_LIGHT, WHITE, WARNING } from '~/constants/colors'

export const Content = styled.div`
  -webkit-overflow-scrolling: touch;
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-x: hidden;
  overflow: auto;
  padding-bottom: 4rem;
  position: relative;
  width: 100%;
`

export const Wrapper = styled.div`
  width: 100%;
  margin: 4rem auto 0;
  max-width: 1024px;
`

export const Summary = styled.div`
  display: flex;
`

export const SummaryDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 767px) {
    max-width: 480px;
    margin: auto;
    flex-basis: 100%;
    padding: 1.5rem 1rem 0;
    order: 2;
  }
`

export const SummaryPhoto = styled.div`
  flex-basis: 480px;
  flex-grow: 0;
  flex-shrink: 0;
  margin: auto;
  margin-left: 3rem;

  @media (max-width: 767px) {
    text-align: center;
    flex-basis: 100%;
    order: 1;
    margin: auto;
  }
`

export const SummaryItems = styled.div`
  width: 100%;
  margin: 20px auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const SummaryItem = styled.div`
  font-size: 0.8rem;
  line-height: 1.225;
  color: ${GRAY_DARK};
  flex: 1;
  text-align: center;
  text-transform: capitalize;
  padding: 0.25rem 0.5rem;

  span {
    font-size: 1.25rem;
  }

  ${props =>
    props.middle &&
    `
      border-left: 1px solid ${GRAY_DARK};
      border-right: 1px solid ${GRAY_DARK};
  `}
`

export const ImageContainer = styled.div`
  background: ${WHITE};
  border: 1px solid #dbe4e2;
  border-radius: 7px;
  display: inline-block;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 250px;

  img {
    min-height: 250px;
    width: auto;
  }
`

export const Section = styled.section`
  display: block;
  padding: 1rem 0;
`

export const IngredientName = styled.span`
  font-weight: 600;
  text-transform: capitalize;
`

export const Attributes = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

export const AttributeBubble = styled.div`
  align-items: center;
  background: ${WHITE};
  border: 1px solid ${props => (props.important ? WARNING : GRAY_LIGHT)};
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  height: 100px;
  justify-content: center;
  margin: 0 1rem 3rem 0;
  position: relative;
  text-align: center;
  width: 100px;
`

export const AttributeName = styled.div`
  display: block;
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
`

export const AttributeType = styled.div`
  display: block;
  text-align: center;
  font-size: 0.6rem;
  margin-top: 0.25rem;
`

export const AttributeRawValue = styled.span`
  position: absolute;
  top: 110%;
  width: 125%;
  font-size: 0.8rem;
`
