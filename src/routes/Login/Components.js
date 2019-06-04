import styled from 'styled-components'

import CommonTitle from '~/components/common/Title'
import CommonButton from '~/components/common/Button'
import { WHITE, PRIMARY, GRAY_DARK, GRAY_LIGHT } from '~/constants/colors'

export const Container = styled.div`
  align-items: center;
  background: ${GRAY_LIGHT};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
  width: 100%;
`

export const Wrapper = styled.div`
  padding: 2rem;
  background: ${WHITE};
  border-radius: 3px;
  max-width: 390px;
`

export const Form = styled.form`
  width: 100%;
`

export const Title = styled(CommonTitle)`
  font-weight: 400;
  display: block;
  text-align: center;
  font-size: 2.5rem;
  padding-bottom: 4rem;
`

export const InputWrapper = styled.div`
  border-bottom: 2px solid ${GRAY_DARK};
  margin-bottom: 1.5rem;
  position: relative;
  width: 100%;
`

export const Input = styled.input`
  background: transparent;
  border: 0;
  color: ${GRAY_DARK};
  display: block;
  font-size: 1rem;
  height: 52px;
  line-height: 1.2;
  outline: 0;
  padding: 0 5px;
  width: 100%;
`

export const InputUnderline = styled.span`
  display: block;
  height: 100%;
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 100%;

  ${Input}:focus ~ &::before {
    width: 100%;
  }

  ${Input}:focus ~ &::after {
    top: -0.5rem;
    font-size: 0.8rem;
  }

  &::before {
    background: ${PRIMARY};
    bottom: -2px;
    content: '';
    display: block;
    height: 2px;
    left: 0;
    position: absolute;
    transition: all 0.4s;
    width: 0;
  }

  &::after {
    color: ${GRAY_DARK};
    content: attr(data-placeholder);
    display: block;
    font-size: 1rem;
    left: 0px;
    line-height: 1.2;
    padding-left: 0.25rem;
    position: absolute;
    top: 1rem;
    transition: all 0.4s;
    width: 100%;
  }

  ${props =>
    props.hasValue &&
    `
    &::after {
      top: -0.5rem;
      font-size: 0.8rem;
    }
  `}
`

export const Button = styled(CommonButton)`
  font-size: 1rem;
  margin: 0.5rem 0 4rem;
  padding: 1rem 0.5rem;
  width: 100%;
`
