import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import User from "../../../models/Users";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { find, update } from "../../../services/Services";
import { toastAlert } from "../../../util/toastAlert";

function FormUser() {
    let navigate = useNavigate();
  
    const { id } = useParams<{ id: string }>();
  
    const { user, handleLogout } = useContext(AuthContext);
    const token = user.token;
  
    const [userData, setUserData] = useState<User>({
      id: 0,
      name: '',
      user: '',
      password:'',
      photo: '',
    });
  
    async function findUserById(id: string) {
      await find(`/users/${id}`, setUserData, {
        headers: {
          Authorization: token,
        },
      });
    }
  
    useEffect(() => {
      if (token === '') {
        toastAlert('Você precisa estar logado','info');
        navigate('/');
      }
    }, [token]);
  
    useEffect(() => {
      if (id !== undefined) {
        findUserById(id);
      }
    }, [id]);
  
    function updateState(e: ChangeEvent<HTMLInputElement>) {
      setUserData({
        ...userData,
        [e.target.name]: e.target.value,
      });
    }
  
    function goBack() {
      navigate('/profile');
    }
  
    async function updateUser(e: ChangeEvent<HTMLFormElement>) {
      e.preventDefault();
  
      
  
      if (id !== undefined) {
        try {
          await update(`/users/${id}`, userData, setUserData, {
            headers: {
              Authorization: token,
            },
          });
          toastAlert('Usuário atualizado com sucesso','sucesso');
          goBack();
        } catch (error: any) {
          if (error.toString().includes('403')) {
            toastAlert('O token expirou, favor logar novamente','info');
            handleLogout();
          } else {
            toastAlert('Erro ao atualizar o Usuário','erro');
          }
        }
      }
    }
  
    return (
      <div className="container flex flex-col mx-auto items-center">
        <h1 className="text-4xl text-center my-8">Editar Usuário</h1>
  
        <form onSubmit={updateUser} className="flex flex-col w-1/2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="nome">Nome</label>
            <input
              value={user.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
              type="text"
              placeholder="Nome"
              name="nome"
              required
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              value={userData.user}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
              type="email"
              placeholder="Email"
              name="email"
              required
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="senha">Senha</label>
            <input
              value={userData.password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
              type="password"
              placeholder="Senha"
              name="senha"
              required
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>
          <button type="submit" className="rounded bg-indigo-400 hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto block py-2">
            Editar Usuário
          </button>
        </form>
      </div>
    );
  }
  
  export default FormUser;