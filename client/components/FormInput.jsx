/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const FormInput = (props) => {
  const [value, setValue] = useState('')
  const borderColor = value ? 'gray-200' : 'red-300'
  const dispatch = useDispatch()
  const {
    type, title, placeholder, action
  } = props

  return (
    <div className="mb-3">
      <label
        className="block text-gray-700 text-sm font-bold mb-1"
        htmlFor={`id-${title}`}
      >
        {title}
      </label>
      <input
        className={`shadow appearance-none border border-${borderColor} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        id={`id-${title}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => {
          setValue(event.target.value)
          if (type === 'password') {
            dispatch(action(event.target.value))
          }
        }}
        onKeyDown={(event) => {
          event.preventDefault()
          if (event.key === 'Enter') {
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
