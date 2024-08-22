import  { ChangeEvent, useContext, useEffect, useState } from 'react';
import './Login.css';
import sideImage from '../../assets/sideImage.png';
import logo from '../../assets/logo.png'
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
<div className="grid grid-cols-1 lg:grid-cols-2 h-screen bg-white">
 
  <div className="flex flex-col justify-center items-center bg-white">
    {/* Logo */}
    <div className="flex justify-center bg-white mb-6">
      <img src={logo} alt="Logo" className="w-24 h-24" />
    </div>

    <div className="bg-white shadow-lg p-8 w-3/4 lg:w-2/3 border border-[#220660]">
      
      <form className="flex flex-col gap-4" onSubmit={login}>
        <h2 className="text-slate-900 text-3xl text-center font-bold mb-6">Entrar</h2>
        
        <div className="flex flex-col w-full">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            className="border border-[#220660] rounded-[28px] p-2 focus:border-[#FFDE59] transition-colors duration-300"
            value={userLogin.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateEstate(e)}
          />
        </div>
        
        <div className="flex flex-col w-full">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Senha"
            className="border border-[#220660] rounded-[28px] p-2 focus:border-[#FFDE59] transition-colors duration-300"
            value={userLogin.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateEstate(e)}
          />
        </div>
        
        <button 
            type="submit" 
            className="rounded-[28px] bg-[#FFDE59] hover:bg-[#F9C23C] text-black py-2 px-4 transition-colors duration-300 flex justify-center items-center"
          >
            {isLoading ? (
              <RotatingLines
                strokeColor="black"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true}
              />
            ) : (
              <span>Entrar</span>
            )}
        </button>

        <hr className="border-slate-800 w-full my-4" />

        <p className="text-center">
          Ainda não tem uma conta?{' '}
          <Link to="/register" className="text-indigo-800 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </form>
    </div>
  </div>

  
  <div className="relative w-full h-screen overflow-hidden hidden lg:block">
    <img src={sideImage} alt="Side Image" className="w-full h-full" />
  </div>
</div>


    </>
  );
}

export default Login;