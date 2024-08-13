import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './SingUp.css'
import { registerUser } from '../../services/Services'
import User from '../../models/Users'

function Register() {

  let navigate = useNavigate()

  const [confirmPassword, setConfirmPassword] = useState<string>("")

  const [user, setUser] = useState<User>({
    id: 0,
    name: '',
    user: '',
    password: '',
    photo: ''
  })

  const [userResponse, setUserResponse] = useState<User>({
    id: 0,
    name: '',
    user: '',
    password: '',
    photo: ''
  })

  useEffect(() => {
    if (userResponse.id !== 0) {
      back()
    }
  }, [userResponse])

  function back() {
    navigate('/login')
  }

  function handleConfirmPassword(e: ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value)
  }

  function updateEstate(e: ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  async function registerNewUser(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    if (confirmPassword === user.password && user.password.length >= 8) {

      try {
        await registerUser(`/user/register`, user, setUserResponse)
        alert('User registered successfully')

      } catch (error) {
        alert('Error when registering the Use')
      }

    } else {
      alert('Inconsistent data. Check your registration information')
      setUser({ ...user, password: "" }) // Reinicia o campo de Senha
      setConfirmPassword("")                  // Reinicia o campo de Confirmar Senha
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
        <div className="fundoCadastro hidden lg:block"></div>
        <form className='flex justify-center items-center flex-col w-2/3 gap-3' onSubmit={registerNewUser}>
          <h2 className='text-slate-900 text-5xl'>Cadastrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className="border-2 border-slate-700 rounded p-2"
              value={user.name} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateEstate(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="user"
              name="user"
              placeholder="User"
              className="border-2 border-slate-700 rounded p-2"
              value={user.user} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateEstate(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              id="photo"
              name="photo"
              placeholder="Photo"
              className="border-2 border-slate-700 rounded p-2"
              value={user.photo} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateEstate(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="border-2 border-slate-700 rounded p-2"
              value={user.password} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateEstate(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="border-2 border-slate-700 rounded p-2"
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmPassword(e)}
            />
          </div>
          <div className="flex justify-around w-full gap-8">
            <button className='rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2' onClick={back}>
              Cancelar
            </button>
            <button className='rounded text-white bg-indigo-400 hover:bg-indigo-900 w-1/2 py-2' type='submit'>
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register