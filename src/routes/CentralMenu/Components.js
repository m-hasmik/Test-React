//@flow
import React from 'react'
import styled from 'styled-components'
import { WHITE, BLACK, GRAY_MEDIUM_DARK, GRAY_LIGHT } from '~/constants/colors'
import Card from '~/components/common/Card'
import Title from '~/components/common/Title'
import Small from '~/components/common/Small'

export const Header = styled.div`
  width: 100%;
  padding: 2rem 1rem;
  background-color: ${WHITE};

  ${Title} {
    color: ${BLACK};
  }
`
export const HeaderCell = styled.div`
  margin-right: 2px;
  padding: 0.5rem 0;
  background-color: ${GRAY_LIGHT};
`
export const NoData = styled.p`
  padding: 1rem 0;
`

export const DayContainer = styled.div`
  -webkit-overflow-scrolling: touch;
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-x: hidden;
  overflow: auto;
  padding: 0.2rem 0 0.2rem 0;
  position: relative;
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
  padding-bottom: 4rem;
  position: relative;
  width: 100%;
`
export const RowContainer = styled.div`
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: row;
  flex: 1;
  overflow-x: hidden;
  overflow: auto;
  padding: 1rem 0;
  position: relative;
  width: 100%;
  border-bottom: '1px solid #b6b6b6';
`

export const DayTypeTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 0.5rem 1rem;
  min-width: 9.2rem;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  background-color: white;
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

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
export const FlexContainer = styled.div`
  flex: 1;
`

export const HeaderCellsContainer = styled.div`
  text-align: center;
  display: flex;
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

export const ModalSmallCustomStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

export const ModalCustomStyles = {
  content: {
    top: '0%',
    left: '0%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '0%',
    transform: 'translate(0%, 0%)',
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    zIndex: '3',
    border: 'none'
  }
}

export const FromContainer = styled.div`
  width: 600px;
  margin: 0 auto;
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

export const CustomLabel = styled.label`
  width: 100%;
  display: block;
  text-align: left;
`

export const InputFieldSmall = styled.input`
  width: 200px;
  padding: 0 1rem 0 1rem;
  margin-right: 1rem;
  border-radius: 5px;
  border: 1px solid ${GRAY_MEDIUM_DARK};
  height: 40px;
  margin: 0.4rem 0 1.5rem 0;
  &:focus {
    outline: none;
    border: 1px solid #2684ff;
    box-shadow: 0 0 0 1px #2684ff;
  }
`

const SearchField = styled.input`
  ${InputFiledCommonStyles}

  background-color: #fff;
  border-radius: 25px;
  border: 1px solid ${GRAY_MEDIUM_DARK};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.062), 0 3px 6px rgba(0, 0, 0, 0.007);
  height: 55px;
  margin: 1em 0;
`
type Props = {
  placeholder: string,
  type: string,
  onChange: () => void
}

export const CentralMenuSearchField = ({
  placeholder,
  type,
  onChange
}: Props) => {
  return (
    <SearchField placeholder={placeholder} type={type} onChange={onChange} />
  )
}
