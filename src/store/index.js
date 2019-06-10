import React, { useReducer } from 'react'
const INITIAL_STATE = { pracas: [], isOpen: false, dataPopup: {} }
const Types = {
  all: 'get_all',
  create: 'create_praca',
  update: 'update_praca',
  delete: 'delete_praca',
  cvp: 'change_visibility_popup'
}
export const functionsToDispatch = {
  init: payload => ({ type: Types.all, payload }),
  create: payload => ({ type: Types.create, payload }),
  update: payload => ({ type: Types.update, payload }),
  delete: payload => ({ type: Types.delete, payload }),
  change: payload => ({ type: Types.cvp, payload })
}
export const Context = React.createContext(INITIAL_STATE)
function reducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.all:
      return { ...state, pracas: [ ...action.payload ] }
    case Types.create:
      return { ...state, pracas: [ ...state.pracas, action.payload ] }
    case Types.update:
      return {
        ...state,
        pracas: [...state.pracas.map(e => e.id === action.payload.id ? action.payload : e)]
      }
    case Types.delete:
      return {
        ...state,
        pracas: [...state.pracas.filter(e => e.id !== action.payload)]
      }
    case Types.cvp:
      return { ...state, isOpen: !state.isOpen, dataPopup: { ...action.payload } }
    default:
      return state
  }
}
export default function Store ({ children }) {
  const [store, dispatch] = useReducer(reducer, INITIAL_STATE)
  return (
    <Context.Provider value={[store, dispatch]}>{children}</Context.Provider>
  )
}
