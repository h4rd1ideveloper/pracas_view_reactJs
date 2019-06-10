/* eslint-disable no-unused-vars */
import React, { useEffect, useContext, useMemo } from 'react'
import { Row, Button, P, Content, Praca, PopUP } from './components/'
import Store, { Context, functionsToDispatch } from './store/'
import { api } from './lib/api/index'

function App () {
  const [data, setData] = useContext(Context)
  const { init, create, update, delete: del, change } = functionsToDispatch
  function openPopup (e) {
    setData(change({}))
    e.preventDefault()
  }
  useEffect(() => {
    api({ url: 'http://127.0.0.1:3333/' }, pracas => {
      setData(init(pracas))
    })
  })
  function Element () {
    return () =>
    <>
      <header>
        <Row
          justifyContent={'space-between'}
          _bg_color={'#e0e4ed'}
          _p={'16px 12px'}
          _color={'#415865'}
        >
          <>
            <h1>Configuração de midia</h1>
            <Button
              _h={'32px'}
              _w={'32px'}
              borderRadius={'4px'}
              _b={'none'}
              _p={'1px 6px'}
              _color={'white'}
              _bg_color={'#c62382'}
              onClick={openPopup}
            >
              +
            </Button>
          </>
        </Row>
        <Row
          justifyContent={'space-between'}
          _bg_color={'white'}
          _p={'16px 12px'}
          _color={'#415865'}
        >
          <>
            <h1>Praças</h1>
            <P text={`${data.pracas.length || '... '} registros`} />
          </>
        </Row>
      </header>
      <Content _p={'16px 12px'} data={data.pracas} _bg_color={'#f1f1f1f1'} />
      { data && data.isOpen && <PopUP isOpen={data.isOpen} praca={data.dataPopup.praca } estado={data.dataPopup.estado || '' } sigla={data.dataPopup.sigla || '' } flag={ data.dataPopup.id || false } /> }
    </>
  }
  return (
    useMemo(Element(), [data, data.pracas])
  )
}

export default function () {
  return (
    <Store>
      <App />
    </Store>
  )
}
