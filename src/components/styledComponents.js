import styled, { css } from 'styled-components'
const BASE = styled.div`
  ${props =>
    props &&
    props._custom &&
    css`
      ${props._custom.key}:  ${props._custom.value};
  `}
  ${props =>
    props &&
    props._color &&
    css`
      color: ${props._color};
  `}
  ${props =>
    props._h &&
      css`
        height: ${props._h};
  `}
  ${props =>
    props._w &&
      css`
        width: ${props._w};
  `}
  ${props =>
    props._p &&
      css`
        padding: ${props._p};
  `}
  ${props =>
    props &&
      props._m &&
      css`
        margin: ${props._m};
  `}
  ${props =>
    props.justifyContent &&
      css`
        justify-content: ${props.justifyContent};
  `}
    align-items: center;
  ${props =>
    props.alignItems &&
      css`
        align-items: ${props.alignItems};
  `}
    
  ${props =>
    props &&
      props._b &&
      css`
        border: ${props._b};
  `}
    
  ${props =>
    props.borderRadius &&
      css`
        border-radius: ${props.borderRadius};
  `}
  ${props =>
    props.boxShadow &&
      css`
        border-radius: ${props.boxShadow};
  `}
  ${props =>
    props &&
      props.fontSize &&
      css`
        font-size: ${props.fontSize};
  `}
  ${props =>
    props &&
      props._bg_color &&
      css`
        background-color: ${props._bg_color};
  `}
  ${props =>
    props &&
      props._bg &&
      css`
        background: ${props._bg};
  `}
`
export const StyledButton = styled.button`
 letter-spacing: 0.1rem;
  ${props =>
    props &&
    props._custom &&
    css`
      ${props._custom.key}:  ${props._custom.value};
  `}
  ${props =>
    props._h &&
    css`
      height: ${props._h};
  `}
  ${props =>
    props._w &&
        css`
          width: ${props._w};
  `}
  ${props =>
    props._p &&
      css`
        padding: ${props._p};
  `}
  ${props =>
    props.borderRadius &&
      css`
        border-radius: ${props.borderRadius};
  `}
  ${props =>
    props.boxShadow &&
      css`
        border-radius: ${props.boxShadow};
  `}
  ${props =>
    props &&
      props.fontSize &&
      css`
        font-size: ${props.fontSize};
  `}
  ${props =>
    props &&
      props._bg_color &&
      css`
        background-color: ${props._bg_color};
  `}
  ${props =>
    props &&
      props._bg &&
      css`
        background: ${props._bg};
  `}
  ${props =>
    props &&
      props._color &&
      css`
        color: ${props._color};
  `}
  ${props =>
    props &&
      props._b &&
      css`
        border: ${props._b};
  `}
  ${props =>
    props &&
      props._m &&
      css`
        margin: ${props._m};
  `}
`
export const StyledRow = styled(BASE)`
  display: flex;
  flex-direction: row;
`
export const StyledIcons = styled(StyledRow)`
  transition: 0.8s ease-in-out opacity;
  visibility: hidden;
  opacity: 0;
  min-width: max-content;
  margin-left: auto;
  ${props =>
    props._hover &&
    css`
      opacity: 1;
      visibility: visible;
  `}
`

export const StyledText = styled.p`
    word-wrap: break-word;
    word-break: break-word;
    letter-spacing: 0.02rem;
  ${props =>
    props &&
      props.fontSize &&
      css`
        font-size: ${props.fontSize};
  `}
  ${props =>
    props &&
      props._color &&
      css`
        color: ${props._color};
  `}
  ${props =>
    props &&
      props._m &&
      css`
        margin: ${props._m};
  `}
    ${props =>
    props._w &&
       css`
         width: ${props._w};
  `}
`
export const StyledInput = styled.input`
  min-width: 120px;
`
export const StyledMain = styled(BASE)``
export const StyledOverLay = styled.div`
    position: absolute;
    top: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0,0,0,0.2);
    backdrop-filter: blur(20px);
    ${props => !props.isOpen && css`
      display: none;
    `}
`
export const StyledPopUp = styled.div`
    width: 50%;
    margin: 10vh auto;
    padding:32px 0 57px 0;
    background: #fefefe;
    border-radius: 5px;
`
export const StyledHeaderPopUp = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    padding: 0px 16px;
`
export const StyledWrapFields = styled.div`
    margin-bottom: 16px;
    background: #f9f9f9;
    padding: 57px 12px;
`
export const StyledPracaField = styled.input`
    width: 100%;
    margin-bottom: 32px;
`
export const StyledSiglaField = styled.input`
    width: 40%;
    margin: 0px 10% 0px 0px;
`
export const StyledEstadoSelect = styled.select`
    width: 50%;
`
