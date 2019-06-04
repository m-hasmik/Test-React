import styled from 'styled-components'

import { WHITE } from '~/constants/colors'

const Sidebar = styled.div`
  background: ${WHITE};
  box-shadow: 0 0 2em rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  position: relative;
  top: 0;
  right: 0;
  left: auto;
  width: 300px;
  height: 100vh;
  overflow-y: auto;
  z-index: 20;

  @media print {
    display: none;
  }
`

export default Sidebar
