import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import { BLACK, PRIMARY } from '~/constants/colors'
import CommonButton from '~/components/common/Button'
import CommonSidebar from '~/components/Sidebar'

export const Content = styled.div`
  -webkit-overflow-scrolling: touch;
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  width: calc(100% - 200px);

  @media print {
    width: 100%;
  }
`
export const Links = styled.div`
  flex: 1;
  padding: 2rem 0;
  width: 100%;
`

export const activeClassName = 'nav-item-active'
export const Link = styled(NavLink).attrs({
  activeClassName
})`
  color: ${BLACK};
  cursor: pointer;
  display: block;
  font-size: 0.9rem;
  line-height: 2;
  padding: 0.25rem 0 0.25rem 1rem;
  position: relative;
  text-decoration: none;
  width: 100%;

  &::after {
    background: transparent;
    bottom: auto;
    content: '';
    display: block;
    height: 70%;
    left: 0;
    position: absolute;
    right: auto;
    top: 50%;
    transform: translate(-3px, -50%);
    transition: all 0.4s ease;
    width: 3px;
  }

  &.${activeClassName} {
    &::after {
      background: ${PRIMARY};
    }
  }
`

export const Logo = styled.img`
  height: 70px;
  width: 70px;
`

export const LinkIcon = styled.span`
  display: inline-block;
`

export const LinkName = styled.span`
  display: inline-block;
  margin-left: 0.5rem;

  ${props => props.hidden && `display: none;`}
`

export const Header = styled.div`
  display: flex;
  justify-content: space-around;
`

export const Toggle = styled(CommonButton)`
  background: none;
  border: 0;

  &:hover {
    background: none;
  }

  svg {
    color: ${BLACK};
    transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    ${props => props.toggled && `transform: rotate(90deg);`}
  }
`

export const Sidebar = styled(CommonSidebar)`
  align-items: center;
  justify-content: space-between;
  transition: width 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  ${props =>
    props.isMinimized &&
    `
      width: 70px;

      ${Link} {
        text-align: center;
        padding: .25rem 0 .25rem;

        &::after {
          content: none;
        }

        &.${activeClassName} {
          color: ${PRIMARY};
        }
      }
    `}
`
