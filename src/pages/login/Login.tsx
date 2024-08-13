import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import './Login.css';

import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import { RotatingLines } from 'react-loader-spinner';
import UserLogin from '../../models/UserLogin';

function Login() {
  let navigate = useNavigate();

  const [userLogin, setUserLogin] = useState<UserLogin>(
    {} as UserLogin
  );

  const { user, handleLogin } = useContext(AuthContext);

  const {isLoading} = useContext(AuthContext) 

  useEffect(() => {
    if (user.token !== "") {
        navigate('/home')
    }
}, [user])

function updateEstate(e: ChangeEvent<HTMLInputElement>) {
  setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value
  })
}

function login(e: ChangeEvent<HTMLFormElement>) {
  e.preventDefault()
  handleLogin(userLogin)
}

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold ">
        <form className="flex justify-center items-center flex-col w-1/2 gap-4" onSubmit={login}>
          <h2 className="text-slate-900 text-5xl ">Entrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="user">Usuário</label>
            <input
              type="text"
              id="user"
              name="user"
              placeholder="User"
              className="border-2 border-slate-700 rounded p-2"
              value={userLogin.user} 
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
              value={userLogin.password} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateEstate(e)}
            />
          </div>
          <button  type='submit' className="rounded bg-indigo-400 hover:bg-indigo-900 text-white w-1/2 py-2 flex justify-center">
           {isLoading ? <RotatingLines
            strokeColor="white"
            strokeWidth="5"
            animationDuration="0.75"
            width="24"
            visible={true}
          /> :
            <span>Entrar</span>}
          </button>

          <hr className="border-slate-800 w-full" />

          <p>
            Ainda não tem uma conta?{' '}
            <Link to="/singUp" className="text-indigo-800 hover:underline">
              Cadastre-se
            </Link>
          </p>
        </form>
        <div className="fundoLogin hidden lg:block"></div>
      </div>
    </>
  );
}

export default Login;