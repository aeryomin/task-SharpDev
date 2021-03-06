import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie'
import Header from '../../../components/Header'
import {
  getUsers,
  getTransactions
} from '../../../redux/actionCreators/transactionsActionCreator'
import Payment from './Payment/Payment'
import Button, { DO_FUNCTION } from '../../../components/Button'
import TransactionsHistory from '../TransactionsHistory/TransactionsHistory'
import { getSocket } from '../../../redux'

const logout = () => {
  new Cookies().remove('token')
  window.location.reload()
}

const Main = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((s) => s.account)
  const { users } = useSelector((s) => s.transactions)
  const { doUpdate, sendUsers } = useSelector((s) => s.socket)
  const [inputUserValue, setInputUserValue] = useState('')
  const [inputPWValue, setInputPWValue] = useState('')

  useEffect(() => {
    dispatch(getUsers())
    dispatch(getTransactions())
    getSocket().emit('message', { userId: user._id })
  }, [])

  useEffect(() => {
    getSocket().on('message', (msg) => {
      if (msg.type) {
        switch (msg.type) {
          case 'ADD_REQUEST_TO_UPDATE_TRANSACTIONS': {
            dispatch(msg)
            break
          }
          case 'ADD_REQUEST_TO_SEND_USERS': {
            dispatch(msg)
            break
          }
          default:
            break
        }
      }
      return ''
    })
  }, [])

  useEffect(() => {
    dispatch(getTransactions())
  }, [doUpdate])

    useEffect(() => {
      dispatch(getUsers())
    }, [sendUsers])

  return (
    <div className="h-screen w-screen flex flex-col justify-start overflow-hidden">
      <Header />
      <div className="w-full h-5/6 flex flex-col items-center lg:flex-row lg:items-start lg:justify-around lg:h-1/2">
        <Payment
          users={users}
          inputUserValue={inputUserValue}
          setInputUserValue={setInputUserValue}
          inputPWValue={inputPWValue}
          setInputPWValue={setInputPWValue}
        />
        <TransactionsHistory
          users={users}
          setInputUserValue={setInputUserValue}
          setInputPWValue={setInputPWValue}
        />
      </div>
      <div className="">
        <Button
          content="Logout"
          action={{ type: DO_FUNCTION, payload: logout }}
        />
      </div>
    </div>
  )
}

export default Main
