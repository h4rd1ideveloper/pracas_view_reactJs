// eslint-disable-next-line no-unused-vars
import React, { useMemo } from 'react'
import Swal from 'sweetalert2'
export function Memorize ({ fact = () => (<div>Miss JSXElement</div>), deps = [] }) {
  return (
    useMemo(fact, deps)
  )
}
export const FeedBack = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000
})
