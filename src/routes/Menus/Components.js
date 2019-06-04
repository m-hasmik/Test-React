import styled from 'styled-components'
import React from 'react'
import { WHITE, BLACK, GRAY_MEDIUM_DARK, GRAY_LIGHT } from '~/constants/colors'
import Card from '~/components/common/Card'
import Title from '~/components/common/Title'
import Small from '~/components/common/Small'

export const CustomLabel = styled.label`
  width: 100%;
  display: block;
  text-align: left;
`
export const InputFiledCommonStyles = {
  backgroundColor: '#fff',
  border: '1px solid ${GRAY_MEDIUM_DARK}',
  fontSize: '1rem',
  outline: 'none',
  padding: '0 1rem 0 1rem',
  width: '600px'
}

export const BasicInputField = styled.input`
  ${InputFiledCommonStyles}
  border-radius: 5px;
  border: 1px solid ${GRAY_MEDIUM_DARK};
  height: 40px;
  margin: 0.4rem 0 1.5rem 0;
  &:focus {
    outline: none;
    border: 1px solid #2684ff;
    box-shadow: 0 0 0 1px #2684ff;
    display: block;
  }
`

export const Header = styled.div`
  background-image: url('https://images.unsplash.com/photo-1523430045879-9444a84c28eb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  width: 100%;
  padding: 2rem 1rem;

  ${Title} {
    color: ${WHITE};
  }
`

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

export const Filters = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  padding: 0.5rem 0;
  margin-bottom: 0.5rem;

  ${Small} {
    display: block;
    text-align: right;
  }
`

export const Wrapper = styled.div`
  margin: 1rem auto 0;
  padding: 1rem;
  width: 100%;

  ${Card} {
    margin: 0;
    width: 100%;
  }
`

export const ModalSmallCustomStyles = {
  content: {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'visible'
  }
}

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
export const FlexContainer = styled.div`
  flex: 1;
`

type InputProps = {
  name: string => string,
  type: string => string,
  placeholder: string => string,
  onChange: Object => void,
  required: Boolean
}
export const InputField = ({
  name,
  type,
  placeholder,
  onChange,
  required
}: InputProps) => {
  return (
    <BasicInputField
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
    />
  )
}
