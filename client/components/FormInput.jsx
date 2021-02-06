/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const FormInput = (props) => {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  const {
    type, title, placeholder, action
  } = props

  return (
    <div className="mb-3">
      <label
        className="block text-gray-700 text-sm font-bold mb-1"
        htmlFor={title}
      >
        {title}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={title}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => {
          setValue(event.target.value)
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault()
            dispatch(action(value))
          }
        }}
        onBlur={() => {
          dispatch(action(value))
        }}
      />
    </div>
  )
}

export default FormInput