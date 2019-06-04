import styled from 'styled-components'

const Item = styled.div`
  border-radius: 2px;
  display: inline-block;
  margin: 0.5rem 0.5rem 2rem;
  outline: 0;
  overflow: hidden;
  position: relative;
  width: 240px;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`

export default Item
