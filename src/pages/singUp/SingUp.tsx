import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './SingUp.css'
import { registerUser } from '../../services/Services'
import User from '../../models/Users'

// Componente de Registro de Usuário
function Register() {

  // Hook para navegação entre rotas
  let navigate = useNavigate()

  // Estado para armazenar a confirmação de senha
  const [confirmPassword, setConfirmPassword] = useState<string>("")

  // Estado para armazenar os dados do usuário a ser registrado
  const [user, setUser] = useState<User>({
    id: 0,
    name: '',
    user: '',
    password: '',
    photo: ''
  })

  // Estado para armazenar a resposta do backend após o registro
  const [userResponse, setUserResponse] = useState<User>({
    id: 0,
    name: '',
    user: '',
    password: '',
    photo: ''
  })

  // useEffect que redireciona para a tela de login quando o usuário é registrado com sucesso
  useEffect(() => {
    if (userResponse.id !== 0) {
      back()
    }
  }, [userResponse])

  // Função que redireciona o usuário para a página de login
  function back() {
    navigate('/login')
  }

  // Função que atualiza o estado da confirmação de senha
  function handleConfirmPassword(e: ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value)
  }

  // Função que atualiza o estado do usuário com os valores inseridos no formulário
  function updateState(e: ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  // Função assíncrona para registrar o novo usuário ao submeter o formulário
  async function registerNewUser(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    // Verifica se a senha e a confirmação são iguais e se a senha tem pelo menos 8 caracteres
    if (confirmPassword === user.password && user.password.length >= 8) {

      try {
        // Tenta registrar o usuário utilizando o serviço registerUser
        await registerUser(`/user/register`, user, setUserResponse)
        alert('User registered successfully')

      } catch (error) {
        alert('Error when registering the User')
        console.error('Error details:', error);
      }

    } else {
      // Se as senhas não coincidem ou a senha não é longa o suficiente, exibe um alerta e reinicia os campos de senha
      alert('Inconsistent data. Check your registration information')
      setUser({ ...user, password: "" }) // Reinicia o campo de Senha
      setConfirmPassword("")              // Reinicia o campo de Confirmar Senha
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
        {/* Parte esquerda da tela, visível apenas em dispositivos grandes */}
        <div className="fundoCadastro hidden lg:block"></div>

        {/* Formulário de cadastro */}
        <form className='flex justify-center items-center flex-col w-2/3 gap-3' onSubmit={registerNewUser}>
          <h2 className='text-slate-900 text-5xl'>Cadastrar</h2>

          {/* Campo para nome */}
          <div className="flex flex-col w-full">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className="border-2 border-slate-700 rounded p-2"
              value={user.name} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
            />
          </div>

          {/* Campo para usuário */}
          <div className="flex flex-col w-full">
            <label htmlFor="user">Usuário</label> {/* Correção aqui */}
            <input
              type="text"
              id="user"
              name="user"
              placeholder="User"
              className="border-2 border-slate-700 rounded p-2"
              value={user.user} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
            />
          </div>

          {/* Campo para foto */}
          <div className="flex flex-col w-full">
            <label htmlFor="photo">Foto</label> {/* Correção aqui */}
            <input
              type="text"
              id="photo"
              name="photo"
              placeholder="Photo"
              className="border-2 border-slate-700 rounded p-2"
              value={user.photo} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
            />
          </div>

          {/* Campo para senha */}
          <div className="flex flex-col w-full">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="border-2 border-slate-700 rounded p-2"
              value={user.password} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
            />
          </div>

          {/* Campo para confirmação de senha */}
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

          {/* Botões de Cancelar e Cadastrar */}
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
