import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './SingUp.css';
import { registerUser } from '../../services/Services';
import User from '../../models/Users';
import sideImage from '../../assets/logo.png';
import logo from '../../assets/logo.png';
import { toastAlert } from '../../util/toastAlert';

function SingUp() {
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [user, setUser] = useState<User>({
    id: 0,
    name: '',
    email: '',
    password: '',
    photo: ''
  });
  const [userResponse, setUserResponse] = useState<User>({
    id: 0,
    name: '',
    email: '',
    password: '',
    photo: ''
  });

  useEffect(() => {
    if (userResponse.id !== 0) {
      back();
    }
  }, [userResponse]);

  function back() {
    navigate('/login');
  }

  const handleConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const updateState = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  async function registerNewUser(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmPassword === user.password && user.password.length >= 8) {
      try {
        await registerUser(`/user/register`, user, setUserResponse);
        toastAlert('Cadastro realizado com sucesso','sucessLogout');
      } catch (error) {
        toastAlert('Erro ao cadastrar usuário','error');
      }
    } else {
      toastAlert('Dados inconsistentes. Por favor, verifique suas informações de cadastro.Senha deve ter mais 8 ou mais caracteres','info');
      setUser({ ...user, password: '' });
      setConfirmPassword('');
    }
  }

  return (
<div className="flex flex-col lg:flex-row h-screen font-bold bg-white text-yellow-600">


  {/* Formulário de Cadastro */}
  <div className="flex flex-col justify-center items-center bg-white w-full lg:w-1/2 h-full">
    <div className="flex flex-col justify-center items-center h-full w-3/4 lg:w-2/3 mb-8">
      {/* Logo */}
      <div className="flex justify-center bg-white mb-2 mt-4 w-24 h-24">
        <img src={logo} alt="Logo" className="w-full h-full" />
      </div>

      {/* Formulário */}
      <div className="bg-white shadow-lg p-8 w-full border border-[#220660] mb-8 mtt-2 h-full flex flex-col justify-between">
        <form className="flex flex-col gap-2 " onSubmit={registerNewUser} >
          <h2 className="text-slate-900 text-3xl text-center font-bold mb-6">Cadastrar</h2>

          <div className="flex flex-col w-full">
            <label htmlFor="name" className="text-sm">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nome"
              className="border border-[#220660] rounded-[28px] p-2 text-sm focus:border-[#FFDE59] transition-colors duration-300"
              value={user.name}
              onChange={updateState}
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="email" className="text-sm">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="border border-[#220660] rounded-[28px] p-2 text-sm focus:border-[#FFDE59] transition-colors duration-300"
              value={user.email}
              onChange={updateState}
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="photo" className="text-sm">Foto</label>
            <input
              type="text"
              id="photo"
              name="photo"
              placeholder="Foto"
              className="border border-[#220660] rounded-[28px] p-2 text-sm focus:border-[#FFDE59] transition-colors duration-300"
              value={user.photo}
              onChange={updateState}
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="password" className="text-sm">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Senha"
              className="border border-[#220660] rounded-[28px] p-2 text-sm focus:border-[#FFDE59] transition-colors duration-300"
              value={user.password}
              onChange={updateState}
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="confirmPassword" className="text-sm">Confirmar Senha</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirmar Senha"
              className="border border-[#220660] rounded-[28px] p-2 text-sm focus:border-[#FFDE59] transition-colors duration-300"
              value={confirmPassword}
              onChange={handleConfirmPassword}
            />
          </div>

          <button
            type="submit"
            className="rounded-[28px] bg-[#FFDE59] hover:bg-[#F9C23C] text-black py-2 px-4 transition-colors duration-300"
          >
            Cadastrar
          </button>
          <button
            type="button"
            className="text-indigo-800 hover:underline text-sm"
            onClick={() => navigate('/login')}
          >
            Já tem uma conta? Entrar
          </button>
        </form>
      </div>
    </div>
  </div>

  {/* Parte direita da tela */}
  <div className="relative w-full h-screen overflow-hidden hidden lg:block">
    <img src={sideImage} alt="Side Image" className="w-full h-full" />
  </div>
</div>

  );
}

export default SingUp;