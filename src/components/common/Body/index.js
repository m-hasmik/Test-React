import styled from 'styled-components'

const Body = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC,
    Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  font-weight: 300;
  font-variant: tabular-nums;
  bottom: auto;
  display: flex;
  flex-direction: row;
  height: 100%;
  left: auto;
  margin: auto;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;

  @media print {
    height: auto;
  }
`
export default Body
