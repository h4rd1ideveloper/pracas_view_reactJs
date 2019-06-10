/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState, useContext, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Memorize, FeedBack } from '../lib'
import { api } from '../lib/api/index'
import { Context, functionsToDispatch } from '../store/'
import {
  StyledText,
  StyledRow,
  StyledButton,
  StyledMain,
  StyledIcons,
  StyledHeaderPopUp,
  StyledOverLay,
  StyledPopUp,
  StyledWrapFields,
  StyledEstadoSelect,
  StyledSiglaField,
  StyledPracaField
} from './styledComponents'
/* react-hooks/exhaustive-deps */
const { delete: del, update, change, create: ct } = functionsToDispatch
export function Button ({ ...props }) {
  function Element () {
    return <StyledButton {...props} />
  }
  return Element()
}
function HeaderPopUp ({ ...props }) {
  const [, setContext] = useContext(Context)
  function Element () {
    return () => <StyledHeaderPopUp {...props}>
      <P text={'Praça'}/>
      <FontAwesomeIcon onClick={ e => setContext(change({})) } icon={faTimes}/>
    </StyledHeaderPopUp>
  }
  // return Memorize({fact:Element(), deps:[]})
  return Element()()
}

export function PopUP ({ isOpen, flag, ...props }) {
  const [dados, setContext] = useContext(Context)
  const { estado, praca, sigla } = props
  const [state, setState] = useState({ estado, praca, sigla })
  function handleInput (e) {
    setState({ ...state, [e.target.name]: e.target.value })
    e.preventDefault()
  }
  function submit (e) {
    if (state.praca) {
      if (flag) {
        api({ url: `http://127.0.0.1:3333/${flag}`, data: state, method: 'PATCH' },
          r => {
            if (!r.err) {
              setContext(update(r))
              closePopup()
              FeedBack.fire({
                type: 'success'
              })
            } else {
              FeedBack.fire({
                type: 'warning',
                title: r.msg
              })
            }
          }
        )
      } else {
        console.log({ data: state, method: 'POST' })
        api({ url: `http://127.0.0.1:3333/`, data: state, method: 'POST' },
          r => {
            if (!r.err) {
              setContext(ct(r))
              closePopup()
              FeedBack.fire({
                type: 'success'
              })
            } else {
              FeedBack.fire({
                type: 'warning',
                title: r.msg
              })
            }
          }
        )
      }
    } else {
      FeedBack.fire({
        type: 'info',
        title: 'O nome da praça é obrigatorio'
      })
    }
    e.preventDefault()
  }
  function closePopup (e) {
    setContext(change({}))
    // e.preventDefault()
  }
  return (
    <StyledOverLay isOpen={isOpen}>
      <StyledPopUp>
        <HeaderPopUp/>
        <StyledWrapFields>
          <StyledPracaField type='text' name="praca" placeholder="Praça" onChange={handleInput} value={state.praca || ''} />
          <StyledSiglaField type='text' name="sigla" placeholder="Sigla" onChange={handleInput} value={state.sigla || ''} />
          <StyledEstadoSelect name="estado" value={state.estado} onChange={handleInput} >
            <option value="" ></option>
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
          </StyledEstadoSelect>
        </StyledWrapFields>
        <Button
          borderRadius={'5px'}
          _p={'8px'}
          _b={'none'}
          _bg_color={'#0084e7'} _color={'white'} _custom={{ key: 'float', value: 'right' }} _m={'0 16px 0 0'}
          onClick={closePopup}
        >Cancelar</Button>
        <Button
          borderRadius={'5px'}
          _p={'8px'}
          _b={'none'}
          _color={'white'}
          _bg_color={'#0084e7'} _custom={{ key: 'float', value: 'right' }} _m={'0 16px 0 0'}
          onClick={submit}
        >Salvar</Button>
      </StyledPopUp>
    </StyledOverLay>)
}
/**
 * P Element
 * @description P extend BASE  <styled.p>
 * @param String text
 * @param Object ...props
 * @returns useMemo`deps:text JSX.Element<{...props}>: {text}
 */
export function P ({ text, ...props }) {
  function Element () {
    return () => <StyledText {...props}>{text}</StyledText>
  }
  return Memorize({ fact: Element(), deps: [text] })
}
/**
 * Row Element
 * @description Row extend BASE  <styled.div>
 * @param String text
 * @param Object ...props
 * @returns useMemo` JSX.Element<{...props}>: {text}
 */
export function Row ({ children, ...props }) {
  return <StyledRow {...props}>{children}</StyledRow>
}
/**
 * Main Element
 * @description div extend BASE  <styled.div>
 * @param JSX.Element children
 * @param Object ...props
 * @returns useMemo` JSX.Element<{...props}>: {text}
 */
export function Content ({ data, ...props }) {
  function Element () {
    return () => (
      <StyledMain {...props}>
        <ul style={{ borderRight: '5px solid rgba(3, 169, 244, 0.71)' }}>
          {data &&
            data.map((e, i) => {
              return e && <Praca key={i} data={e} />
            })}
        </ul>
      </StyledMain>
    )
  }

  return Memorize({ fact: Element(), deps: [data] })
}
/**
 * Panel Icons Element
 * @description div extend BASE  <styled.div>
 * @param JSX.Element children
 * @param Object ...props
 * @returns useMemo` JSX.Element<{...props}>: {text}
 */
export function Praca ({ ...props }) {
  const RowReference = useRef(null)
  const [state, setState] = useState(false)
  const [, setContext] = useContext(Context)
  function show (e) {
    setState(true)
    e.preventDefault()
  }
  function hidden (e) {
    setState(false)
    e.preventDefault()
  }
  // react-hooks/exhaustive-deps
  useEffect(() => {
    const { current } = RowReference

    current.addEventListener('mouseover', show)
    current.addEventListener('mouseleave', hidden)

    return () => {
      current.removeEventListener('mouseover', show)

      current.removeEventListener('mouseleave', hidden)
    }
  }, [])
  const { praca, estado, sigla, id } = props.data
  function deleting (e) {
    api({ url: `http://127.0.0.1:3333/${id}`, method: 'DELETE' },
      () => { console.log('deletado') }
    )
    setContext(del(id))
    e.preventDefault()
  }
  function updateing (e) {
    setContext(change(props.data))
    e.preventDefault()
  }
  return (
    <li ref={RowReference}>
      <Row
        _custom={{ key: 'border-left', value: '10px solid #cdcdcd' }}
        _m={'0 0 1px 0'}
        justifyContent={'flex-start'}
        _bg_color={'#f9f9f9'}
        _p={'16px 12px'}
        _color={'#666'}
      >
        <P _color={'#4b8cbb'} _w={'44%'} text={praca} />
        <P _w={'20%'} text={estado} />
        <P _w={'20%'} text={sigla} />
        <StyledIcons _w={'10%'} _hover={state} justifyContent={'flex-end'}>
          <Button
            _bg_color={'#0084e7'}
            _h={'32px'}
            _w={'32px'}
            borderRadius={'100%'}
            _b={'none'}
            _color={'white'}
            onClick={updateing}
            _m={'0 4px 0 0'}
          >
            <FontAwesomeIcon icon={faPen}/>
          </Button>
          <Button
            _bg_color={'#fe1935'}
            _h={'32px'}
            _w={'32px'}
            borderRadius={'100%'}
            _b={'none'}
            _color={'white'}
            onClick={deleting}
          >
            <FontAwesomeIcon icon={faTrash}/>
          </Button>
        </StyledIcons>
      </Row>
    </li>
  )
}
